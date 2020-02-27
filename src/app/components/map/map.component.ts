import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { Feature, Overlay } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import { Vector } from 'ol/layer';
import Map from 'ol/Map';
import { fromLonLat } from 'ol/proj';
import { Vector as sourceVector } from 'ol/source';
import { LocationModel as Location } from 'src/app/models/location.model';
import { AddLocation, UpdateFilterCoordinates } from '../../actions/location.action';
import Filter from '../../models/filter.model';
import MapHelper from './map.helper';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {

  readonly newLocationPopupElementId: string = 'newLocationPopupId';
  readonly mapElementId: string = 'mapId';

  @Input()
  set locations(value: Location[]) {
    const features = !value ? undefined : value.map((location: Location) => {
      return new Feature({
        geometry: new Point([location.lng, location.lat]),
      });
    });
    if (!this.map) {
      return;
    }
    const points = this.map.getLayers().getArray()[2] as Vector;
    points.setSource(new sourceVector({features}));
  }

  @Output()
  createLocation: EventEmitter<Location> = new EventEmitter();

  private map: Map;
  private popup: Overlay;
  private clickPointVector: Vector;
  private clickedCoordinate: Coordinate = [];

  popupLocationName: string;
  isClickAtExistingPoint: boolean;

  constructor(
    private store: Store,
  ) {
  }

  ngAfterViewInit(): void {
    this.map = MapHelper.createMap(this.mapElementId);

    this.popup = MapHelper.createPopup(this.newLocationPopupElementId);
    this.map.addOverlay(this.popup);

    this.clickPointVector = MapHelper.createClickPoint();
    this.map.addLayer(this.clickPointVector);

    this.map.on('singleclick', this.onMapClick);


    const layer = new Vector({
      source: new sourceVector({
        features: [
          new Feature({
            geometry: new Point(fromLonLat([4.35247, 50.84673])),
          }),
          new Feature({
            geometry: new Point(fromLonLat([5.35247, 50.84673])),
          }),
          new Feature({
            geometry: new Point(fromLonLat([6.35247, 50.84673])),
          }),
          new Feature({
            geometry: new Point(fromLonLat([7.35247, 50.84673])),
          }),
        ],
      }),
      style: MapHelper.pointStyle(),
    });
    this.map.addLayer(layer);
  }

  closePopup(): void {
    this.popup.setPosition(undefined);
  }

  onConfirmPopup(): void {
    const location = new Location();
    location.locationName = this.popupLocationName;
    const geometry = this.clickPointVector.getSource().getFeatures()[0].getGeometry() as Point;
    const coordinate = geometry.getCoordinates();
    location.lng = coordinate[0];
    location.lat = coordinate[1];

    this.store.dispatch(new AddLocation(location));

    this.closePopup();
    this.popupLocationName = '';
  }

  private onMapClick = (event: any): void => {
    this.clickedCoordinate = event.coordinate;
    this.updateClickPointCoordinate();
    this.updatePopupPosition();
    this.isClickAtExistingPoint = this.map.hasFeatureAtPixel(event.pixel);
  }

  addCoordinatesToFilter(): void {
    const filter = new Filter();
    filter.lon = this.clickedCoordinate[0];
    filter.lat = this.clickedCoordinate[1];
    this.store.dispatch(new UpdateFilterCoordinates(filter));
  }

  private updateClickPointCoordinate(): void {
    this.clickPointVector.getSource().getFeatures()[0].setGeometry(new Point(this.clickedCoordinate));
  }

  private updatePopupPosition(): void {
    this.popup.setPosition(this.clickedCoordinate);
  }
}
