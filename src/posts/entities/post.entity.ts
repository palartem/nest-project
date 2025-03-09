import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

export enum postStatusEnum {
    DRAW = 'Черновик',
    PUBLISHED = 'Опубликован',
    DELETED = 'Снят с публикации',
}
@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(type => Category, category => category.posts, {eager: true})
    category: Category

    @Column({
        type: 'enum',
        enum: postStatusEnum,
        default: postStatusEnum.DRAW
    })
    status: postStatusEnum
    @Column({
        type: 'datetime'
    })
    changed_at: Date
}
