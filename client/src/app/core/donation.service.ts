import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DonationCreateDTO } from '@models/donation';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(
    private _http: HttpClient
  ) { }

  save(payload: DonationCreateDTO) {
    return this._http.post<any>(`${environment.API_BASE}/donations`, payload).toPromise();
  }
}
