import { Body, Controller, Patch } from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator.factory';
import { VerificationService } from './verification.service';
import { ReinitiateUserVerificationDTO } from 'src/users/dto/reinitiate-user-verification.dto';

@Controller('verification')
export class VerificationController {
  constructor(private verificationService: VerificationService) {}
  @Public()
  @Patch('reinitiate-verification')
  async reinitiateVerification(
    @Body() reinitiateUserVerificationDTO: ReinitiateUserVerificationDTO,
  ) {
    await this.verificationService.reinitiateVerification(
      reinitiateUserVerificationDTO,
    );
  }
}
