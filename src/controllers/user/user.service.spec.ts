import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from '@dto';
import { UserRole } from '@enums';
import { UserRepository } from '@repository';
import { UserService } from './user.service';


const mockUserRepository = () => ({
    createUser: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    findUsers: jest.fn(),
});

describe('UserService', () => {
    let userRepository;
    let service;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserRepository,
                    useFactory: mockUserRepository,
                },
            ],
        }).compile();

        userRepository = await module.get<UserRepository>(UserRepository);
        service = await module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(userRepository).toBeDefined();
    });

    describe('createUser', () => {
        let mockCreateUserDto: UserDto;

        beforeEach(() => {
            mockCreateUserDto = {
                email: 'mock@email.com',
                name: 'Mock User',
                password: 'mockPassword',
                passwordConfirmation: 'mockPassword'
            };
        });

        it('should create an user if passwords match', async () => {
            userRepository.createUser.mockResolvedValue('mockUser');
            const result = await service.createAdminUser(mockCreateUserDto);

            expect(userRepository.createUser).toHaveBeenCalledWith(
                mockCreateUserDto,
                UserRole.ADMIN,
            );
            expect(result).toEqual('mockUser');
        });
        it('should throw an error if passwords doesnt match', async () => {
            mockCreateUserDto.passwordConfirmation = 'wrongPassword';
            expect(service.createAdminUser(mockCreateUserDto)).rejects.toThrow(
                UnprocessableEntityException,
            );
        });
    })
});