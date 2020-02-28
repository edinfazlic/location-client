import { Coordinate } from 'ol/coordinate';
import { LocationModel as Location} from '../models/location.model';

export default class LocationCoordinate {

  public static toCoordinate(location: Location): Coordinate {
    return [location.lng, location.lat];
  }

  public static toLocation(coordinate: Coordinate): Location {
    const location = new Location();
    location.lng = coordinate[0];
    location.lat = coordinate[1];
    return location;
  }
}
