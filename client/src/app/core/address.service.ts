import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@env/environment';

import { Address } from '@models/fields/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient
  ) { }

  getByCEP(cep: string): Promise<Address> {
    const params = new HttpParams().set('q', cep);
    return this.http.get<Address>(`${environment.API_BASE}/address`, { params })
      .toPromise();
  }
}
