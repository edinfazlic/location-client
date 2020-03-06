import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import {
  AddLocation,
  DeleteLocation,
  FetchLocations,
  HighlightLocation,
  OpenEditLocationDialog,
  OpenNewLocationDialog,
  ToggleLoading,
  UpdateLocation,
} from '../actions/location.action';
import { LocationModel as Location } from '../models/location.model';
import { LocationService } from '../services/fetch/location.service';
import { DialogService } from '../services/logic/dialog.service';
import { FilterState } from './filter.state';


export class LocationStateModel {
  loadingCounter: number;
  locations: Location[];
  highlightLocation: Location;
}

@State<LocationStateModel>({
  name: 'location',
  defaults: {
    loadingCounter: 0,
    locations: [],
    highlightLocation: new Location(),
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
  static getHighlightLocation(state: LocationStateModel): Location {
    return state.highlightLocation;
  }

  constructor(
    private locationsService: LocationService,
    private store: Store,
    private dialogService: DialogService,
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

  @Action(UpdateLocation)
  edit(context: StateContext<LocationStateModel>, action: UpdateLocation): void {
    this.store.dispatch(new ToggleLoading(true));
    this.locationsService.update(action.payload).pipe(
      tap(() => {
        this.store.dispatch(new FetchLocations());
      }),
      tap(() => {
        this.store.dispatch(new ToggleLoading(false));
      }),
    ).subscribe();
  }

  @Action(DeleteLocation)
  delete(context: StateContext<LocationStateModel>, action: DeleteLocation): void {
    this.store.dispatch(new ToggleLoading(true));
    this.locationsService.delete(action.payload).pipe(
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

    const filter = this.store.selectSnapshot(FilterState.getFilter);
    this.locationsService.getFiltered(filter).pipe(
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

  @Action(HighlightLocation)
  highlight(context: StateContext<LocationStateModel>, action: HighlightLocation): void {
    context.patchState({
      highlightLocation: action.payload,
    });
  }

  @Action(OpenNewLocationDialog)
  openNewLocationDialog(context: StateContext<LocationStateModel>, action: OpenNewLocationDialog): void {
      this.dialogService.openNewLocationDialog();
  }

  @Action(OpenEditLocationDialog)
  openEditLocationDialog(context: StateContext<LocationStateModel>, action: OpenEditLocationDialog): void {
      this.dialogService.openEditLocationDialog(action.payload);
  }

  @Action(ToggleLoading)
  toggleLoading(context: StateContext<LocationStateModel>, action: ToggleLoading): void {
    const state = context.getState();
    context.patchState({
      loadingCounter: action.payload === true ? state.loadingCounter + 1 : (state.loadingCounter > 1 ? state.loadingCounter - 1 : 0),
    });
  }

}
