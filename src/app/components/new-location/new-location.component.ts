import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LocationModel as Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.css'],
})
export class NewLocationComponent {

  constructor(
    public dialogRef: MatDialogRef<NewLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public location: Location,
  ) {
    this.location = new Location();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
