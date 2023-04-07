import { Timestamp } from 'firebase/firestore';

type Message = {
  userId: string;
  message: string;
  timestamp: Timestamp;
};

export type { Message };
