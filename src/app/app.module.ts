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
  MatTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { LocationContainerComponent } from './components/location-container/location-container.component';
import { LocationDialogComponent } from './components/location-dialog/location-dialog.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { MapComponent } from './components/map/map.component';
import { PopupComponent } from './components/map/popup/popup.component';
import { LocationService } from './services/fetch/location.service';
import { DialogService } from './services/logic/dialog.service';
import { FilterState } from './state/filter.state';
import { LocationState } from './state/location.state';
import { MapState } from './state/map.state';

@NgModule({
  declarations: [
    AppComponent,
    LocationListComponent,
    FilterComponent,
    LocationDialogComponent,
    MapComponent,
    PopupComponent,
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
    MatTooltipModule,
    FlexLayoutModule,
    NgxsModule.forRoot([
      FilterState,
      LocationState,
      MapState,
    ], {
      developmentMode: !environment.production,
      selectorOptions: {
        injectContainerState: false,
      },
    }),
  ],
  providers: [
    LocationService,
    DialogService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [LocationDialogComponent],
})
export class AppModule {
}
