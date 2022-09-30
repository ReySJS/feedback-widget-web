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
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Alpha Digital <noreply@alphalumen.org.br>',
      to: 'Rey <rey@alphaedtech.org.br>',
      subject,
      html: body,
    });
  }
}
