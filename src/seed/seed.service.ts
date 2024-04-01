import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';
import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly carService: CarsService,
    private readonly brandService: BrandsService,
  ) {}

  populateDB() {
    //PASO 3. Fill the database with seed data
    this.brandService.fillBrandsWithSeedData(BRANDS_SEED);
    this.carService.fillCarsWithSeedData(CARS_SEED);

    return 'Success';
  }
}
