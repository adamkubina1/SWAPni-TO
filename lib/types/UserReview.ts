import { Timestamp } from 'firebase/firestore';

type UserReview = {
  review: string;
  stars: number;
  timestamp: Timestamp;
};

export type { UserReview };
