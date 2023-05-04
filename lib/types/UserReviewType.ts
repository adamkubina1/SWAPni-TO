import { Timestamp } from 'firebase/firestore';

type UserReviewType = {
  review: string;
  stars: number;
  timestamp: Timestamp;
};

export type { UserReviewType };
