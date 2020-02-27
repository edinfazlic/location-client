import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import Filter from 'src/app/models/filter.model';
import { FetchLocations, UpdateFilter } from '../../actions/location.action';
import { LocationState } from '../../state/location.state';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {

  @Select(LocationState.getFilter) filter$: Observable<Filter>;

  constructor(
    private store: Store,
  ) {
  }

  searchClicked(): void {
    this.store.dispatch(new FetchLocations());
  }

  onInputFieldBlur(attribute: string, value: string | boolean): void {
    this.store.dispatch(new UpdateFilter({
      [attribute]: value,
    }));
  }

}
