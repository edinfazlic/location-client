import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { LocationModel as Location } from 'src/app/models/location.model';
import { LocationListColumn } from './location-list-column.enum';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
})
export class LocationListComponent {

  @Input()
  locations: Location[] = [];

  @Output()
  newLocation: EventEmitter<void> = new EventEmitter();

  column = LocationListColumn;
  displayedColumns: string[] = [this.column.ID, this.column.LOCATION_NAME, this.column.LATITUDE, this.column.LONGITUDE, this.column.NEW];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  addNew(): void {
    this.newLocation.emit();
  }

}
