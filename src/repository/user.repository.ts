import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { EntityRepository, Repository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { UserEntity } from '@entity';
import { CredentialsDto, FindUsersQueryDto, UserDto } from '@dto';
import { MessageEnum, UserRole } from '@enums';


@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    async createUser(userDto: UserDto, role: UserRole): Promise<UserEntity> {
        const { email, name, password } = userDto;
        const user = this.create();
        user.name = name;
        user.email = email;
        user.role = role;
        user.status = true,
            user.confirmationToken = crypto.randomBytes(32).toString('hex');
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
            delete user.password;
            return user;

        } catch (error) {
            if (error.code.toString() === '23505') {
                throw new ConflictException(MessageEnum.UNIQUE_EMAIL_ERROR);
            } else {
                throw new InternalServerErrorException(
                    MessageEnum.EXCEPTION_DATABASE
                );
            }


        }
    }

    async findUsers(
        queryDto: FindUsersQueryDto,
    ): Promise<{ users: UserEntity[]; total: number }> {
        queryDto.status = queryDto.status === undefined ? true : queryDto.status;
        queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
        queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

        const { email, name, status, role } = queryDto;
        const query = this.createQueryBuilder('user');
        query.where('user.status = :status', { status });

        if (email) {
            query.andWhere('user.email ILIKE :email', { email: `%${email}%` });
        }

        if (name) {
            query.andWhere('user.name ILIKE :name', { name: `%${name}%` });
        }

        if (role) {
            query.andWhere('user.role = :role', { role });
        }
        query.skip((queryDto.page - 1) * queryDto.limit);
        query.take(+queryDto.limit);
        query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
        query.select(['user.name', 'user.email', 'user.role', 'user.status']);

        const [users, total] = await query.getManyAndCount();

        return { users, total };
    }

    async checkCredentials(credentialsDto: CredentialsDto): Promise<UserEntity> {
        const { email, password } = credentialsDto;
        const user = await this.findOne({ email, status: true });

        if (user && (await user.checkPassword(password))) {
            return user;
        } else {
            return null;
        }
    }
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}