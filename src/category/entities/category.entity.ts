import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Category {
    @ApiProperty({
        minimum: 1
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty({ type: () => [Post] })
    @OneToMany(type => Post, post => post.category)
    posts: Post[]
}
