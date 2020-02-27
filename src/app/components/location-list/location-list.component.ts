import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LocationModel as Location } from 'src/app/models/location.model';
import { UpdateFilter } from '../../actions/location.action';
import { LocationState } from '../../state/location.state';
import { LocationListColumn } from './location-list-column.enum';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationListComponent {

  @Output()
  newLocation: EventEmitter<void> = new EventEmitter();

  @Select(LocationState.getLocations) locations$: Observable<Location[]>;

  column = LocationListColumn;
  displayedColumns: string[] = [this.column.ID, this.column.LOCATION_NAME, this.column.LATITUDE, this.column.LONGITUDE, this.column.NEW];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private store: Store,
  ) {
  }

  addNew(): void {
    this.newLocation.emit();
  }

  onIdDoubleClick(id: string): void {
    this.store.dispatch(new UpdateFilter({
      addressId: id,
      isFilterByAddressId: true,
    }));
  }
}
