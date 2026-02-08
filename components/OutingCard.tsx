
import React from 'react';
import { OutingRecord } from '../types';
import { EMOTION_MAP, EMOTION_TEXT } from '../constants';

interface OutingCardProps {
  record: OutingRecord;
  index: number;
}

const OutingCard: React.FC<OutingCardProps> = ({ record, index }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  const moodDiff = (record.entryMoodScore || 0) - record.exitMoodScore;
  const isImproved = moodDiff > 0;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
            {index + 1}
          </div>
          <span className="font-bold text-slate-700">今日第 {index + 1} 次外出</span>
        </div>
        {record.durationMinutes && (
          <span className="text-xs text-slate-400">时长: {Math.floor(record.durationMinutes)} 分钟</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Exit Section */}
        <div className="space-y-2">
          <div className="flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <i className="fa-solid fa-door-open mr-1 text-orange-400"></i> 出门 {formatTime(record.exitTime)}
          </div>
          <div className="relative group">
            <img 
              src={record.exitPhoto} 
              className="w-full h-32 object-cover rounded-lg border border-slate-100" 
              alt="出门瞬间" 
            />
            <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
              {EMOTION_MAP[record.exitMoodScore]} {EMOTION_TEXT[record.exitMoodScore]}
            </div>
          </div>
        </div>

        {/* Entry Section */}
        <div className="space-y-2">
          <div className="flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <i className="fa-solid fa-house-chimney mr-1 text-green-400"></i> 回家 {record.entryTime ? formatTime(record.entryTime) : '--:--'}
          </div>
          {record.entryTime ? (
            <div className="relative">
              <img 
                src={record.entryPhoto} 
                className="w-full h-32 object-cover rounded-lg border border-slate-100" 
                alt="回家瞬间" 
              />
              <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                {EMOTION_MAP[record.entryMoodScore || 5]} {EMOTION_TEXT[record.entryMoodScore || 5]}
              </div>
              {moodDiff !== 0 && (
                <div className={`absolute -top-1 -left-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isImproved ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {isImproved ? '↑' : '↓'} {Math.abs(moodDiff)} 分
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-32 bg-slate-50 rounded-lg border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300">
              <i className="fa-solid fa-person-walking text-2xl mb-1"></i>
              <span className="text-[10px]">尚在外出中</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutingCard;
