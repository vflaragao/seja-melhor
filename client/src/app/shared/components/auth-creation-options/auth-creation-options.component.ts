import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

interface AuthCreationOptionData {
  type: AuthCreationOption,
  description: string
}

export enum AuthCreationOption {
  USER = 'Usuário',
  FOUNDATION = 'Instituição'
}

@Component({
  selector: 'app-auth-creation-options',
  templateUrl: './auth-creation-options.component.html',
  styleUrls: ['./auth-creation-options.component.scss']
})
export class AuthCreationOptionsComponent implements OnInit {

  private options: AuthCreationOptionData[];

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AuthCreationOptionsComponent>
  ) {
    this.options = [
      {
        type: AuthCreationOption.USER,
        description: 'Pessoas dispostas a ajudar através de doações, campanhas e pontos de coleta para instituições de caridade'
      },
      {
        type: AuthCreationOption.FOUNDATION,
        description: 'Instituições que já estão em atividade e necessitam, frequentemente, de insumos para manterem seu funcionamento regular'
      }
    ]
  }

  ngOnInit() {
  }

  onSelect(value: AuthCreationOption) {
    this._bottomSheetRef.dismiss(value);
  }
}
