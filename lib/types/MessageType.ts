import { Timestamp } from 'firebase/firestore';

type MessageType = {
  userId: string;
  message: string;
  timestamp: Timestamp;
};

export type { MessageType };
