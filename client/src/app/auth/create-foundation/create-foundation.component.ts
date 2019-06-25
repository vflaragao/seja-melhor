import { Component, OnInit } from '@angular/core';
import { ActionCategory, ActionCategoryValues } from '@models/campaign';

@Component({
  selector: 'app-create-foundation',
  templateUrl: './create-foundation.component.html',
  styleUrls: ['./create-foundation.component.scss']
})
export class CreateFoundationComponent implements OnInit {

  private categoryOptions: ActionCategory[];

  constructor() {
    this.categoryOptions = ActionCategoryValues;
  }

  ngOnInit() {
  }

}
