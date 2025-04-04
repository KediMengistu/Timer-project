import { Controller, Get, Param } from '@nestjs/common';
import { BreaksService } from './breaks.service';

@Controller('breaks')
export class BreaksController {
  constructor(private breakService: BreaksService) {}

  @Get('get-all-breaks/:id')
  async getAllBreaks(@Param() params: any) {
    return this.breakService.retrieveAllBreaks(params.id);
  }
}
