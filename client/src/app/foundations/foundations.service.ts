import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@env/environment';

import { FoundationCreateDTO, FoundationGetDTO, FoundationUpdateDTO } from '@models/foundation';
import { CampaignDTO } from '@models/campaign';
import { CollectPointDTO, CollectPointGetDTO } from '@models/collect-point';
import { Collaborator } from '@models/fields/collaborator';
import { GoalCreateDTO, GoalGetDTO } from '@models/goal';
import { Item } from '@models/fields/item';

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

  update(foundation: FoundationUpdateDTO) {
    return this._http.put<FoundationUpdateDTO>(
      `${environment.API_BASE}/foundations/${foundation._id}`, foundation
    ).toPromise();
  }

  getGoal() {
    return this._http.get<GoalCreateDTO>(`${environment.API_BASE}/goals`).toPromise();
  }
  
  getGoalItems(id: string, query: string) {
    const params = new HttpParams().set('q', query);
    return this._http.get<Item[]>(`${environment.API_BASE}/goals/${id}/items`, { params }).toPromise();
  }
  
  getGoalCollectPoints(id: string, query: string) {
    const params = new HttpParams().set('q', query);
    return this._http.get<CollectPointGetDTO[]>(`${environment.API_BASE}/goals/${id}/collectPoints`, { params }).toPromise();
  }

  saveGoal(payload: GoalCreateDTO) {
    if (!payload._id) {
      return this._http.post<GoalCreateDTO>(`${environment.API_BASE}/goals`, payload).toPromise();
    } else {
      return this._http.put<GoalCreateDTO>(`${environment.API_BASE}/goals`, payload).toPromise();
    }
  }
}
