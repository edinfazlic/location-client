import { Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngxs/store';
import { AddLocation, UpdateLocation } from '../../actions/location.action';
import { LocationDialogComponent } from '../../components/location-dialog/location-dialog.component';
import LocationDialog from '../../models/location-dialog.model';
import { LocationModel as Location } from '../../models/location.model';

@Injectable()
export class DialogService {

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private zone: NgZone,
  ) {
  }

  public openNewLocationDialog(): void {
    this.zone.run(() => { // Keep the inside function calls all within the Angular zone
      this.openDialog(AddLocation, LocationDialog.create());
    });
  }

  public openEditLocationDialog(location: Location): void {
    this.zone.run(() => { // Keep the inside function calls all within the Angular zone
      this.openDialog(UpdateLocation, LocationDialog.edit(location));
    });
  }

  private openDialog = (dispatchAction: typeof AddLocation | typeof UpdateLocation, data: LocationDialog): void => {
    const dialogRef = this.dialog.open<LocationDialogComponent, LocationDialog, Location>(
      LocationDialogComponent,
      {
        width: '300px',
        data,
      });

    dialogRef.afterClosed().subscribe((result: Location) => {
      if (!result) { // Cancel
        return;
      }
      this.store.dispatch(new dispatchAction(result));
    });
  }
}
