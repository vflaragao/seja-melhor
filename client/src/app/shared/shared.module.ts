import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatTabsModule,
  MatRadioModule,
  MatButtonModule,
  MatSelectModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatBottomSheetModule,
  MatTableModule,
  MatDialogModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMasonryModule } from 'ngx-masonry';

import {
  DonationStatusChangeComponent  
} from './dialogs';

import {
  MarkerComponent,
  ContentComponent,
  GoalCardComponent,
  CampaignCardComponent,
  FoundationCardComponent,
  UserContributionComponent,
  CollectPointCardComponent,
  ProgressIndicatorComponent,
  AuthCreationOptionsComponent
} from './components';

import {
  ItemUnitPipe,
  ProductTypePipe,
  ActionCategoryPipe,
  DonationStatusPipe,
  ProductTypeIconPipe,
  ProductTypeColorPipe,
  ActionCategoryIconPipe,
  ActionCategoryColorPipe,
  ActionCategoryBackgroundColorPipe,
} from './pipes';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,

    /** Mansory */
    NgxMasonryModule,

    /** Material */
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatMenuModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
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
    ContentComponent,
    GoalCardComponent,
    CampaignCardComponent,
    FoundationCardComponent,
    CollectPointCardComponent,
    UserContributionComponent,
    ProgressIndicatorComponent,
    AuthCreationOptionsComponent,
    
    /** Dialogs */
    DonationStatusChangeComponent,
    
    
    /** Pipes */
    ItemUnitPipe,
    ProductTypePipe,
    ActionCategoryPipe,
    DonationStatusPipe,
    ProductTypeIconPipe,
    ProductTypeColorPipe,
    ActionCategoryIconPipe,
    ActionCategoryColorPipe,
    ActionCategoryBackgroundColorPipe,
  ],
  exports: [
    FormsModule,
    CommonModule,
    RouterModule,

    /** Mansory */
    NgxMasonryModule,

    /** Flex */
    FlexLayoutModule,

    /** Material */
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatBottomSheetModule,

    /** Components */
    MarkerComponent,
    ContentComponent,
    GoalCardComponent,
    CampaignCardComponent,
    FoundationCardComponent,
    UserContributionComponent,
    CollectPointCardComponent,
    ProgressIndicatorComponent,
    AuthCreationOptionsComponent,

    /** Dialogs */
    DonationStatusChangeComponent,

    /** Pipes */
    ItemUnitPipe,
    ProductTypePipe,
    ActionCategoryPipe,
    DonationStatusPipe,
    ProductTypeIconPipe,
    ProductTypeColorPipe,
    ActionCategoryIconPipe,
    ActionCategoryColorPipe,
    ActionCategoryBackgroundColorPipe,
  ],
  entryComponents: [
    AuthCreationOptionsComponent,
    DonationStatusChangeComponent
  ]
})
export class SharedModule { }
