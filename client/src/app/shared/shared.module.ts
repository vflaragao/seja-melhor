import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatBottomSheetModule,
  MatListModule,
  MatSelectModule,
  MatSlideToggleModule,
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
  AuthCreationOptionsComponent
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
    RouterModule,

    /** Material */
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatBottomSheetModule,

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
    AuthCreationOptionsComponent,

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
    AuthCreationOptionsComponent,
  ],
  exports: [
    FormsModule,
    CommonModule,
    RouterModule,

    /** Flex */
    FlexLayoutModule,

    /** Material */
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatBottomSheetModule,

    /** Components */
    MarkerComponent,
    GoalCardComponent,
    CampaignCardComponent,
    FoundationCardComponent,
    CollectPointCardComponent,
    ProgressIndicatorComponent,
    AuthCreationOptionsComponent,

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
  entryComponents: [
    AuthCreationOptionsComponent
  ]
})
export class SharedModule { }
