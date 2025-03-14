import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { EmailsService } from '../emails/emails.service';
import { UsersService } from '../users/users.service';
import { VerificationUtitliy } from './verification.utility';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '../exception/bad-request.exception';
import { UnauthorizedException } from '../exception/unauthorized.exception';
import { ReinitiateUserVerificationDTO } from 'src/users/dto/reinitiate-user-verification.dto';
import { UserVerificationStatus } from '../users/enums/user-verification-status.enum';
import { VerificationActions } from './enums/verification-actions.enums';

@Injectable()
export class VerificationService {
  constructor(
    private emailsService: EmailsService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private verificationUtility: VerificationUtitliy,
  ) {}

  async initiateVerification(user: User, verificationAction: string) {
    const checkTime: Date = new Date();
    if (
      user.verificationCode !== null &&
      user.verificationCodeExpireTime !== null &&
      user.verificationCodeExpireTime.getTime() > checkTime.getTime()
    ) {
      if (user.verificationAction === verificationAction) {
        throw new BadRequestException(
          `A valid verification code has already been sent via email for ${user.verificationAction}. Cannot reinitiate ${verificationAction} until previously issued code for it has expired.`,
        );
      } else if (user.verificationAction !== verificationAction) {
        throw new BadRequestException(
          `A valid verification code has already been sent via email for an action that is not ${verificationAction}. Cannot initiate ${verificationAction} until previously issued code for ${user.verificationAction} expires or ${user.verificationAction} completes.`,
        );
      }
    }
    if (
      user.verificationCode !== null &&
      user.verificationCodeExpireTime !== null &&
      user.verificationCodeExpireTime.getTime() <= checkTime.getTime()
    ) {
      if (user.verificationAction === verificationAction) {
        throw new BadRequestException(
          `Verification code for ${user.verificationAction} has expired.`,
        );
      } else if (user.verificationAction !== verificationAction) {
        throw new BadRequestException(
          `Verification code for ${user.verificationAction} has expired. It is now possible to initiate ${verificationAction}.`,
        );
      }
    }
    const verificationCode: string =
      this.verificationUtility.generateVerificationCode();
    await this.emailsService.createAndSendEmail(
      user.email,
      user.email,
      `Timer Application: ${verificationAction}`,
      `Code for ${verificationAction} is as follows: ${verificationCode}.`,
      `
          <p>
            Code for ${verificationAction} is as follows: ${verificationCode}.
          </p>
        `,
    );
    const now: Date = new Date();
    const verificationCodeExpireTime: Date = new Date(
      now.getTime() + 5 * 60 * 1000,
    );
    //update user entry to store original and transformed verification related data.
    const salt = await bcrypt.genSalt(10);
    const hashedVerificationCode: string = await bcrypt.hash(
      verificationCode,
      salt,
    );
    await this.usersService.updateUserVerficationProps(
      user.id,
      hashedVerificationCode,
      verificationCodeExpireTime,
      user.isVerified,
      verificationAction,
    );
  }

  async reiniateVerification(
    reinitiateUserVerificationDTO: ReinitiateUserVerificationDTO,
  ) {
    let user: User = await this.usersService.retrieveUserViaEmail(
      reinitiateUserVerificationDTO.email,
    );
    if (!user) {
      throw new BadRequestException(
        'Cannot issue new verification code. Provided email is not associated to any user account.',
      );
    }
    if (
      user.verificationCode !== null &&
      user.verificationCodeExpireTime !== null &&
      user.verificationCodeExpireTime.getTime() <= new Date().getTime()
    ) {
      await this.usersService.updateUserVerficationProps(
        user.id,
        null,
        null,
        user.isVerified,
        null,
      );
    }
    user = await this.usersService.retrieveUserViaEmail(
      reinitiateUserVerificationDTO.email,
    );
    await this.initiateVerification(
      user,
      reinitiateUserVerificationDTO.verificationAction,
    );
  }

  async completeVerification(
    user: User,
    inputVerificationCode: string,
    verificationAction: string,
  ) {
    const now: Date = new Date();
    if (
      user.verificationCode !== null &&
      user.verificationCodeExpireTime !== null &&
      user.verificationCodeExpireTime.getTime() > now.getTime()
    ) {
      if (user.verificationAction !== verificationAction) {
        throw new BadRequestException(
          `Currently issued verification code is for ${user.verificationAction} and not ${verificationAction}. Please wait for code to expire or complete ${user.verificationAction}.`,
        );
      }
    }
    if (
      user.verificationCode !== null &&
      user.verificationCodeExpireTime !== null &&
      user.verificationCodeExpireTime.getTime() <= now.getTime()
    ) {
      if (user.verificationAction === verificationAction) {
        throw new BadRequestException(
          `Verification code for ${user.verificationAction} has expired.`,
        );
      } else if (user.verificationAction !== verificationAction) {
        throw new BadRequestException(
          `Verification code for ${user.verificationAction} has expired. It is now possible to initiate ${verificationAction}.`,
        );
      }
    }
    const isMatching: boolean = await bcrypt.compare(
      inputVerificationCode,
      user.verificationCode,
    );
    if (!isMatching) {
      throw new UnauthorizedException(
        'Provided verification code is incorrect.',
      );
    }
    user.isVerified !== UserVerificationStatus.VERIFIED &&
    verificationAction === VerificationActions.INITIATE_SIGN_UP
      ? await this.usersService.updateUserVerficationProps(
          user.id,
          null,
          null,
          UserVerificationStatus.VERIFIED,
          null,
        )
      : await this.usersService.updateUserVerficationProps(
          user.id,
          null,
          null,
          user.isVerified,
          null,
        );
  }
}
