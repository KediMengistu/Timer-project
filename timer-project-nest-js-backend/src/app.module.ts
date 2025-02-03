import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Timer } from './timers/entities/timer.entity'
import { Break } from './breaks/entity/break.entity';;
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TimersModule } from './timers/timers.module';
import { BreaksModule } from './breaks/breaks.module';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from './exception/catch-everything-exception.filter';

@Module({
  imports: 
    [ConfigModule.forRoot({ isGlobal: true }),
     TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [User, Timer, Break],
          synchronize: true
        })
      }),
      UsersModule, 
      AuthModule,
      TimersModule, 
      BreaksModule
    ],
    providers: [
      {
        provide: APP_PIPE,
        useClass: ValidationPipe
      },
      {
        provide: APP_FILTER,
        useClass: CatchEverythingFilter,
      }
    ]
})
export class AppModule {}