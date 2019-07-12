import { Component, OnInit, Input } from '@angular/core';


import { GoalGetDTO } from '@models/goal';

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
  public goal: GoalGetDTO;

  constructor() {
    this.progress = 35;
    this.goal = {};
  }

  ngOnInit() {}
}
