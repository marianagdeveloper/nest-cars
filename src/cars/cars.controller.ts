/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  // Base datos, l
  // private cars = ['Toyota', 'Honda', 'Jeep']; Llevamos los datos al service

  //Inyección de dependencias, se realiza en el constructor
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  // getCarById(@Param('id', ParseIntPipe) id: string) {
  getCarById(
    // @Param('id', new ParseUUIDPipe({ version: '4' }))
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    console.log({ id });
    //Convertir el id en number, lo vemos ne la consola
    // console.log({ id: +id });
    // const result = +id <= this.cars.length ? this.cars[id] : 'Id invalid';
    // return result;

    //Usamos el servicio
    // return this.carsService.findOne(+id);
    // return this.carsService.findOne(Number(id));
    return this.carsService.findOne(id);
  }

  // Create new car
  @Post()
  // @UsePipes(ValidationPipe) // Debería estar a nivel global
  // createCar(@Body() body: any) {
  createCar(@Body() createCardDto: CreateCarDto) {
    return this.carsService.create(createCardDto);
    // TEST: POST
    // return {
    //   ok: true,
    //   methods: 'POST',
    // };
  }

  // Update new car
  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCardDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, updateCardDto);
  }

  // Delete new car
  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.delete(id);
  }
  // deleteCar(@Param('id', ParseIntPipe) id: number) {
  //   return {
  //     method: 'Delete',
  //     id,
  //   };
  // }
}
