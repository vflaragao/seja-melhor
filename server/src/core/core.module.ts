import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AddressService } from './address.service';
import { CampaignsService } from './campaigns.service';
import { CollectPointsService } from './collect-points.service';

import { GoalSchema } from '@models/goal';
import { UserSchema } from '@models/user';
import { ProductSchema } from '@models/product';
import { CampaignSchema } from '@models/campaign';
import { ModeratorSchema } from '@models/moderator';
import { FoundationSchema } from '@models/foundation';
import { CollectPointSchema } from '@models/collect-point';

import { GoalsService } from './goals.service';
import { UsersService } from './users.service';
import { ProductsService } from './products.service';
import { ModeratorsService } from './moderators.service';
import { FoundationsService } from './foundations.service';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([{ name: 'Goal', schema: GoalSchema }]),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
        MongooseModule.forFeature([{ name: 'Campaign', schema: CampaignSchema }]),
        MongooseModule.forFeature([{ name: 'Moderator', schema: ModeratorSchema }]),
        MongooseModule.forFeature([{ name: 'Foundation', schema: FoundationSchema }]),
        MongooseModule.forFeature([{ name: 'CollectPoint', schema: CollectPointSchema }]),
    ],
    providers: [
        AddressService,
        GoalsService,
        UsersService,
        ProductsService,
        CampaignsService,
        ModeratorsService,
        FoundationsService,
        CollectPointsService,
    ],
    exports: [
        AddressService,
        GoalsService,
        UsersService,
        ProductsService,
        CampaignsService,
        ModeratorsService,
        FoundationsService,
        CollectPointsService,
    ]
})
export class CoreModule {}
