import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatTableModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { LocationContainerComponent } from './components/location-container/location-container.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { MapComponent } from './components/map/map.component';
import { NewLocationComponent } from './components/new-location/new-location.component';
import { LocationService } from './services/location.service';
import { LocationState } from './state/location.state';
import { MapState } from './state/map.state';

@NgModule({
  declarations: [
    AppComponent,
    LocationListComponent,
    FilterComponent,
    NewLocationComponent,
    MapComponent,
    LocationContainerComponent,
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
    MatRadioModule,
    MatIconModule,
    FlexLayoutModule,
    NgxsModule.forRoot([
      LocationState,
      MapState,
    ], {
      developmentMode: !environment.production,
    }),
  ],
  providers: [LocationService],
  bootstrap: [AppComponent],
  entryComponents: [NewLocationComponent],
})
export class AppModule {
}
