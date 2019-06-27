import { Component, OnInit } from '@angular/core';

import { Foundation } from '@models/foundation';
import { ActionCategory, ActionCategoryValues } from '@models/campaign';
import { FoundationService } from '@core/services';

@Component({
  selector: 'app-create-foundation',
  templateUrl: './create-foundation.component.html',
  styleUrls: ['./create-foundation.component.scss']
})
export class CreateFoundationComponent implements OnInit {

  public categoryOptions: ActionCategory[];

  public confirmPass: string;
  public foundation: Foundation;
  
  constructor(
    private foundationService: FoundationService
  ) {
    this.foundation = new Foundation();
    this.categoryOptions = ActionCategoryValues;
  }

  ngOnInit() {
  }

  async onSave() {
    try {
      await this.foundationService.save(this.foundation);
      this.foundation = new Foundation();
    } catch (e) {
      console.error(e);
    }
  }
}
