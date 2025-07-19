// src/types/models.ts
import { Timestamp } from 'firebase/firestore';

export interface Enrollment {
  enrolledAt: Timestamp;
  status: 'in-progress' | 'completed';
  progressPercent: number;
}

export interface Course {
  id: string;
  title: string;
  thumbnailURL?: string;
}