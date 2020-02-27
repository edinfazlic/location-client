import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Feature, Overlay } from 'ol';
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

  private map: Map;
  private popup: Overlay = new Overlay({});
  private clickPointLayer: Vector;
  private clickPoint: Point = new Point([]);
  private locationsLayer: Vector;

  popupLocationName: string;
  isClickAtExistingPoint: boolean; // todo: clicking on the same point is not actually existing location

  constructor(
    private store: Store,
  ) {
    this.locations$.subscribe(this.onLocationObservable);
    this.clickedCoordinate$.subscribe(this.onClickedCoordinateObservable);
  }

  ngAfterViewInit(): void {
    this.map = MapHelper.createMap(this.mapElementId);

    this.popup = MapHelper.createPopup(this.newLocationPopupElementId);
    this.map.addOverlay(this.popup);

    this.clickPointLayer = MapHelper.createClickPoint(this.clickPoint);
    this.map.addLayer(this.clickPointLayer);

    this.map.on('singleclick', this.onMapClick);


    this.locationsLayer = new Vector({
      source: new sourceVector(),
      style: MapHelper.pointStyle(),
    });
    this.map.addLayer(this.locationsLayer);
  }

  closePopup(): void {
    this.popup.setPosition(undefined);
  }

  onCreateLocation(): void {
    const location = new Location();
    location.locationName = this.popupLocationName;
    const coordinate = this.clickPoint.getCoordinates();
    location.lng = coordinate[0];
    location.lat = coordinate[1];

    this.store.dispatch(new AddLocation(location));

    this.closePopup();
    this.popupLocationName = '';
  }

  onAddToFilterClicked(): void {
    this.addCoordinatesToFilter();
    this.closePopup();
  }

  private addCoordinatesToFilter(): void {
    this.store.dispatch(new UpdateFilter({
      lon: this.clickPoint.getCoordinates()[0],
      lat: this.clickPoint.getCoordinates()[1],
      isFilterByAddressId: false,
    }));
  }

  private onClickedCoordinateObservable = (coordinate: Coordinate): void => {
    this.clickPoint.setCoordinates(coordinate);
    this.popup.setPosition(coordinate);
  }

  private onLocationObservable = (locations: Location[]): void => {
    if (!this.map) {
      return;
    }
    const features = !locations ? undefined : locations.map(this.locationToFeature);
    this.locationsLayer.setSource(new sourceVector({features}));
  }

  private onMapClick = (event: any): void => {
    this.store.dispatch(new UpdateClickedCoordinate(event.coordinate)).subscribe(() => {
      this.isClickAtExistingPoint = this.map.hasFeatureAtPixel(event.pixel);
    });
  }

  private locationToFeature = (location: Location): Feature => {
    return new Feature({
      geometry: new Point([location.lng, location.lat]),
    });
  }
}
