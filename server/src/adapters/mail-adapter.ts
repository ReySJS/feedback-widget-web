export interface SendMailData {
  subject: string;
  userName: string;
  userEmail: string;
  body: string;
}

export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>;
}
