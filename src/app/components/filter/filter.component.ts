import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import Filter from 'src/app/models/filter.model';
import { ClearFilter, UpdateFilter } from '../../actions/filter.action';
import { FetchLocations, OpenNewLocationDialog } from '../../actions/location.action';
import { FilterState } from '../../state/filter.state';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {

  @Select(FilterState.getFilter) filter$: Observable<Filter>;

  constructor(
    private store: Store,
  ) {
  }

  searchClicked(): void {
    this.store.dispatch(new FetchLocations());
  }

  clearClicked(): void {
    this.store.dispatch(new ClearFilter());
  }

  newLocationClicked(): void {
    this.store.dispatch(new OpenNewLocationDialog());
  }

  onChangeInputField(attribute: string, value: string | boolean): void {
    this.store.dispatch(new UpdateFilter({
      [attribute]: value,
    }));
  }

}
