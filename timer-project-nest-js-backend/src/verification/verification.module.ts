import { Module, forwardRef } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { UsersModule } from '../users/users.module';
import { EmailsModule } from '../emails/emails.module';
import { VerificationUtitliy } from './verification.utility';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    EmailsModule
  ],
  providers: [
    VerificationService, 
    VerificationUtitliy
  ],
  exports: [VerificationService]
})
export class VerificationModule {}
