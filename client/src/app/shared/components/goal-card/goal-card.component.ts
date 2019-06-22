import { Component, OnInit, Input } from '@angular/core';

import { GoalDTO } from '@models/goal';
import { ProductType } from '@models/product';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss']
})
export class GoalCardComponent implements OnInit {

  private progress: number;
  private loadingProgress: boolean;

  @Input()
  public goal: GoalDTO;

  constructor() {
    this.progress = 35;
    this.goal = new GoalDTO();
    this.goal.renewalDay = 15;
    this.goal.types = [
      ProductType.TOY,
      ProductType.FOOD,
      ProductType.REMEDY,
      ProductType.CLOTHE,
    ];
  }

  ngOnInit() {}

  get percentProgress() { return `${this.progress}%`; }
}
