import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import {
  appendIdToRequest,
  appendRequestIdToLogger,
  configMorgan,
  morganRequestLogger,
  morganResponseLogger,
  NestjsWinstonLoggerService,
  TOKEN_TYPE
} from 'nestjs-winston-logger';
import { format, transports } from 'winston';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { createDocument } from './swagger/swagger';

require('dotenv').config();

const PORT = process.env.PORT || 9000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '100mb',
      extended: true,
      parameterLimit: 900000,
    }),
  );

  const globalLogger = new NestjsWinstonLoggerService({
    format: format.combine(
      format.timestamp({ format: 'isoDateTime' }),
      format.json(),
      format.colorize({ all: true }),
    ),
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
      new transports.Console(),
    ],
  });
  app.useLogger(globalLogger);

  // append id to identify request
  app.use(appendIdToRequest);
  app.use(appendRequestIdToLogger(globalLogger));

  configMorgan.appendMorganToken('reqId', TOKEN_TYPE.Request, 'reqId');
  app.use(morganRequestLogger(globalLogger));
  app.use(morganResponseLogger(globalLogger));

  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('/resume-builder/api/v1', {
    exclude: [{ path: 'resume-builder/builder', method: RequestMethod.GET }],
  });

  if (process.env.MODE === 'DEV') {
    SwaggerModule.setup('/resume-builder/docs/v1', app, createDocument(app));
  }


  await app.listen(PORT, () => {
    console.log(`Resume Builder: Running at port ${PORT}`);
  });
}
bootstrap();
