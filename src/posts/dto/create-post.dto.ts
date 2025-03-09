import { ApiProperty } from "@nestjs/swagger";
export class CreatePostDto {
    @ApiProperty ({
        description: "Название объявления",
    })
    title: string

    @ApiProperty ({
        description: "Название объявления",
    })
    description: string

    @ApiProperty ({
        description: "ID категории",
        minimum: 1,
    })
    CategoryId: number
}
