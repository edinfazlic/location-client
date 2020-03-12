import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import LocationDialog from '../../models/location-dialog.model';
import { LocationModel as Location } from '../../models/location.model';

@Component({
  selector: 'app-new-location',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationDialogComponent {

  location: Location;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: LocationDialog,
  ) {
    this.location = data.location ? {...data.location} : new Location();
  }
}
