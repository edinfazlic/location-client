import { Coordinate } from 'ol/coordinate';

export class UpdateClickedCoordinate {
  static readonly type = '[Map] UpdateClickedCoordinate';

  constructor(public payload: Coordinate) {
  }
}

export class UpdateCenterCoordinate {
  static readonly type = '[Map] UpdateCenterCoordinate';

  constructor(public payload: Coordinate) {
  }
}
