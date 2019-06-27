import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

import { FoundationCreateDTO, FoundationGetDTO } from '@models/foundation';

@Injectable({
  providedIn: 'root'
})
export class FoundationService {

  constructor(
    private http: HttpClient
  ) { }

  save(foundation: FoundationCreateDTO) {
    return this.http.post<FoundationGetDTO>(`${environment.API_BASE}/foundations`, foundation).toPromise();
  }
}
