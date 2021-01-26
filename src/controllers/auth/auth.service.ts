
import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@repository';
import { CredentialsDto, UserDto } from '@dto';
import { UserEntity } from '@entity';
import { MessageEnum, UserRole } from '@enums';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(userDto: UserDto): Promise<UserEntity> {
        if (userDto.password != userDto.passwordConfirmation) {
            throw new UnprocessableEntityException(MessageEnum.PASSWORD_MATCH);
        } else {
            return await this.userRepository.createUser(userDto, UserRole.USER);
        }
    }


    async signIn(credentialsDto: CredentialsDto) {
        const user = await this.userRepository.checkCredentials(credentialsDto);

        if (user === null) {
            throw new UnauthorizedException(MessageEnum.CRENDENTIALS_INVALID);
        }
        const jwtPayload = {
            id: user.id
        };
        const token = await this.jwtService.sign(jwtPayload);
        console.log(token);

        return { token };
    }
}
