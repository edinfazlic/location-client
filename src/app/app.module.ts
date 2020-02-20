import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { NewLocationComponent } from './components/new-location/new-location.component';
import { LocationService } from './services/location.service';

@NgModule({
  declarations: [
    AppComponent,
    LocationListComponent,
    FilterComponent,
    NewLocationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
  ],
  providers: [LocationService],
  bootstrap: [AppComponent],
  entryComponents: [NewLocationComponent],
})
export class AppModule {
}
