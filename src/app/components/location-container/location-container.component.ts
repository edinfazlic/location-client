import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddLocation, FetchLocations } from '../../actions/location.action';
import { LocationModel as Location } from '../../models/location.model';
import { LocationService } from '../../services/location.service';
import { LocationState } from '../../state/location.state';
import { NewLocationComponent } from '../new-location/new-location.component';

@Component({
  selector: 'app-location-container',
  templateUrl: './location-container.component.html',
  styleUrls: ['./location-container.component.css'],
})
export class LocationContainerComponent implements AfterViewInit {

  @Select(LocationState.isLoading) isLoading$: Observable<boolean>;

  @Select(LocationState.getLocations) locations$: Observable<Location[]>;

  constructor(
    private store: Store,
    private locationsService: LocationService,
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
      this.createLocation(result);
    });
  }

  createLocation = (location: Location): void => {
    this.store.dispatch(new AddLocation(location));
  }
}
