import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import * as moment from 'moment';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class PostsService extends BaseService<Post> {
  constructor(
      @InjectRepository(Post)
      private postRepository: Repository<Post>,
  ) {
    super(postRepository);
  }

  create(data: CreatePostDto) {
    return this.repository.save({
      ...data,
      changed_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
  }

  findAll(page: number, limit: number) {
    return this.findAllPaginated(page, limit, { changed_at: 'ASC' });
  }

  update(id: number, data: UpdatePostDto) {
    return this.repository.save({ ...data, id });
  }
}
