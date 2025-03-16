import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/infrastructure/adapter/web/modules/app.module';

async function bootstrap() {
    console.dir(process.env);
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
