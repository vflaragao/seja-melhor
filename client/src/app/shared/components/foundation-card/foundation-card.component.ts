import { Component, OnInit, Input } from '@angular/core';

import { FoundationCreateDTO } from '@models/foundation';
import { ActionCategory } from '@models/campaign';

@Component({
  selector: 'app-foundation-card',
  templateUrl: './foundation-card.component.html',
  styleUrls: ['./foundation-card.component.scss']
})
export class FoundationCardComponent implements OnInit {

  @Input()
  private foundation: FoundationCreateDTO;

  constructor() {
    this.foundation = new FoundationCreateDTO();
    this.foundation.name = 'APIPA - ASSOCIAÇÃO PIAUIENSE DE PROTEÇÃO E AMOR AOS ANIMAIS'; 
    this.foundation.address = {
      city: 'Teresina',
      state: 'Piaui',
      district: 'Parque Piauí',
      street: 'Quadra 107',
      number: 'Casa 11',
    };
    this.foundation.category = ActionCategory.ANIMALS;
    this.foundation.phone = '(86) 99557-1708';
  }

  ngOnInit() {
  }

}
