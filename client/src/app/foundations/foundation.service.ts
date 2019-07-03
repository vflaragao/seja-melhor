import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { environment } from '@env/environment';

import { FoundationCreateDTO, FoundationGetDTO } from '@models/foundation';
import { ActionCategory } from '@models/campaign';

@Injectable({
  providedIn: 'root'
})
export class FoundationService {

  constructor(
    private http: HttpClient
  ) { }

  get(_id: string) {
    return of({
      name: 'APIPA - ASSOCIAÇÃO PIAUIENSE DE PROTEÇÃO E AMOR AOS ANIMAIS',
      cnpj: '10216609000156',
      email: 'contato.apipa@gmail.com',
      phone: '86995571708',
      category: ActionCategory.ANIMALS,
      operatingInfo: {
        startTime: new Date(),
        endTime: new Date(),
        weekend: true,
      },
      address: {
        cep: '64073167',
        city: 'Teresina',
        state: 'Piauí',
        district: 'Uruguai',
        street: 'Rua Trinta e Oito',
        number: '1041',
        complement: 'Loteamento Vila Uruguai'
      }
    }).pipe(delay(1000)).toPromise();
  }
  
  list(query: string) {
    return of([
      {
        name: 'Instituição A',
        category: ActionCategory.PATIENTS,
        operatingInfo: {
          startTime: new Date(),
          endTime: new Date(),
          weekend: false,
        },
        address: {
          cep: '64025400',
          city: 'Teresina',
          state: 'Piauí',
          district: 'Parque Piauí',
          street: 'Quadra 107',
          number: 'Casa 11',
          complement: ''
        }
      },
      {
        name: 'Instituição B',
        category: ActionCategory.OLD,
        operatingInfo: {
          startTime: new Date(),
          endTime: new Date(),
          weekend: true,
        },
        address: {
          cep: '64025410',
          city: 'Teresina',
          state: 'Piauí',
          district: 'Bela Vista',
          street: 'Quadra 87',
          number: 'Casa 08',
          complement: 'Bloco C'
        }
      },
      {
        name: 'Casa Noix',
        category: ActionCategory.CHILDREN,
        operatingInfo: {
          startTime: new Date(),
          endTime: new Date(),
          weekend: true,
        },
        address: {
          cep: '64025410',
          city: 'Teresina',
          state: 'Piauí',
          district: 'Centro',
          street: 'Rua Tensão Alves',
          number: '137',
          complement: ''
        }
      },
    ])
    .pipe(delay(1000)).toPromise();
  }

  save(foundation: FoundationCreateDTO) {
    return this.http.post<FoundationGetDTO>(`${environment.API_BASE}/foundations`, foundation).toPromise();
  }
}
