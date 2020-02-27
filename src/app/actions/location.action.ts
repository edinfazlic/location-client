import Filter from '../models/filter.model';
import { LocationModel as Location } from '../models/location.model';

export class AddLocation {
  static readonly type = '[Location] AddLocation';

  constructor(public payload: Location) {
  }
}

export class FetchLocations {
  static readonly type = '[Location] FetchLocations';
}

export class ToggleLoading {
  static readonly type = '[Location] ToggleLoading';

  constructor(public payload: boolean) {
  }
}

export class UpdateFilter {
  static readonly type = '[Location] UpdateFilter';

  constructor(public payload: Partial<Filter>) {
  }
}
