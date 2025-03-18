import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {ApiTags, ApiResponse} from "@nestjs/swagger";
import { Category as categoryEntity } from './entities/category.entity';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiResponse({ status: 201, description: 'Категория успешно создана', type: categoryEntity })
  @ApiResponse({ status: 400, description: 'Ошибка валидации' })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiResponse({ status: 200, description: 'Список категорий', type: [categoryEntity] })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Категория найдена', type: categoryEntity })
  @ApiResponse({ status: 404, description: 'Категория не найдена' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiResponse({ status: 200, description: 'Категория обновлена', type: categoryEntity })
  @ApiResponse({ status: 404, description: 'Категория не найдена' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @ApiResponse({ status: 200, description: 'Категория удалена' })
  @ApiResponse({ status: 404, description: 'Категория не найдена' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
