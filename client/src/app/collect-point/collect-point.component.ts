import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ItemUnit } from '@models/fields/item';
import { DonationStatus } from '@models/donation';
import { CollectPointGetDTO } from '@models/collect-point';
import { ProductTypeStatistics, ProductTypeValues } from '@models/product';
import { DonationStatusChangeComponent, StatusChangeData } from '@dialogs/index';

@Component({
  selector: 'app-collect-point',
  templateUrl: './collect-point.component.html',
  styleUrls: ['./collect-point.component.scss']
})
export class CollectPointComponent implements OnInit {

  private donationColumns = ['date', 'donator', 'products', 'actions'];

  private collectPoint: CollectPointGetDTO;
  private typeStats: ProductTypeStatistics[];

  private donations: any[];

  constructor(
    private _dialog: MatDialog
  ) {
    this.collectPoint = {
      target: 'Julho beneficente em prol da APIPA',
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
      },
      creator: 'Victor Frazão Lelis de Aragão',
      expiresAt: new Date(),
      headOffice: false,
    }

    this.typeStats = ProductTypeValues.map(type => ({
      type, progress: 60
    }))

    this.donations = [
      {
        createdAt: new Date(),
        donator: 'Fulano de tal',
        items: [
          {
            product: 'Macarrão',
            quantity: 3,
            unit: ItemUnit.UNIT
          },
          {
            product: 'Feijão',
            quantity: 5,
            unit: ItemUnit.UNIT
          },
        ]
      },
      {
        createdAt: new Date(),
        donator: 'Beltrado de Oz',
        items: [
          {
            product: 'Arroz',
            quantity: 3,
            unit: ItemUnit.UNIT
          },
          {
            product: 'Acerola',
            quantity: 5,
            unit: ItemUnit.UNIT
          },
        ]
      },
      {
        createdAt: new Date(),
        donator: 'Marcia Georgia',
        items: [
          {
            product: 'Camisa tamanho M',
            quantity: 3,
            unit: ItemUnit.UNIT
          },
          {
            product: 'Camisa tamanho G',
            quantity: 5,
            unit: ItemUnit.UNIT
          },
        ]
      },
    ]
  }

  ngOnInit() {
  }

  onChangeStatus(row: any) {
    const data: StatusChangeData = {
      items: row.items,
      targetStatus: DonationStatus.DONATED
    };
    const result = this._dialog.open(DonationStatusChangeComponent, { data });
  }
}
