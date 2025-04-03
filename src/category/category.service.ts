import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  create(data: CreateCategoryDto) {
    return this.repository.save(data);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const category = await this.repository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Категория с ID ${id} не найдена`);
    }
    return category;
  }

  async update(id: number, data: UpdateCategoryDto) {
    await this.findOne(id);
    return this.repository.save({ ...data, id });
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    await this.repository.delete(id);
    return { message: `Категория с ID ${id} удалена` };
  }
}
