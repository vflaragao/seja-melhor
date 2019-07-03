import { Component, OnInit } from '@angular/core';

import { FoundationCreateDTO } from '@models/foundation';
import { ActionCategory, ActionCategoryValues } from '@models/campaign';
import { FoundationService } from 'src/app/foundations/foundation.service';

@Component({
  selector: 'app-create-foundation',
  templateUrl: './create-foundation.component.html',
  styleUrls: ['./create-foundation.component.scss']
})
export class CreateFoundationComponent implements OnInit {

  public categoryOptions: ActionCategory[];

  public confirmPass: string;
  public foundation: FoundationCreateDTO;
  
  constructor(
    private foundationService: FoundationService
  ) {
    this.foundation = new FoundationCreateDTO();
    this.categoryOptions = ActionCategoryValues;
  }

  ngOnInit() {
  }

  async onSave() {
    try {
      await this.foundationService.save(this.foundation);
      this.foundation = new FoundationCreateDTO();
    } catch (e) {
      console.error(e);
    }
  }
}
