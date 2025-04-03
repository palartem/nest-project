import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Post as postEntity } from './entities/post.entity';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({
    status: 200,
    description: 'Объявление успешно добавлено',
    type: postEntity,
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Список объявлений',
    type: [postEntity],
  })
  @ApiResponse({ status: 401, description: 'Неавторизовано' })
  @Get()
  findAll(
      @Query('page') page: string = '1',
      @Query('limit') limit: string = '10'
  ) {
    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.max(1, Number(limit) || 10);
    return this.postsService.findAll(pageNum, limitNum);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Объявление найдено',
    type: postEntity,
  })
  @ApiResponse({ status: 404, description: 'Объявление не найдено' })
  @ApiResponse({ status: 401, description: 'Неавторизовано' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Объявление обновлено',
    type: postEntity,
  })
  @ApiResponse({ status: 404, description: 'Объявление не найдено' })
  @ApiResponse({ status: 401, description: 'Неавторизовано' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Объявление удалено' })
  @ApiResponse({ status: 404, description: 'Объявление не найдено' })
  @ApiResponse({ status: 401, description: 'Неавторизовано' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
