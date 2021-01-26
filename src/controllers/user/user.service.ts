import { MessageEnum } from 'enums/message.enum';
import { Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from 'repository/user.repository';
import { FindUsersQueryDto, UpdateUserDto, UserDto } from '@dto';
import { UserEntity } from '@entity';
import { UserRole } from '@enums';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository) { }
    public users: UserDto[] = [];

    async createAdminUser(userDto: UserDto): Promise<UserEntity> {
        if (userDto.password != userDto.passwordConfirmation) {
            throw new UnprocessableEntityException(MessageEnum.PASSWORD_MATCH);
        } else {
            return this.userRepository.createUser(userDto, UserRole.ADMIN);
        }
    }

    async findUserById(userId: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne(userId, {
            select: ['name', 'role', 'id'],
        });

        if (!user) throw new NotFoundException(MessageEnum.USER_NOT_FOUND);

        return user;
    }

    async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<UserEntity> {
        const user = await this.findUserById(id);
        const { name, email, role, status } = updateUserDto;
        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        user.role = role ? role : user.role;
        user.status = status === undefined ? user.status : status;
        try {
            await user.save();
            return user;
        } catch (error) {
            throw new InternalServerErrorException(
                MessageEnum.EXCEPTION_DATABASE,
            );
        }
    }

    async findUsers(
        queryDto: FindUsersQueryDto,
    ): Promise<{ users: UserEntity[]; total: number }> {
        const users = await this.userRepository.findUsers(queryDto);
        return users;
    }

    async deleteUser(userId: string) {
        const result = await this.userRepository.delete({ id: userId });
        if (result.affected === 0) {
            throw new NotFoundException(
                'Não foi encontrado um usuário com o ID informado',
            );
        }
    }
}
