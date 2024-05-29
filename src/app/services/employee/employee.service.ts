import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private http: HttpClient) {}

  getUsers(page: number, perPage: number, searchText: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (searchText) {
      params = params.set('q', searchText);
    }

    return this.http.get<any>('https://reqres.in/api/users', { params });
  }

}
