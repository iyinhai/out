
import { OutingRecord, Alert, EmotionScore } from './types';

export const MOCK_OUTINGS: OutingRecord[] = [
  {
    id: '1',
    exitTime: new Date(new Date().setHours(8, 30, 0, 0)),
    entryTime: new Date(new Date().setHours(10, 0, 0, 0)),
    exitMoodScore: 7,
    entryMoodScore: 9,
    exitPhoto: 'https://picsum.photos/seed/exit1/200/200',
    entryPhoto: 'https://picsum.photos/seed/entry1/200/200',
    durationMinutes: 90
  },
  {
    id: '2',
    exitTime: new Date(new Date().setHours(15, 0, 0, 0)),
    entryTime: new Date(new Date().setHours(16, 15, 0, 0)),
    exitMoodScore: 6,
    entryMoodScore: 8,
    exitPhoto: 'https://picsum.photos/seed/exit2/200/200',
    entryPhoto: 'https://picsum.photos/seed/entry2/200/200',
    durationMinutes: 75
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    timestamp: new Date(),
    type: 'EMOTION',
    message: '妈妈回家时的情绪较往常略有低落，建议通过语音询问一下是否有不适。',
    isRead: false,
    status: 'PENDING'
  },
  {
    id: 'a2',
    timestamp: new Date(Date.now() - 86400000),
    type: 'SAFETY',
    message: '昨日深夜（22:15）检测到未归，现已确认为安全到家。',
    isRead: true,
    status: 'RESOLVED'
  }
];

export const EMOTION_MAP: Record<number, string> = {
  1: '😫',
  2: '😟',
  3: '😕',
  4: '😐',
  5: '😌',
  6: '😊',
  7: '🙂',
  8: '😄',
  9: '😁',
  10: '🤩'
};

export const EMOTION_TEXT: Record<number, string> = {
  1: '非常沮丧',
  3: '有些低落',
  5: '心态平和',
  8: '心情不错',
  10: '非常开心'
};
