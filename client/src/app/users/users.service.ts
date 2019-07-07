import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

import { User, UserDTO } from '@models/user';
import { CampaignDTO } from '@models/campaign';
import { CollectPointDTO } from '@models/collect-point';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  save(user: User) {
    return this.http.post<UserDTO>(`${environment.API_BASE}/users`, user).toPromise();
  }

  get(id: string) {
    return this.http.get<UserDTO>(`${environment.API_BASE}/users/${id}`).toPromise();
  }

  listCampaigns(id: string) {
    return this.http.get<CampaignDTO[]>(`${environment.API_BASE}/users/${id}/campaigns`).toPromise();
  }

  listCollectPoints(id: string) {
    return this.http.get<CollectPointDTO[]>(`${environment.API_BASE}/users/${id}/collectPoints`).toPromise();
  }
}
