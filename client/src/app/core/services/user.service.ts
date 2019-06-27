import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, UserDTO } from '@models/user';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  save(user: User) {
    return this.http.post<UserDTO>(`${environment.API_BASE}/users`, user).toPromise();
  }

  get(id: string) {
    return this.http.get<UserDTO>(`${environment.API_BASE}/users/${id}`).toPromise();
  }
}
