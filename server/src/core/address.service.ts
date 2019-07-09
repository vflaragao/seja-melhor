import { Injectable, HttpService } from '@nestjs/common';

import { map } from 'rxjs/operators';

import { Address } from '@models/fields/address';

@Injectable()
export class AddressService {

    constructor(
        private readonly http: HttpService,
    ) {}

    async getAddress(cep: string): Promise<Address> {
        return this.http.get<any>(this.getAddressURI(cep))
            .pipe(
                map(res => res.data),
                map(raw => ({
                    cep: raw.cep,
                    district: raw.bairro,
                    street: raw.logradouro,
                    complement: raw.complemento,
                    state: raw.uf,
                    city: raw.localidade
                }) as Address)
            )
            .toPromise();
    }

    private getAddressURI(cep: string) {
        return `https://viacep.com.br/ws/${cep}/json/`;
    }
}
