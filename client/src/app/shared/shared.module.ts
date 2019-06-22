import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  CollectionPointQRCodeComponent
} from './dialogs';

import {
  MarkerComponent,
  GoalCardComponent,
  CampaignCardComponent,
  ProgressIndicatorComponent,
} from './components';

import {
  ProductTypePipe,
  ProductTypeIconPipe,
  ProductTypeColorPipe,
  ActionCategoryPipe,
  ActionCategoryColorPipe,
  ActionCategoryBackgroundColorPipe,
} from './pipes';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,

    /** Material */
    MatCardModule,
    MatIconModule,
    MatButtonModule,

    /** Flex */
    FlexLayoutModule
  ],
  declarations: [
    /** Components */
    MarkerComponent,
    GoalCardComponent,
    CampaignCardComponent,
    ProgressIndicatorComponent,

    /** Dialogs */
    CollectionPointQRCodeComponent,

    /** Pipes */
    ProductTypePipe,
    ActionCategoryPipe,
    ProductTypeIconPipe,
    ActionCategoryColorPipe,
    ActionCategoryBackgroundColorPipe,
    ProductTypeColorPipe,
  ],
  exports: [
    FormsModule,
    CommonModule,

    /** Flex */
    FlexLayoutModule,

    /** Material */
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,

    /** Components */
    MarkerComponent,
    GoalCardComponent,
    CampaignCardComponent,
    ProgressIndicatorComponent,

    /** Dialogs */
    CollectionPointQRCodeComponent,

    /** Pipes */
    ProductTypePipe,
    ProductTypeIconPipe,
    ProductTypeColorPipe,
    ActionCategoryPipe,
    ProductTypeIconPipe,
    ActionCategoryColorPipe,
    ActionCategoryBackgroundColorPipe,
  ]
})
export class SharedModule { }
