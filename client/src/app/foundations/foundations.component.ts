import { Component, OnInit } from '@angular/core';

import { FoundationService } from './foundation.service';

import { ProductTypeValues, ProductTypeStatistics } from '@models/product';
import { FoundationGetDTO } from '@models/foundation';

@Component({
  selector: 'app-foundations',
  templateUrl: './foundations.component.html',
  styleUrls: ['./foundations.component.scss']
})
export class FoundationsComponent implements OnInit {

  private loading: boolean;

  private foundation: FoundationGetDTO;
  private currentGoalStats: ProductTypeStatistics[];

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
