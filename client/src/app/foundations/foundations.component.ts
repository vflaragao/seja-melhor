import { Component, OnInit } from '@angular/core';

import { FoundationService } from '@core/services';
import { FoundationGetDTO, GoalStatistics } from '@models/foundation';
import { ProductTypeValues } from '@models/product';

@Component({
  selector: 'app-foundations',
  templateUrl: './foundations.component.html',
  styleUrls: ['./foundations.component.scss']
})
export class FoundationsComponent implements OnInit {

  private loading: boolean;

  private foundation: FoundationGetDTO;
  private currentGoalStats: GoalStatistics[];

  constructor(
    private foundationService: FoundationService
  ) {
    this.currentGoalStats = ProductTypeValues.map(type => ({
      type, progress: 30
    }));
  }

  async ngOnInit() {
    try {
      this.loading = true;
      this.foundation = await this.foundationService.get(`3`);
    } catch(e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

}
