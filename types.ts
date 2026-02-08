
export enum EmotionScore {
  EXTREMELY_SAD = 1,
  SAD = 3,
  NEUTRAL = 5,
  HAPPY = 8,
  EXTREMELY_HAPPY = 10
}

export interface OutingRecord {
  id: string;
  exitTime: Date;
  entryTime?: Date;
  exitMoodScore: number;
  entryMoodScore?: number;
  exitPhoto?: string;
  entryPhoto?: string;
  durationMinutes?: number;
}

export interface Alert {
  id: string;
  timestamp: Date;
  type: 'SAFETY' | 'HEALTH' | 'EMOTION' | 'HABIT';
  message: string;
  isRead: boolean;
  status: 'PENDING' | 'RESOLVED';
}

export interface DailySummary {
  date: string;
  outings: OutingRecord[];
  averageMood: number;
  insight?: string;
}

export enum TabType {
  DASHBOARD = 'DASHBOARD',
  EMOTION = 'EMOTION',
  MONTHLY = 'MONTHLY',
  ALERTS = 'ALERTS',
  SIMULATOR = 'SIMULATOR'
}
