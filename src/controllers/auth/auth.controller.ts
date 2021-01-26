import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { MessageEnum } from 'enums';
import { UserDto } from 'dto/user.dto';
import { AuthService } from './auth.service';
import { CredentialsDto } from 'dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp(
        @Body(ValidationPipe) UserDto: UserDto,
    ): Promise<{ message: string }> {
        await this.authService.signUp(UserDto);
        return {
            message: MessageEnum.SUCCESS_CREATE_USER
        };
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) credentiaslsDto: CredentialsDto):
        Promise<{ token: string }> {
        return await this.authService.signIn(credentiaslsDto);
    }
}
