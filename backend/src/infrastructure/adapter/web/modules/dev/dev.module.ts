import { Module } from '@nestjs/common';
import { DevController } from './dev.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@/infrastructure/adapter/db/postgres/models/user.model';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [DevController],
})
export class DevModule {}
