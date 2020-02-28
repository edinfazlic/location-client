import { Injectable } from '@angular/core';
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
  ) {
  }

  public openNewLocationDialog(): void {
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
