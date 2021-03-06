import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../configs/api-config';
import Filter from '../../models/filter.model';
import { LocationModel as Location } from '../../models/location.model';

@Injectable()
export class LocationService {

  private readonly locationUrl = `${ApiConfig.API_URL}/location`;

  constructor(private http: HttpClient) {
  }

  public create(location: Location): Observable<Location> {
    return this.http.post<Location>(this.locationUrl, location);
  }

  public update(location: Location): Observable<Location> {
    return this.http.put<Location>(this.locationUrl, location);
  }

  public delete(locationId: string): Observable<Location> {
    return this.http.delete<Location>(`${this.locationUrl}/${locationId}`);
  }

  public getAll(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.locationUrl}/all`);
  }

  public get(id: string): Observable<Location> {
    return this.http.get<Location>(`${this.locationUrl}/${id}`);
  }

  public getFiltered(filter: Filter): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.locationUrl}/filtered`, {
      params: filter as any,
    });
  }
}
