import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { ValidationPipe } from '@nestjs/common';
import { CustomRpcExceptionFilter } from './commons/filters/rpc-custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new CustomRpcExceptionFilter());

  await app.listen(envs.PORT ?? 3000);

  console.log(`Server is running on port ${envs.PORT}`);
}
bootstrap();
