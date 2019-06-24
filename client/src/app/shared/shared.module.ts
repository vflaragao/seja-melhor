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
  FoundationCardComponent,
  CollectPointCardComponent,
  ProgressIndicatorComponent,
} from './components';

import {
  ProductTypePipe,
  ProductTypeIconPipe,
  ProductTypeColorPipe,
  ActionCategoryPipe,
  ActionCategoryIconPipe,
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
    FoundationCardComponent,
    CollectPointCardComponent,
    ProgressIndicatorComponent,

    /** Dialogs */
    CollectionPointQRCodeComponent,

    /** Pipes */
    ProductTypePipe,
    ActionCategoryPipe,
    ProductTypeIconPipe,
    ProductTypeColorPipe,
    ActionCategoryIconPipe,
    ActionCategoryColorPipe,
    ActionCategoryBackgroundColorPipe,
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
    FoundationCardComponent,
    CollectPointCardComponent,
    ProgressIndicatorComponent,

    /** Dialogs */
    CollectionPointQRCodeComponent,

    /** Pipes */
    ProductTypePipe,
    ActionCategoryPipe,
    ProductTypeIconPipe,
    ProductTypeColorPipe,
    ActionCategoryIconPipe,
    ActionCategoryColorPipe,
    ActionCategoryBackgroundColorPipe,
  ]
})
export class SharedModule { }
