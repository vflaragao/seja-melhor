import { Component, OnInit, Input } from '@angular/core';

import { addDate } from '@helpers/date';

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
  public showCategory: boolean = true;
  @Input()
  public showAuthor: boolean = true;

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
      ProductType.CLEANING_MATERIAL,
    ];
  }

  ngOnInit() {}

  get restantDays() {
    const now = new Date();
    if (now.getDate() > this.goal.renewalDay) {
      const nextMonth = addDate(1, 'month', now);
      nextMonth.set('date', this.goal.renewalDay);
      return nextMonth.diff(now, 'days');
    }
    return this.goal.renewalDay - now.getDate();
  }
}
