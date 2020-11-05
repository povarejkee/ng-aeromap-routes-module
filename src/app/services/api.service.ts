import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RoutesApi {
  constructor(private http: HttpClient) {}

  public getAutocompleteItemsByStr(str: string): Observable<any> {
    return this.http.get<any>(`http://192.168.3.216:8098/api/AeroData/routeAutoComplit?str=${str}`); // todo запроксировать
  }
}
