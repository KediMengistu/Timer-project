import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailsService {
  constructor(private configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get('SENDGRID_API_KEY'));
  }

  async createAndSendEmail(
    to: string,
    from: string,
    subject: string,
    text: string,
    html: string,
  ) {
    const msg: {
      to: string;
      from: string;
      subject: string;
      text: string;
      html: string;
    } = {
      to,
      from,
      subject,
      text,
      html,
    };

    SendGrid.send(msg)
      .then((response) => {})
      .catch((error) => {});
  }
}
