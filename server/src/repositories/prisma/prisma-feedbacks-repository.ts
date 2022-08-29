import { prisma } from '../../prisma';
import {
  FeedbackCreateData,
  FeedbacksRepository,
} from '../feedbacks-repository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({
    project,
    type,
    userId,
    userName,
    comment,
    screenshot,
  }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        project,
        type,
        userId,
        userName,
        comment,
        screenshot,
      },
    });
  }
}
