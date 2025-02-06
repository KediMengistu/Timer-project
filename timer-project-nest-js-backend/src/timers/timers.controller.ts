import { Controller, Post, Req, Body, Get, Patch, Param, Delete } from '@nestjs/common';
import { TimersService } from './timers.service';
import { CreateTimerDTO } from './dto/create-timer.dto';

@Controller('timers')
export class TimersController {
  constructor(private timerService: TimersService) {}

  @Post('create-timer')
  createTimer(@Req() request, @Body() createTimerDTO: CreateTimerDTO) {
    return this.timerService.createTimer(request.user.username, createTimerDTO);
  }

  @Get('get-timer/:id')
  getTimer(@Param() params: any) {
    return this.timerService.retreiveTimer(params.id);
  }

  @Get('get-all-timers')
  getAllTimers(@Req() request) {
    return this.timerService.retreiveAllTimers(request.user.userId);
  }

  @Patch('pause-timer/:id')
  pauseTimer(@Param() params: any) {
    return this.timerService.pauseTimer(params.id);
  }

  @Patch('play-timer/:id')
  playTimer(@Param() params: any) {
    return this.timerService.playTimer(params.id);
  }

  @Delete('delete-timer/:id')
  deleteTimer(@Param() params: any) {
    return this.timerService.removeTimer(params.id);
  }
}