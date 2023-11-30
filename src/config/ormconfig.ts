import 'reflect-metadata';
import { DataSource } from 'typeorm';

require('dotenv').config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  logging: true,
  synchronize: false,
  logger: 'simple-console',
  migrationsTableName: 'migration',
  migrationsRun: true,
  entities: [
    __dirname + '/../database/entity/*.entity.ts',
    __dirname + '/../database/entity/*.entity.js',
  ],
  migrations: [
    __dirname + '/../database/migration/*.ts',
    __dirname + '/../database/migration/*.js',
  ],
  ssl:
    process.env.DB_SSL == 'production'
      ? {
          rejectUnauthorized: false,
          ca: process.env.CA_DB,
        }
      : false,
})
  // .initialize()
  // .then(() => {
  //   console.log('Connected To DB');
  // })
  // .catch((err) => {
  //   console.log('Error occured::', err);
  // });
