import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@env/environment';

import { FoundationCreateDTO, FoundationGetDTO } from '@models/foundation';
import { CampaignDTO } from '@models/campaign';
import { CollectPointDTO } from '@models/collect-point';
import { Collaborator } from '@models/fields/collaborator';

@Injectable({
  providedIn: 'root'
})
export class FoundationsService {

  constructor(
    private _http: HttpClient
  ) { }

  get(_id: string) {
    return this._http.get<FoundationGetDTO>(`${environment.API_BASE}/foundations/${_id}`).toPromise();
  }

  list(query: string) {
    const params = new HttpParams().set('q', query);
    return this._http.get<FoundationGetDTO>(`${environment.API_BASE}/foundations`, { params }).toPromise();
  }

  listCampaigns(id: string) {
    return this._http.get<CampaignDTO[]>(`${environment.API_BASE}/foundations/${id}/campaigns`).toPromise();
  }

  listCollectPoints(id: string) {
    return this._http.get<CollectPointDTO[]>(`${environment.API_BASE}/foundations/${id}/collectPoints`).toPromise();
  }

  listCollaborators() {
    return this._http.get<Collaborator[]>(`${environment.API_BASE}/foundations/collaborators`).toPromise();
  }

  saveCollaborator(payload: Collaborator) {
    return this._http.post<FoundationGetDTO>(`${environment.API_BASE}/foundations/collaborators`, payload).toPromise();
  }

  removeCollaborator(payload: Collaborator) {
    return this._http.delete<FoundationGetDTO>(`${environment.API_BASE}/foundations/collaborators/${payload.user}`).toPromise();
  }

  save(foundation: FoundationCreateDTO) {
    foundation.email = foundation.credentials.email;
    return this._http.post<FoundationGetDTO>(`${environment.API_BASE}/foundations`, foundation).toPromise();
  }
}
