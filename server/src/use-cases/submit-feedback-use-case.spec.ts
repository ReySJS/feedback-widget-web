import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendEmailSpy },
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        project: 'EdTech-Asp',
        type: 'BUG',
        userId: 1,
        userName: 'Test User',
        userEmail: 'teste@email.com',
        comment: 'example comment',
        screenshot: 'data:image/png;base64sdsadsadasd',
      }),
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without project', async () => {
    await expect(
      submitFeedback.execute({
        project: '',
        type: 'BUG',
        userId: 1,
        userName: 'Test User',
        userEmail: 'teste@email.com',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,sdsadsadasd',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        project: 'EdTech-Asp',
        type: '',
        userId: 1,
        userName: 'Test User',
        userEmail: 'teste@email.com',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,sdsadsadasd',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback without user email', async () => {
    await expect(
      submitFeedback.execute({
        project: 'EdTech-Asp',
        type: '',
        userId: 1,
        userName: 'Test User',
        userEmail: '',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,sdsadsadasd',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        project: 'EdTech-Asp',
        type: 'BUG',
        userId: 1,
        userName: 'Test User',
        userEmail: 'teste@email.com',
        comment: '',
        screenshot: 'data:image/png;base64,sdsadsadasd',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        project: 'EdTech-Asp',
        type: 'BUG',
        userId: 1,
        userEmail: 'teste@email.com',
        userName: 'Test User',
        comment: 'example comment',
        screenshot: 'test.jpg',
      }),
    ).rejects.toThrow();
  });
});
