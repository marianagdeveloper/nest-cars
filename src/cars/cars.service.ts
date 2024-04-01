import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
// import { CreateCarDto } from './dto/create-car.dto';
// import { UpdateCarDto } from './dto/update-car.dto';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Honda',
    //   model: 'Civic',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Jeep',
    //   model: 'Cherokee',
    // },
  ];

  findAll() {
    return this.cars;
  }

  findOne(id: string) {
    const car = this.cars.find((car) => car.id === id);
    //Manejamos el error con los Exception Filters
    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);
    return car;
  }

  //   create({ model, brand }: CreateCarDto) {
  create(createCardDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCardDto,
    };
    // const car: Car = {
    //   id: uuid(),
    //   brand,
    //   model,
    // };
    this.cars.push(car);
    return car;
  }

  update(id: string, updateCardDto: UpdateCarDto) {
    let carDataBase = this.findOne(id);

    if (updateCardDto.id && updateCardDto.id !== id) {
      throw new BadRequestException(`Car id is not valid`);
    }

    //Map of cars
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        //Update values in carDataBase with updateCardDto
        carDataBase = {
          ...carDataBase,
          ...updateCardDto,
          id,
        };
        return carDataBase;
      }
      return car;
    });
    return carDataBase;
  }

  delete(id: string) {
    this.findOne(id);

    //Map of cars
    this.cars = this.cars.filter((car) => car.id !== id);

    //no es necesario colocar el return, se hace automaticamente
    // return this.cars;
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
