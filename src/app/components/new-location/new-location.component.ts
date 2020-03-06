import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LocationModel as Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewLocationComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public location: Location,
  ) {
    this.location = new Location();
  }
}
