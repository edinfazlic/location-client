import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../configs/api-config';
import Filter from '../models/filter.model';
import { LocationModel as Location } from '../models/location.model';

@Injectable()
export class LocationService {

  private readonly apiUrl = ApiConfig.API_URL;

  constructor(private http: HttpClient) {
  }

  public create(location: Location): Observable<Location> {
    return this.http.post<Location>(`${this.apiUrl}/location`, location);
  }

  public update(location: Location): void {
    this.http.put<Location>(`${this.apiUrl}/location`, location);
  }

  public delete(locationId: number): void {
    this.http.delete<Location>(`${this.apiUrl}/location/${locationId}`);
  }

  public getAll(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}/location`);
  }

  public get(id: string): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/location/${id}`);
  }

  public getFiltered(filter: Filter): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}/location/filtered?addressId=${filter.addressId}&radius=${filter.radius}`);
  }
}
