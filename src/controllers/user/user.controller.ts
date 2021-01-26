import { MessageEnum } from 'enums/message.enum';
import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'guard/roles.guard';
import { Role } from 'guard/role.decorator';
import { GetUser } from './get-user.decorator';
import { FindUsersQueryDto, ReturnUserDto, UpdateUserDto, UserDto } from '@dto';
import { UserEntity } from '@entity';
import { Routes, UserRole } from '@enums';


@Controller(Routes.USERS)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
    constructor(private userService: UserService) { }
    @Post('/admin')
    @Role(UserRole.ADMIN)
    async createAdminUser(@Body(ValidationPipe) userDto: UserDto): Promise<ReturnUserDto> {
        const user = await this.userService.createAdminUser(userDto);
        return {
            user,
            message: MessageEnum.SUCCESS_CREATE_ADMIN
        }

    }

    @Get(':id')
    @Role(UserRole.ADMIN)
    async findUserById(@Param('id') id): Promise<ReturnUserDto> {
        const user = await this.userService.findUserById(id);
        return {
            user,
            message: MessageEnum.USER_NOT_FOUND
        }
    }

    @Patch(':id')
    async updateUser(
        @Body(ValidationPipe) updateUserDto: UpdateUserDto,
        @GetUser() user: UserEntity,
        @Param('id') id: string,
    ) {
        if (user.role != UserRole.ADMIN && user.id.toString() != id) {
            throw new ForbiddenException(
                MessageEnum.NOT_PERMISSION,
            );
        } else {
            return this.userService.updateUser(updateUserDto, id);
        }
    }

    @Get()
    @Role(UserRole.ADMIN)
    async findUsers(@Query() query: FindUsersQueryDto) {
        const found = await this.userService.findUsers(query);
        return {
            found,
            message: 'Usuários encontrados',
        };
    }

    @Delete(':id')
    @Role(UserRole.ADMIN)
    async deleteUser(@Param('id') id: string) {
        await this.userService.deleteUser(id);
        return {
            message: MessageEnum.USER_DELETE_SUCCESS,
        };
    }
}
