import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { EmailsService } from '../emails/emails.service';
import { UsersService } from '../users/users.service';
import { VerificationUtitliy } from './verification.utility';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '../exception/bad-request.exception';
import { UnauthorizedException } from '../exception/unauthorized.exception';
import { UserVerificationStatus } from '../users/enums/user-verification-status.enum';

@Injectable()
export class VerificationService {
  constructor(
      private emailsService: EmailsService,
      @Inject(forwardRef(() => UsersService))
      private usersService: UsersService,
      private verificationUtility: VerificationUtitliy
    ) {}

    async initiateVerification(user: User, action: string) {
      if(user.verificationCode !== null && user.verificationCodeExpireTime !== null) {
        throw new BadRequestException('A valid verification code has already been sent via email. Cannot reinitiate verification until previously issued code has expired.');
      }
      const verificationCode: string = this.verificationUtility.generateVerificationCode();
      await this.emailsService.createAndSendEmail(
        user.email, 
        user.email, 
        `Timer Application: ${action}`, 
        `Code for ${action} is as follows: ${verificationCode}.`, 
        `
          <p>
            Code for ${action} is as follows: ${verificationCode}.
          </p>
        `
      );
      const now: Date = new Date();
      const verificationCodeExpireTime: Date = new Date(now.getTime() + 5 * 60 * 1000);
      //update user entry to store original and transformed verification related data.
      const salt = await bcrypt.genSalt(10);
      const hashedVerificationCode: string = await bcrypt.hash(verificationCode, salt);
      await this.usersService.updateUserVerficationProps(user.id, hashedVerificationCode, verificationCodeExpireTime, user.isVerified);
    }

    async completeVerification(user: User, inputVerificationCode: string) {
      const now: Date = new Date();
      if (!user.verificationCode || user.verificationCodeExpireTime.getTime() < now.getTime()) {
        await this.usersService.updateUserVerficationProps(user.id, null, null, user.isVerified);
        throw new BadRequestException('Verification code expired.');
      }
      const isMatching: boolean = await bcrypt.compare(inputVerificationCode, user.verificationCode);
      if(!isMatching) {
        throw new UnauthorizedException('Provided verification code is incorrect.');
      }
      user.isVerified !== UserVerificationStatus.VERIFIED ? 
        await this.usersService.updateUserVerficationProps(user.id, null, null, UserVerificationStatus.VERIFIED) : 
        await this.usersService.updateUserVerficationProps(user.id, null, null, user.isVerified);
    }
}