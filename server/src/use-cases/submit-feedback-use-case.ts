import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest {
  project: string;
  type: string;
  userId: number;
  userName: string;
  userEmail: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { project, type, userId, userName, userEmail, comment, screenshot } = request;

    if (!type) {
      throw new Error('Type is required');
    }

    if (!userEmail) {
      throw new Error('Email is required');
    }

    if (!comment) {
      throw new Error('Comment is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.');
    }

    await this.feedbackRepository.create({
      project,
      type,
      userId,
      userName,
      userEmail,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: `Novo feedback - ${project}`,
      userName,
      userEmail,
      body: [
        `<div style="font-family: sans-serif; font-size:16px; color:#353535">`,
        `<p>Projeto: ${project}</p>`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Usuário: ${userName}</p>`,
        `<p>Email: ${userEmail}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" alt="Feedback" />` : ``,
        `</div>`,
      ].join('\n'),
    });
  }
}
