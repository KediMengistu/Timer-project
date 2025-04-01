import {
  Controller,
  Post,
  Req,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimersService } from './timers.service';
import { CreateTimerDTO } from './dto/create-timer.dto';
import { Public } from '../auth/auth.decorator.factory';
import { GuestTimerDTO } from './dto/guest-timer.dto';
import { PauseTimerDTO } from './dto/pause-timer.dto';
import { PlayTimerDTO } from './dto/play-timer.dto';

@Controller('timers')
export class TimersController {
  constructor(private timerService: TimersService) {}

  @Post('create-timer')
  async createTimer(@Req() request, @Body() createTimerDTO: CreateTimerDTO) {
    return this.timerService.createTimer(request.user.userId, createTimerDTO);
  }

  @Public()
  @Post('guest-create-timer')
  guestCreateTimer(@Body() createTimerDTO: CreateTimerDTO) {
    return this.timerService.createGuestTimer(createTimerDTO);
  }

  @Get('get-timer/:id')
  async getTimer(@Param() params: any) {
    return this.timerService.retrieveTimer(params.id);
  }

  @Get('get-all-timers')
  async getAllTimers(@Req() request) {
    return this.timerService.retrieveAllTimers(request.user.userId);
  }

  @Patch('pause-timer/:id')
  async pauseTimer(@Param() params: any, @Body() pauseTimerDTO: PauseTimerDTO) {
    return this.timerService.pauseTimer(params.id, pauseTimerDTO);
  }

  @Public()
  @Patch('guest-pause-timer')
  guestPauseTimer(@Body() guestTimerDTO: GuestTimerDTO) {
    return this.timerService.guestPauseTimer(guestTimerDTO);
  }

  @Patch('play-timer/:id')
  async playTimer(@Param() params: any, @Body() playTimerDTO: PlayTimerDTO) {
    return this.timerService.playTimer(params.id, playTimerDTO);
  }

  @Public()
  @Patch('guest-play-timer')
  guestPlayTimer(@Body() guestTimerDTO: GuestTimerDTO) {
    return this.timerService.guestPlayTimer(guestTimerDTO);
  }

  @Delete('delete-timer/:id')
  async deleteTimer(@Req() request, @Param() params: any) {
    await this.timerService.removeTimer(request.user.userId, params.id);
  }
}
