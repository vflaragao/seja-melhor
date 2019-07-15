import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CollectPointCreateDTO, CollectPointGetDTO } from '@models/collect-point';

import { environment } from '@env/environment';
import { DonationGetDTO } from '@models/donation';

@Injectable({
  providedIn: 'root'
})
export class CollectPointService {

  constructor(
    private readonly _http: HttpClient
  ) { }

  save(payload: CollectPointCreateDTO) {
    return this._http.post<CollectPointGetDTO>(`${environment.API_BASE}/collectPoints`, payload).toPromise();
  }

  update(id: string, payload: CollectPointCreateDTO) {
    return this._http.post<CollectPointGetDTO>(`${environment.API_BASE}/collectPoints/${id}`, payload).toPromise();
  }

  get(id: string) {
    return this._http.get<CollectPointGetDTO>(`${environment.API_BASE}/collectPoints/${id}`).toPromise();
  }
  
  getDonations(id: string) {
    return this._http.get<DonationGetDTO[]>(`${environment.API_BASE}/collectPoints/${id}/donations`).toPromise();
  }
}
