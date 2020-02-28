import Filter from '../models/filter.model';
import { LocationModel as Location } from '../models/location.model';

export class AddLocation {
  static readonly type = '[Location] AddLocation';

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

export class ClearFilter {
  static readonly type = '[Location] ClearFilter';
}
