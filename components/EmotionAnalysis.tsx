
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { OutingRecord } from '../types';

interface EmotionAnalysisProps {
  outings: OutingRecord[];
}

const EmotionAnalysis: React.FC<EmotionAnalysisProps> = ({ outings }) => {
  const chartData = outings.flatMap(o => {
    const data = [{
      time: o.exitTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      score: o.exitMoodScore,
      type: '出门'
    }];
    if (o.entryTime) {
      data.push({
        time: o.entryTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        score: o.entryMoodScore || 0,
        type: '回家'
      });
    }
    return data;
  });

  const moodDiffs = outings
    .filter(o => o.entryMoodScore !== undefined)
    .map(o => (o.entryMoodScore || 0) - o.exitMoodScore);
  
  const improvedSessions = moodDiffs.filter(d => d > 0).length;

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">情绪趋势分析</h1>
        <p className="text-sm text-slate-500">感知每一份心情的起伏</p>
      </header>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
        <h3 className="text-sm font-bold text-slate-700 mb-4">今日情绪曲线</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
              <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
              <Tooltip 
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                labelStyle={{fontWeight: 'bold', fontSize: '12px'}}
              />
              <ReferenceLine y={5} stroke="#e2e8f0" strokeDasharray="3 3" />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorScore)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
          <div className="text-green-600 text-[10px] font-bold uppercase tracking-wider mb-1">情绪改善</div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-green-700">{improvedSessions}</span>
            <span className="text-xs text-green-600">次外出</span>
          </div>
          <p className="text-[10px] text-green-600 mt-2 italic">“社交确实让心情变好了”</p>
        </div>
        <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
          <div className="text-orange-600 text-[10px] font-bold uppercase tracking-wider mb-1">波动幅度</div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-orange-700">±2</span>
            <span className="text-xs text-orange-600">分</span>
          </div>
          <p className="text-[10px] text-orange-600 mt-2 italic">情绪相对平稳，波动在正常范围</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <h3 className="text-sm font-bold text-slate-700 mb-3">历史对比</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">本周平均</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[78%]"></div>
              </div>
              <span className="text-xs font-bold">7.8</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">上周平均</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-slate-300 h-full w-[82%]"></div>
              </div>
              <span className="text-xs font-bold text-slate-400">8.2</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            本周情绪分较上周有 <span className="text-orange-500">轻微下滑</span>，建议关注睡眠质量。
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmotionAnalysis;
