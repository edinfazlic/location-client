import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LocationModel as Location } from 'src/app/models/location.model';
import { DeleteLocation, HighlightLocation, UpdateFilter } from '../../actions/location.action';
import { UpdateCenterCoordinate } from '../../actions/map.action';
import { LocationState } from '../../state/location.state';
import LocationCoordinate from '../../utils/location-coordinate.util';
import { LocationListColumn } from './location-list-column.enum';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationListComponent {

  @Select(LocationState.getLocations) locations$: Observable<Location[]>;
  @Select(LocationState.getHighlightLocation) highlightedLocation$: Observable<Location>;

  column = LocationListColumn;
  displayedColumns: string[] = [this.column.ID, this.column.LOCATION_NAME, this.column.LATITUDE, this.column.LONGITUDE, this.column.NEW];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private store: Store,
  ) {
  }

  onIdDoubleClick(id: string): void {
    this.store.dispatch(new UpdateFilter({
      addressId: id,
      isFilterByAddressId: true,
    }));
  }

  deleteLocation(addressId: string): void {
    // todo: when deleting last row in the table, it stays "highlighted location", meaning there is coordinate on the map leftover
    this.store.dispatch(new DeleteLocation(addressId));
  }

  goToLocation(location: Location): void {
    const coordinate = LocationCoordinate.toCoordinate(location);
    this.store.dispatch(new UpdateCenterCoordinate(coordinate));
  }

  onHoverRow(row: Location): void {
    this.store.dispatch(new HighlightLocation(row));
  }

  clearRowHover(): void {
    this.onHoverRow(new Location());
  }
}
