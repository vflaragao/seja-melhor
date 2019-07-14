import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CampaignCreateDTO, CampaignDTO } from '@models/campaign';
import { environment } from '@env/environment';
import { Item } from '@models/fields/item';
import { CollectPointGetDTO } from '@models/collect-point';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  constructor(
    private _http: HttpClient
  ) { }

  save(payload: CampaignCreateDTO) {
    return this._http.post<CampaignDTO>(`${environment.API_BASE}/campaigns`, payload).toPromise();
  }

  getItems(id: string, query: string) {
    const params = new HttpParams().set('q', query);
    return this._http.get<Item[]>(`${environment.API_BASE}/campaigns/${id}/items`, { params }).toPromise();
  }

  getCollectPoints(id: string, query: string) {
    const params = new HttpParams().set('q', query);
    return this._http.get<CollectPointGetDTO[]>(`${environment.API_BASE}/campaigns/${id}/collectPoints`, { params }).toPromise();
  }
}
