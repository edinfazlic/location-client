import Filter from '../models/filter.model';

export class UpdateFilter {
  static readonly type = '[Filter] UpdateFilter';

  constructor(public payload: Partial<Filter>) {
  }
}

export class ClearFilter {
  static readonly type = '[Filter] ClearFilter';
}
