import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Feature, Overlay, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import { Vector } from 'ol/layer';
import Map from 'ol/Map';
import { Vector as sourceVector } from 'ol/source';
import { Observable } from 'rxjs';
import { LocationModel as Location } from 'src/app/models/location.model';
import { AddLocation, UpdateFilter } from '../../actions/location.action';
import { UpdateClickedCoordinate } from '../../actions/map.action';
import { LocationState } from '../../state/location.state';
import { MapState } from '../../state/map.state';
import LocationCoordinate from '../../utils/location-coordinate.util';
import AnimationHelper from './animation.helper';
import MapHelper from './map.helper';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {

  readonly newLocationPopupElementId: string = 'newLocationPopupId';
  readonly mapElementId: string = 'mapId';

  @Select(LocationState.getLocations) locations$: Observable<Location[]>;
  @Select(MapState.getClickedCoordinate) clickedCoordinate$: Observable<Coordinate>;
  @Select(MapState.getCenterCoordinate) centerCoordinate$: Observable<Coordinate>;
  @Select(MapState.getHighlightCoordinate) highlightCoordinate$: Observable<Coordinate>;

  private map: Map;
  private view: View = MapHelper.createView();
  private popup: Overlay = new Overlay({});
  private clickPoint: Point = new Point([]);
  private highlightPoint: Point = new Point([]);
  private locationsLayer: Vector;

  popupLocationName: string;
  isClickAtExistingPoint: boolean; // todo: clicking on the same point is not actually existing location
  coordToLoc = LocationCoordinate.toLocation;

  constructor(
    private store: Store,
  ) {
    this.locations$.subscribe(this.onLocationsChanged);
    this.clickedCoordinate$.subscribe(this.onClickedCoordinateChanged);
    this.centerCoordinate$.subscribe(this.onCenterCoordinateChanged);
    this.highlightCoordinate$.subscribe(this.onHighlightCoordinateChanged);
  }

  ngAfterViewInit(): void {
    this.view = MapHelper.createView();
    this.map = MapHelper.createMap(this.mapElementId, this.view);

    this.popup = MapHelper.createPopup(this.newLocationPopupElementId);
    this.map.addOverlay(this.popup);

    this.locationsLayer = MapHelper.createLocationsLayer();
    this.map.addLayer(this.locationsLayer);

    this.map.addLayer(MapHelper.createClickPoint(this.clickPoint));
    this.map.addLayer(MapHelper.createHighlightPoint(this.highlightPoint));

    this.map.on('singleclick', this.onMapClick);
  }

  closePopup(): void {
    this.popup.setPosition(undefined);
  }

  onCreateLocation(): void {
    const coordinate = this.clickPoint.getCoordinates();
    const location = LocationCoordinate.toLocation(coordinate);
    location.locationName = this.popupLocationName;

    this.store.dispatch(new AddLocation(location));

    this.closePopup();
    this.popupLocationName = '';
  }

  onAddToFilterClicked(): void {
    this.addCoordinatesToFilter();
    this.closePopup();
  }

  private addCoordinatesToFilter(): void {
    const location = LocationCoordinate.toLocation(this.clickPoint.getCoordinates());
    this.store.dispatch(new UpdateFilter({
      lon: location.lng,
      lat: location.lat,
      isFilterByAddressId: false,
    }));
  }

  private onLocationsChanged = (locations: Location[]): void => {
    if (!this.locationsLayer) {
      return;
    }
    const features = !locations ? undefined : locations.map(this.locationToFeature);
    this.locationsLayer.setSource(new sourceVector({features}));

    AnimationHelper.zoomTo(this.view, this.locationsLayer);
  }

  private onClickedCoordinateChanged = (coordinate: Coordinate): void => {
    this.clickPoint.setCoordinates(coordinate);
    this.popup.setPosition(coordinate);
  }

  private onCenterCoordinateChanged = (coordinate: Coordinate): void => {
    AnimationHelper.flyTo(this.view, coordinate);
  }

  private onHighlightCoordinateChanged = (coordinate: Coordinate): void => {
    this.highlightPoint.setCoordinates(coordinate);
  }

  private onMapClick = (event: any): void => {
    this.store.dispatch(new UpdateClickedCoordinate(event.coordinate)).subscribe(() => {
      this.isClickAtExistingPoint = this.map.hasFeatureAtPixel(event.pixel);
    });
  }

  private locationToFeature = (location: Location): Feature => {
    return new Feature({
      geometry: new Point(LocationCoordinate.toCoordinate(location)),
    });
  }
}
