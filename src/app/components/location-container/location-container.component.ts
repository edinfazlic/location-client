import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddLocation, FetchLocations } from '../../actions/location.action';
import { LocationModel as Location } from '../../models/location.model';
import { LocationState } from '../../state/location.state';
import { NewLocationComponent } from '../new-location/new-location.component';

@Component({
  selector: 'app-location-container',
  templateUrl: './location-container.component.html',
  styleUrls: ['./location-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationContainerComponent implements AfterViewInit {

  @Select(LocationState.isLoading) isLoading$: Observable<boolean>;

  constructor(
    private store: Store,
    private dialog: MatDialog,
  ) {
  }

  ngAfterViewInit(): void {
    this.store.dispatch(new FetchLocations());
  }

  openAddNewLocationDialog(): void {
    const dialogRef = this.dialog.open(
      NewLocationComponent,
      {
        width: '250px',
      });

    dialogRef.afterClosed().subscribe((result: Location) => {
      if (!result) { // Cancel
        return;
      }
      this.store.dispatch(new AddLocation(result));
    });
  }

}
