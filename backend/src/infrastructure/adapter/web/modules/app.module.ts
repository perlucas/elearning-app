import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { env } from '@/infrastructure/adapter/config';
import { DevModule } from './dev/dev.module';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: env.dbHost(),
            port: env.dbPort(),
            database: env.dbName(),
            username: env.dbUser(),
            password: env.dbPasswd(),
            autoLoadModels: true,
            synchronize: true,
        }),
        DevModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
