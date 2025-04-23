import { Repository, ObjectLiteral } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseService<T extends ObjectLiteral> {
    constructor(protected readonly repository: Repository<T>) {}

    async findAllPaginated(page = 1, limit = 10, order: any = { id: 'ASC' }) {
        const [items, total] = await this.repository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            order,
        });

        return {
            data: items,
            total,
            page,
            limit,
        };
    }

    findOne(id: number) {
        return this.repository.findOneBy({ id } as any);
    }

    async remove(id: number) {
        return this.repository.delete(id);
    }
}
