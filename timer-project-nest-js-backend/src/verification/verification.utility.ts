import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';

@Injectable()
export class VerificationUtitliy {
  constructor() {}
  generateVerificationCode(length: number = 6): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      // Generate a random index within the alphabet range (0 to 35)
      const index = randomInt(0, alphabet.length);
      code += alphabet[index];
    }
    return code;
  }
  capitalizeVerificationAction(verificationAction: string): string {
    // Split the string by spaces to get individual words
    return verificationAction
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
