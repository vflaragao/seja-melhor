import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GoalSchema } from '@models/goal';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';


import { ProductsModule } from 'products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([{ name: 'Goal', schema: GoalSchema }])
  ],
  providers: [GoalsService],
  controllers: [GoalsController]
})
export class GoalsModule {}
