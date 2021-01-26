import { UserEntity } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

export class ReturnUserDto {

    @ApiProperty({})
    user: UserEntity;

    @ApiProperty({})
    message: string;
}