import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import * as moment from 'moment';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private repository: Repository<Post>,
  ) {}
  create(data: CreatePostDto) {
    return this.repository.save({
      ...data,
      changed_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
  }

  async findAll(page: number, limit: number) {
    const [posts, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { changed_at: 'ASC' },
    });

    return {
      data: posts,
      total,
      page,
      limit,
    };
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, data: UpdatePostDto) {
    return this.repository.save({ ...data, id });
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }
}
