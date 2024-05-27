import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 600,
      limit: 2,
    }]),
    KnexModule.forRoot({
    config: {
      client: 'pg',
      connection: {
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        port: +process.env.PGPORT,
        database: process.env.PGDATABASE,
      },
      pool: {
        min: 0,
        max: 5,
      },
      debug: false,
    },
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
