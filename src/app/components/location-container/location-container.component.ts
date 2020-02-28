import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchLocations } from '../../actions/location.action';
import { LocationState } from '../../state/location.state';

@Component({
  selector: 'app-location-container',
  templateUrl: './location-container.component.html',
  styleUrls: ['./location-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationContainerComponent implements AfterViewInit {

  @Select(LocationState.isLoading) isLoading$: Observable<boolean>;

  constructor(
    private store: Store,
  ) {
  }

  ngAfterViewInit(): void {
    this.store.dispatch(new FetchLocations());
  }
}
