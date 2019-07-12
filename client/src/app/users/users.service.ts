import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@env/environment';

import { User, UserDTO } from '@models/user';
import { CampaignDTO } from '@models/campaign';
import { CollectPointDTO } from '@models/collect-point';
import { Collaborator } from '@models/fields/collaborator';

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

  listCollaborators(query: string) {
    let params = new HttpParams().set('q', query);
    params = params.set('s', '5');
    return this.http.get<Collaborator[]>(`${environment.API_BASE}/users/collaborators`, { params }).toPromise();
  }
}
