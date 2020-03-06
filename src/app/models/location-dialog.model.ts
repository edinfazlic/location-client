import { LocationModel as Location } from './location.model';

export default class LocationDialog {
  location: Location;

  constructor(public action: LocationDialogActionEnum) {
  }

  public static create(): LocationDialog {
    return new LocationDialog(LocationDialogActionEnum.CREATE);
  }

  public static edit(location: Location): LocationDialog {
    const locationDialog = new LocationDialog(LocationDialogActionEnum.EDIT);
    locationDialog.location = location;
    return locationDialog;
  }
}

export enum LocationDialogActionEnum {
  CREATE = 'Enter new location',
  EDIT = 'Edit location',
}
