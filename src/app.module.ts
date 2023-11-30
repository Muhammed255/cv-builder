import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config';
import { UserModule } from './domain/user/user.module';

require("dotenv").config();

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
