import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GoalSchema } from '@models/goal';
import { UserSchema } from '@models/user';
import { ProductSchema } from '@models/product';
import { CampaignSchema } from '@models/campaign';
import { ModeratorSchema } from '@models/moderator';
import { FoundationSchema } from '@models/foundation';
import { CollectPointSchema } from '@models/collect-point';

import { GoalsService } from './goals.service';
import { UsersService } from './users.service';
import { AddressService } from './address.service';
import { ProductsService } from './products.service';
import { CampaignsService } from './campaigns.service';
import { ModeratorsService } from './moderators.service';
import { FoundationsService } from './foundations.service';
import { CollectPointsService } from './collect-points.service';

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
        GoalsService,
        UsersService,
        AddressService,
        ProductsService,
        CampaignsService,
        ModeratorsService,
        FoundationsService,
        CollectPointsService,
    ],
    exports: [
        GoalsService,
        UsersService,
        AddressService,
        ProductsService,
        CampaignsService,
        ModeratorsService,
        FoundationsService,
        CollectPointsService,
    ],
})
export class CoreModule {}
