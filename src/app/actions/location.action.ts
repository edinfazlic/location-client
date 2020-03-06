import { LocationModel as Location } from '../models/location.model';

export class AddLocation {
  static readonly type = '[Location] AddLocation';

  constructor(public payload: Location) {
  }
}

export class UpdateLocation {
  static readonly type = '[Location] UpdateLocation';

  constructor(public payload: Location) {
  }
}

export class DeleteLocation {
  static readonly type = '[Location] DeleteLocation';

  constructor(public payload: string) {
  }
}

export class FetchLocations {
  static readonly type = '[Location] FetchLocations';
}

export class HighlightLocation {
  static readonly type = '[Location] HighlightLocation';

  constructor(public payload: Location) {
  }
}

export class OpenNewLocationDialog {
  static readonly type = '[Location] OpenNewLocationDialog';
}

export class OpenEditLocationDialog {
  static readonly type = '[Location] OpenEditLocationDialog';

  constructor(public payload: Location) {
  }
}

export class ToggleLoading {
  static readonly type = '[Location] ToggleLoading';

  constructor(public payload: boolean) {
  }
}
