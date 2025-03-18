import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { ApiProperty } from "@nestjs/swagger";

export enum postStatusEnum {
    DRAW = 'Черновик',
    PUBLISHED = 'Опубликован',
    DELETED = 'Снят с публикации',
}
@Entity()
export class Post {
    @ApiProperty({
        minimum: 1
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty({ type: () => Category })
    @ManyToOne(type => Category, category => category.posts, {eager: true})
    category: Category

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: postStatusEnum,
        default: postStatusEnum.DRAW
    })
    status: postStatusEnum

    @ApiProperty()
    @Column({
        type: 'datetime'
    })
    changed_at: Date
}
