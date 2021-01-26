
import { MessageEnum, UserRole } from '@enums';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString({
        message: MessageEnum.USER_NAME_INVALID,
    })
    name: string;

    @IsOptional()
    @IsEmail(
        {},
        {
            message: MessageEnum.USER_EMAIL_INVALID
        },
    )
    email: string;

    @IsOptional()
    role: UserRole;

    @IsOptional()
    status: boolean;
}