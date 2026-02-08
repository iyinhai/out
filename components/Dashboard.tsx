
import React, { useState, useEffect } from 'react';
import { OutingRecord, DailySummary } from '../types';
import OutingCard from './OutingCard';
import { generateHealthInsight } from '../services/geminiService';

interface DashboardProps {
  outings: OutingRecord[];
}

const Dashboard: React.FC<DashboardProps> = ({ outings }) => {
  const [insight, setInsight] = useState<string>('正在分析今日情绪与活动规律...');
  const [loadingInsight, setLoadingInsight] = useState(true);

  const today = new Date().toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  useEffect(() => {
    const getInsight = async () => {
      if (outings.length === 0) {
        setInsight("妈妈今天还没有出门呢。如果是因为天气或身体原因，记得问候一下哦。");
        setLoadingInsight(false);
        return;
      }
      setLoadingInsight(true);
      const text = await generateHealthInsight(outings);
      setInsight(text);
      setLoadingInsight(false);
    };
    getInsight();
  }, [outings]);

  const avgMood = outings.length > 0 
    ? (outings.reduce((acc, curr) => acc + (curr.entryMoodScore || curr.exitMoodScore), 0) / outings.length).toFixed(1)
    : 0;

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-6">
        <h2 className="text-slate-400 text-sm font-medium">{today}</h2>
        <h1 className="text-2xl font-bold text-slate-800">下午好，妈妈一切正常</h1>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-5 text-white shadow-lg shadow-blue-200">
          <div className="text-xs opacity-80 mb-1">今日出门次数</div>
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-bold">{outings.length}</span>
            <span className="text-sm">次</span>
          </div>
          <div className="mt-2 text-[10px] bg-white/20 px-2 py-0.5 rounded-full inline-block">
            正常范围 ✓
          </div>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
          <div className="text-slate-400 text-xs mb-1">平均情绪分</div>
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-bold text-slate-800">{avgMood}</span>
            <span className="text-sm text-slate-500">分</span>
          </div>
          <div className="mt-2 flex items-center space-x-1 text-[10px] text-green-500 font-medium">
            <i className="fa-solid fa-face-smile"></i>
            <span>心情不错</span>
          </div>
        </div>
      </div>

      {/* AI Insight */}
      <div className="bg-indigo-50 rounded-2xl p-4 mb-6 border border-indigo-100">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-[10px] text-white">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          </div>
          <span className="text-xs font-bold text-indigo-800 uppercase tracking-wide">今日关怀洞察</span>
        </div>
        <p className="text-sm text-indigo-900 leading-relaxed">
          {loadingInsight ? (
            <span className="flex items-center space-x-2">
              <i className="fa-solid fa-circle-notch fa-spin"></i>
              <span>正在分析...</span>
            </span>
          ) : insight}
        </p>
      </div>

      {/* Outing List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-700 flex items-center">
          <i className="fa-solid fa-clock-rotate-left mr-2 text-blue-500"></i>
          实时动态记录
        </h3>
        {outings.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200">
            <i className="fa-solid fa-cloud-sun text-4xl text-slate-200 mb-3"></i>
            <p className="text-slate-400 text-sm">今日尚无外出记录</p>
          </div>
        ) : (
          outings.map((rec, idx) => (
            <OutingCard key={rec.id} record={rec} index={idx} />
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-24 left-4 right-4 flex space-x-4">
        <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-2xl shadow-sm font-bold text-sm flex items-center justify-center space-x-2 active:scale-95 transition-transform">
          <i className="fa-solid fa-phone text-green-500"></i>
          <span>给妈妈打电话</span>
        </button>
        <button className="flex-1 bg-blue-600 text-white py-3 rounded-2xl shadow-md shadow-blue-100 font-bold text-sm flex items-center justify-center space-x-2 active:scale-95 transition-transform">
          <i className="fa-solid fa-paper-plane"></i>
          <span>发送问候消息</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
