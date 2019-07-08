import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Activity } from '@models/fields/activity';

interface EmptyData {
  title: string;
  description: string;
  button: string;
}

const ActivityData = {
  [Activity.CAMPAIGN]: {
    title: 'Pooooxa, nenhuma campanha por aqui?!',
    description: 'Arghh...  a campanha é um meio onde podemos ajudar quem realmente precisa de uma maneira bem prática. Que tal criar uma agora?!',
    button: 'Tá bom, quero iniciar uma campanha!!'
  },
  [Activity.COLLECT_POINT]: {
    title: 'Hmmmmm, aqui tá vazio vazio...',
    description: 'Com apenas um clique você consegue, de forma bem simples e cômoda, ajudar instituições e campanhas a arrecadarem insumos ' +
      'em prol de causas sociais!!',
    button: 'Simples assim? Vou criar um ponto agora!'
  }
}

@Component({
  selector: 'app-empty-mark',
  templateUrl: './empty-mark.component.html',
  styleUrls: ['./empty-mark.component.scss']
})
export class EmptyMarkComponent implements OnInit {

  @Input()
  private hasAction: boolean;
  @Input()
  set activity(value: Activity) {
    this.data = ActivityData[value];
  };
  @Output()
  private action: EventEmitter<void>;
  
  private data: EmptyData;

  constructor() {
    this.action = new EventEmitter();
  }

  ngOnInit() {
  }

  onAction() {
    this.action.emit();
  }
}
