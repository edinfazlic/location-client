import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Coordinate } from 'ol/coordinate';
import { UpdateClickedCoordinate } from '../actions/map.action';


export class MapStateModel {
  clickedCoordinate: Coordinate;
}

@State<MapStateModel>({
  name: 'map',
  defaults: {
    clickedCoordinate: [],
  },
})

export class MapState {

  @Selector()
  static getClickedCoordinate(state: MapStateModel): Coordinate {
    return state.clickedCoordinate;
  }

  @Action(UpdateClickedCoordinate)
  add(context: StateContext<MapStateModel>, action: UpdateClickedCoordinate): void {
    context.patchState({
      clickedCoordinate: action.payload,
    });
  }

}
