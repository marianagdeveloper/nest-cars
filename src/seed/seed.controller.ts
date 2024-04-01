import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  //PASO 4 - Primero se ejecuta el seed para cargar la data de Cars y Brands

  @Get()
  runSeed() {
    return this.seedService.populateDB();
  }
}
