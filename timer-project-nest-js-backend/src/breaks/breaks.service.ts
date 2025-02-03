import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Break } from './entity/break.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreaksService {
  constructor(
    @InjectRepository(Break)
    private breakRespository: Repository<Break>
  ) {}

  async createBreak(breakObject: Break): Promise<Break> {
    const savedBreak: Break = await this.breakRespository.save(breakObject);
    return savedBreak;
  }
}
