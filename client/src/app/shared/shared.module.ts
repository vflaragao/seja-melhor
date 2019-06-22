import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  CollectionPointQRCodeComponent
} from './dialogs';

import {
  GoalCardComponent,
  CampaignCardComponent,
  ProgressIndicatorComponent,
} from './components';

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
    GoalCardComponent,
    CampaignCardComponent,
    ProgressIndicatorComponent,

    /** Dialogs */
    CollectionPointQRCodeComponent,
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
    GoalCardComponent,
    CampaignCardComponent,
    ProgressIndicatorComponent,

    /** Dialogs */
    CollectionPointQRCodeComponent,
  ]
})
export class SharedModule { }
