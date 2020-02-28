import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Coordinate } from 'ol/coordinate';
import { UpdateCenterCoordinate, UpdateClickedCoordinate } from '../actions/map.action';
import { LocationModel as Location } from '../models/location.model';
import LocationCoordinate from '../utils/location-coordinate.util';
import { LocationState } from './location.state';


export class MapStateModel {
  clickedCoordinate: Coordinate;
  centerCoordinate: Coordinate;
}

@State<MapStateModel>({
  name: 'map',
  defaults: {
    clickedCoordinate: [],
    centerCoordinate: [],
  },
})

export class MapState {

  @Selector()
  static getClickedCoordinate(state: MapStateModel): Coordinate {
    return state.clickedCoordinate;
  }

  @Selector()
  static getCenterCoordinate(state: MapStateModel): Coordinate {
    return state.centerCoordinate;
  }

  @Selector([LocationState.getHighlightLocation])
  static getHighlightCoordinate(highlightLocation: Location): Coordinate {
    return LocationCoordinate.toCoordinate(highlightLocation);
  }

  @Action(UpdateClickedCoordinate)
  updateClickedCoordinate(context: StateContext<MapStateModel>, action: UpdateClickedCoordinate): void {
    context.patchState({
      clickedCoordinate: action.payload,
    });
  }

  @Action(UpdateCenterCoordinate)
  updateCenterCoordinate(context: StateContext<MapStateModel>, action: UpdateCenterCoordinate): void {
    context.patchState({
      centerCoordinate: action.payload,
    });
  }

}
