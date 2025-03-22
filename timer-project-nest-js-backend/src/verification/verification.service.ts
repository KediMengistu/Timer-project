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
          `A verification code has already been sent. Please check your email.`,
        );
      } else if (user.verificationAction !== verificationAction) {
        throw new BadRequestException(
          `Please complete your pending verification first.`,
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
          `Verification code has expired. Please request a new one.`,
        );
      } else if (user.verificationAction !== verificationAction) {
        throw new BadRequestException(
          `Previous verification has expired. You can now proceed.`,
        );
      }
    }
    const verificationCode: string =
      this.verificationUtility.generateVerificationCode();
    await this.emailsService.createAndSendEmail(
      user.email,
      user.email,
      `Timer Application: ${this.verificationUtility.capitalizeVerificationAction(verificationAction)}`,
      `The copy & paste code for ${verificationAction} is as follows: ${verificationCode}.`,
      `
          <p>
            The copy & paste code for ${verificationAction} is as follows: ${verificationCode}.
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

  async reinitiateVerification(
    reinitiateUserVerificationDTO: ReinitiateUserVerificationDTO,
  ) {
    // Normalize email before retrieving user
    const normalizedEmail = reinitiateUserVerificationDTO.email.toLowerCase();

    let user: User =
      await this.usersService.retrieveUserViaEmail(normalizedEmail);
    if (!user) {
      throw new UnauthorizedException('Email not found.');
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
    user = await this.usersService.retrieveUserViaEmail(normalizedEmail);
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
          `Please complete your pending verification first.`,
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
          `Verification code has expired. Please request a new one.`,
        );
      } else if (user.verificationAction !== verificationAction) {
        throw new BadRequestException(
          `Previous verification has expired. You can now proceed.`,
        );
      }
    }
    const isMatching: boolean = await bcrypt.compare(
      inputVerificationCode,
      user.verificationCode,
    );
    if (!isMatching) {
      throw new UnauthorizedException(
        'Incorrect verification code. Please try again.',
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
