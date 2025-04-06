import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Break } from './entity/break.entity';
import { Repository } from 'typeorm';
import { Timer } from 'src/timers/entities/timer.entity';

@Injectable()
export class BreaksService {
  constructor(
    @InjectRepository(Break)
    private breakRespository: Repository<Break>,
  ) {}

  async createBreak(breakObject: Break): Promise<Break> {
    const savedBreak: Break = await this.breakRespository.save(breakObject);
    return savedBreak;
  }

  async retrieveAllBreaks(timerId: string): Promise<Break[]> {
    const listOfBreaks: Break[] = await this.breakRespository.find({
      where: { timer: { id: timerId } },
    });
    return listOfBreaks;
  }

  async removeAllBreaks(timer: Timer) {
    await this.breakRespository.delete({ timer: timer });
  }
}
