import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AddLocation, FetchLocations, ToggleLoading, UpdateFilter, UpdateFilterCoordinates } from '../actions/location.action';
import Filter from '../models/filter.model';
import { LocationModel as Location } from '../models/location.model';
import { LocationService } from '../services/location.service';


export class LocationStateModel {
  loadingCounter: number;
  locations: Location[];
  filter: Filter;
}

@State<LocationStateModel>({
  name: 'location',
  defaults: {
    loadingCounter: 0,
    locations: [],
    filter: new Filter(),
  },
})

export class LocationState {

  @Selector()
  static getLocations(state: LocationStateModel): Location[] {
    return state.locations;
  }

  @Selector()
  static isLoading(state: LocationStateModel): boolean {
    return state.loadingCounter > 0;
  }

  @Selector()
  static getFilter(state: LocationStateModel): Filter {
    return state.filter;
  }

  constructor(
    private locationsService: LocationService,
    private store: Store,
  ) {
  }

  @Action(AddLocation)
  add(context: StateContext<LocationStateModel>, action: AddLocation): void {
    this.store.dispatch(new ToggleLoading(true));
    this.locationsService.create(action.payload).pipe(
      tap(() => {
        this.store.dispatch(new FetchLocations());
      }),
      tap(() => {
        this.store.dispatch(new ToggleLoading(false));
      }),
    ).subscribe();
  }

  @Action(FetchLocations)
  fetch(context: StateContext<LocationStateModel>, action: FetchLocations): void {
    this.store.dispatch(new ToggleLoading(true));

    const state = context.getState();
    this.locationsService.getFiltered(state.filter).pipe(
      tap((result: Location[]) => {
        context.patchState({
          locations: result,
        });
      }),
      tap(() => {
        this.store.dispatch(new ToggleLoading(false));
      }),
    ).subscribe();
  }

  @Action(ToggleLoading)
  toggleLoading(context: StateContext<LocationStateModel>, action: ToggleLoading): void {
    const state = context.getState();
    context.patchState({
      loadingCounter: action.payload === true ? state.loadingCounter + 1 : (state.loadingCounter > 1 ? state.loadingCounter - 1 : 0),
    });
  }

  @Action(UpdateFilter)
  updateFilter(context: StateContext<LocationStateModel>, action: UpdateFilter): void {
    const state = context.getState();
    const filter = {...state.filter, ...action.payload};
    context.patchState({
      filter,
    });
  }

  @Action(UpdateFilterCoordinates)
  updateFilterCoordinates(context: StateContext<LocationStateModel>, action: UpdateFilterCoordinates): void {
    const state = context.getState();
    const filter = {...state.filter};
    filter.isFilterByAddressId = false;
    filter.lat = action.payload.lat;
    filter.lon = action.payload.lon;
    context.patchState({
      filter,
    });
  }

}
