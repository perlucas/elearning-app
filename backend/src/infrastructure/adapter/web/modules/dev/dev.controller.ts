import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@/infrastructure/adapter/db/postgres/models/user.model';

@Controller({ path: '/api/v1/dev' })
export class DevController {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    @Get('/users')
    public async getUsers() {
        const users = await this.userModel.findAll();
        return users.map((u) => [u.firstName, u.lastName].join(' '));
    }

    @Get('/create-user')
    public async createTestingUser() {
        const user = await this.userModel.create({
            firstName: 'Tester',
            lastName: 'Tester',
            email: ['tester', parseInt(Math.random() * 1000 + ''), '@tester.com'].join(''),
            password: 'sadd0219ue10dasdasdasc',
            birthDate: new Date(),
        });
        return user.toJSON();
    }
}
