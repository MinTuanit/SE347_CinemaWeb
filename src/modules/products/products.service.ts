import { Injectable } from '@nestjs/common';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';

@Injectable()
export class ProductsService {
  create(dto: CreateProductsDto) {
    return 'Create products';
  }

  findAll() {
    return 'Find all products';
  }

  findOne(id: string) {
    return 'Find one products';
  }

  update(id: string, dto: UpdateProductsDto) {
    return 'Update products';
  }

  remove(id: string) {
    return 'Remove products';
  }
}
