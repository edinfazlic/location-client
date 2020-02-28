import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Overlay } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Observable } from 'rxjs';
import { AddLocation, UpdateFilter } from '../../../actions/location.action';
import { MapState } from '../../../state/map.state';
import LocationCoordinate from '../../../utils/location-coordinate.util';
import MapHelper from '../helpers/map.helper';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent implements AfterViewInit {

  readonly elementId: string = 'popupId';

  @Output() created = new EventEmitter<Overlay>();

  @Select(MapState.getClickedCoordinate) clickedCoordinate$: Observable<Coordinate>;

  @ViewChild('locationNameInput', {static: false}) locationNameInputElement: ElementRef;

  locationName: string;
  coordToLoc = LocationCoordinate.toLocation;

  private popup: Overlay = new Overlay({});
  private clickedCoordinate: Coordinate;

  constructor(
    private store: Store,
  ) {
    this.clickedCoordinate$.subscribe(this.onClickedCoordinateChanged);
  }

  ngAfterViewInit(): void {
    this.popup = MapHelper.createPopup(this.elementId);
    this.created.emit(this.popup);
  }

  close(): void {
    this.popup.setPosition(undefined);
  }

  onCreateLocation(): void {
    const location = LocationCoordinate.toLocation(this.clickedCoordinate);
    location.locationName = this.locationName;

    this.store.dispatch(new AddLocation(location));

    this.close();
    this.locationName = '';
  }

  onAddToFilterClicked(): void {
    this.addCoordinatesToFilter();
    this.close();
  }

  private addCoordinatesToFilter(): void {
    const location = LocationCoordinate.toLocation(this.clickedCoordinate);
    this.store.dispatch(new UpdateFilter({
      lon: location.lng,
      lat: location.lat,
      isFilterByAddressId: false,
    }));
  }

  private onClickedCoordinateChanged = (coordinate: Coordinate): void => {
    this.clickedCoordinate = coordinate;
    this.popup.setPosition(coordinate);
    setTimeout(() => {
      this.locationNameInputElement.nativeElement.focus();
    }, 0);
  }
}
