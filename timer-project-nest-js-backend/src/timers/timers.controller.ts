import { Controller, Post, Req, Body, Patch, Param } from '@nestjs/common';
import { TimersService } from './timers.service';
import { CreateTimerDTO } from './dto/create-timer.dto';

@Controller('timers')
export class TimersController {
  constructor(private timerService: TimersService) {}

  @Post('create-timer')
  createTimer(@Req() request, @Body() createTimerDTO: CreateTimerDTO) {
    return this.timerService.createTimer(request.user.username, createTimerDTO);
  }

  @Patch('pause-timer/:id')
  pauseTimer(@Param() params: any) {
    this.timerService.pauseTimer(params.id);
  }
}