import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TimersModule } from './timers/timers.module';
import { User } from './users/entities/user.entity';
import { Timer } from './timers/entities/timer.entity';
import { AuthModule } from './auth/auth.module';
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
          entities: [User, Timer],
          synchronize: true
        })
      }),
      UsersModule, 
      TimersModule, AuthModule
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