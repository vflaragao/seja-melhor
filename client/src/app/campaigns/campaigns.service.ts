import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CampaignCreateDTO, CampaignDTO } from '@models/campaign';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  constructor(
    private http: HttpClient
  ) { }

  save(payload: CampaignCreateDTO) {
    return this.http.post<CampaignDTO>(`${environment.API_BASE}/campaigns`, payload).toPromise();
  }
}
