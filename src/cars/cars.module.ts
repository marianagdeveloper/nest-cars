import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  // PASO 1. Expongo el CarsService
  exports: [CarsService],
})
export class CarsModule {}
