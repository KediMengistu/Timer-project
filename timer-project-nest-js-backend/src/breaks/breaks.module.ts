import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Break } from './entity/break.entity';
import { BreaksService } from './breaks.service';
import { BreaksController } from './breaks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Break])],
  providers: [BreaksService],
  exports: [BreaksService],
  controllers: [BreaksController]
})
export class BreaksModule {}
