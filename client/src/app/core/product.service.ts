import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Product } from '@models/product';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  save(payload: Product) {
    return this.http.post<Product>(`${environment.API_BASE}/products`, payload).toPromise();
  }

  list(query: string) {
    const params = new HttpParams().set('q', query);
    return this.http.get<Product[]>(`${environment.API_BASE}/products`, { params }).toPromise();
  }
}
