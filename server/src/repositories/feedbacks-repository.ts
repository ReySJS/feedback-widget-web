export interface FeedbackCreateData {
  type: string;
  userId: number;
  userName: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
}
