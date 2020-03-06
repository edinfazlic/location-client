import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ClearFilter, UpdateFilter } from '../actions/filter.action';
import Filter from '../models/filter.model';


export class FilterStateModel {
  filter: Filter;
}

@State<FilterStateModel>({
  name: 'filter',
  defaults: {
    filter: {
      isFilterByAddressId: true,
      radius: 1,
    } as Filter,
  },
})

export class FilterState {

  @Selector()
  static getFilter(state: FilterStateModel): Filter {
    return state.filter;
  }

  @Action(UpdateFilter)
  updateFilter(context: StateContext<FilterStateModel>, action: UpdateFilter): void {
    const state = context.getState();
    const filter = {...state.filter, ...action.payload};
    context.patchState({
      filter,
    });
  }

  @Action(ClearFilter)
  clearFilter(context: StateContext<FilterStateModel>, action: ClearFilter): void {
    context.patchState({
      filter: new Filter(),
    });
  }
}
