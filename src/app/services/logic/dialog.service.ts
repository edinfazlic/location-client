import { Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngxs/store';
import { AddLocation } from '../../actions/location.action';
import { NewLocationComponent } from '../../components/new-location/new-location.component';
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
    this.zone.run(this.openDialog); // Keep the inside function calls all within the Angular zone
  }

  private openDialog = (): void => {
    const dialogRef = this.dialog.open(
      NewLocationComponent,
      {
        width: '300px',
      });

    dialogRef.afterClosed().subscribe((result: Location) => {
      if (!result) { // Cancel
        return;
      }
      this.store.dispatch(new AddLocation(result));
    });
  }
}
