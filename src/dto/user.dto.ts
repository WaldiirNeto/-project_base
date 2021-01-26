import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

import { MessageEnum } from "enums";
export class UserDto {

    @ApiProperty({})
    @IsNotEmpty({
        message: MessageEnum.USER_EMPTY,
    })
    @IsString()
    name: string

    @ApiProperty({})
    @IsNotEmpty({
        message: MessageEnum.EMAIL_EMPTY,
    })
    @IsEmail({}, {
        message: MessageEnum.INVALID_EMAIL
    })
    email: string

    @ApiProperty({})
    @IsString()
    password: string

    @ApiProperty({})
    @IsString()
    passwordConfirmation: string
}
