import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {
  ADMIN_USER_ENDPOINT = 'api-admin/user';

  constructor(private http: HttpClient) {
  }

  getUsers(searchObject: any, sortOptions: any): Observable<any> {
    const params = {
      column: sortOptions.column,
      direction: sortOptions.direction
    };

    return this.http.post(`${this.ADMIN_USER_ENDPOINT}`, searchObject, {
      headers: {'Content-Type': 'application/json'},
      params: params
    });
  }
}
