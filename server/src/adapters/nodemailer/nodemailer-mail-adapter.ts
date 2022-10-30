import nodemailer from 'nodemailer';
import 'dotenv/config';

import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: 465,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, userName, body }: SendMailData) {


    const mailList = process.env.MAIL_LIST;
    await transport.sendMail({
      from: `${userName} <noreply@alphalumen.org.br>`,
      to: JSON.parse(mailList!),
      subject,
      html: body,
    });
  }
}
