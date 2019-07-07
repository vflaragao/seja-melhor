import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatStepperModule,
  MatDividerModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMasonryModule } from 'ngx-masonry';
import { QRCodeModule } from 'angularx-qrcode';

import {
  UpdateUserComponent,
  RegisterGoalComponent,
  RegisterCampaignComponent,
  RegisterDonationComponent,
  UpdateFoundationComponent,
  CollectPointQRCodeComponent,
  RegisterCollectPointComponent,
  DonationStatusChangeComponent,
} from './dialogs';

import {
  MarkerComponent,
  ContentComponent,
  GoalCardComponent,
  EmptyMarkComponent,
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
    ReactiveFormsModule,

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
    MatDividerModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,

    /** Flex */
    FlexLayoutModule,
    
    /** QRCode */
    QRCodeModule,
  ],
  declarations: [
    /** Components */
    MarkerComponent,
    ContentComponent,
    GoalCardComponent,
    EmptyMarkComponent,
    CampaignCardComponent,
    FoundationCardComponent,
    CollectPointCardComponent,
    UserContributionComponent,
    ProgressIndicatorComponent,
    AuthCreationOptionsComponent,
    
    /** Dialogs */
    UpdateUserComponent,
    RegisterGoalComponent,
    UpdateFoundationComponent,
    RegisterCampaignComponent,
    RegisterDonationComponent,
    CollectPointQRCodeComponent,
    RegisterCollectPointComponent,
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
    HttpClientModule,
    ReactiveFormsModule,

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
    MatDividerModule,
    MatToolbarModule,
    MatStepperModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,

    /** Components */
    MarkerComponent,
    ContentComponent,
    GoalCardComponent,
    EmptyMarkComponent,
    CampaignCardComponent,
    FoundationCardComponent,
    CollectPointCardComponent,
    UserContributionComponent,
    ProgressIndicatorComponent,
    AuthCreationOptionsComponent,
    
    /** Dialogs */
    UpdateUserComponent,
    RegisterGoalComponent,
    UpdateFoundationComponent,
    RegisterCampaignComponent,
    RegisterDonationComponent,
    CollectPointQRCodeComponent,
    RegisterCollectPointComponent,
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

    /** QRCode */
    QRCodeModule,
  ],
  entryComponents: [
    RegisterDonationComponent,
    CollectPointQRCodeComponent,
    AuthCreationOptionsComponent,
    DonationStatusChangeComponent,
  ]
})
export class SharedModule { }
