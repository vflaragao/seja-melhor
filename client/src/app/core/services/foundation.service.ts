import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

import { Foundation, FoundationDTO } from '@models/foundation';

@Injectable({
  providedIn: 'root'
})
export class FoundationService {

  constructor(
    private http: HttpClient
  ) { }

  save(foundation: Foundation) {
    return this.http.post<FoundationDTO>(`${environment.API_BASE}/foundations`, foundation).toPromise();
  }
}
