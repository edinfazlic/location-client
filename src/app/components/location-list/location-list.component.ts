import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import Filter from 'src/app/models/filter.model';
import { LocationModel as Location } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location.service';
import { NewLocationComponent } from '../new-location/new-location.component';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
})
export class LocationListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'location_name', 'latitude', 'longitude', 'new'];
  locations: Location[] = [];
  filter: Filter = new Filter();

  isLoading = true;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private locationsService: LocationService,
    private dialog: MatDialog,
  ) {
  }

  ngAfterViewInit(): void {
    this.refreshList();
  }

  public addNew(): void {
    const dialogRef = this.dialog.open(
      NewLocationComponent,
      {
        width: '250px',
      });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) { // Cancel
        return;
      }
      // Add to database
      this.locationsService.create(result)
        .subscribe(this.refreshList);
    });
  }

  public onFilterChange(): void {
    this.refreshList();
  }

  private refreshList: () => void = () => {
    this.isLoading = true;

    this.getLocationsObservable()
      .subscribe(this.setLocations);
  }

  private getLocationsObservable(): Observable<Location[]> {
    if (this.filter.addressId) {
      return this.locationsService.getFiltered(this.filter);
    }
    return this.locationsService.getAll();
  }

  private setLocations: (locations: Location[]) => void = (locations: Location[]) => {
    this.locations = locations;
    this.isLoading = false;
  }
}
