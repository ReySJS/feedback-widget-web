export interface SendMailData {
  subject: string;
  userName: string;
  body: string;
}

export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>;
}
