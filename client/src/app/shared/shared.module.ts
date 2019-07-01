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
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMasonryModule } from 'ngx-masonry';

/* import {
  
} from './dialogs'; */

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
