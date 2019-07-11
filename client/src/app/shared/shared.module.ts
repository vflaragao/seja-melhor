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
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMasonryModule } from 'ngx-masonry';
import { QRCodeModule } from 'angularx-qrcode';

import {
  ManageProductComponent,
  ChangePasswordComponent,
  RegisterDonationComponent,
  CollectPointQRCodeComponent,
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
  RestantDaysPipe,
  AccountsTypePipe,
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
    MatTableModule,
    MatRadioModule,
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
    ManageProductComponent,
    ChangePasswordComponent,
    RegisterDonationComponent,
    CollectPointQRCodeComponent,
    DonationStatusChangeComponent,
    
    /** Pipes */
    ItemUnitPipe,
    ProductTypePipe,
    RestantDaysPipe,
    AccountsTypePipe,
    ActionCategoryPipe,
    DonationStatusPipe,
    ProductTypeIconPipe,
    ProductTypeColorPipe,
    ActionCategoryIconPipe,
    ActionCategoryColorPipe,
    ActionCategoryBackgroundColorPipe,
    ManageProductComponent,
    ChangePasswordComponent,
  ],
  exports: [
    FormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,

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
    MatDatepickerModule,
    MatSlideToggleModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    MatAutocompleteModule,
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
    ManageProductComponent,
    ChangePasswordComponent,
    RegisterDonationComponent,
    CollectPointQRCodeComponent,
    DonationStatusChangeComponent,

    /** Pipes */
    ItemUnitPipe,
    ProductTypePipe,
    RestantDaysPipe,
    AccountsTypePipe,
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
    AuthCreationOptionsComponent,
    ManageProductComponent,
    ChangePasswordComponent,
    RegisterDonationComponent,
    CollectPointQRCodeComponent,
    DonationStatusChangeComponent,
  ]
})
export class SharedModule { }
