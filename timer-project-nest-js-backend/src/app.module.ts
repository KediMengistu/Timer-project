import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TimersModule } from './timers/timers.module';
import { BreaksModule } from './breaks/breaks.module';
import { EmailsModule } from './emails/emails.module';
import { VerificationModule } from './verification/verification.module';
import { TaskSchedulerModule } from './taskscheduler/taskscheduler.module';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from './exception/catch-everything-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get('PGDATABASE'),
        host: configService.get('PGHOST'),
        username: configService.get('PGUSER'),
        password: configService.get('PGPASSWORD'),
        autoLoadEntities: true,
        synchronize: false,
        ssl: { rejectUnauthorized: false },
      }),
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    TimersModule,
    BreaksModule,
    EmailsModule,
    VerificationModule,
    TaskSchedulerModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
  ],
})
export class AppModule {}
