
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const MonthlyReport: React.FC = () => {
  // Generate dummy monthly data
  const data = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    count: Math.floor(Math.random() * 4) + 1,
    mood: Math.floor(Math.random() * 5) + 5
  }));

  const totalOutings = data.reduce((acc, d) => acc + d.count, 0);
  const avgMood = (data.reduce((acc, d) => acc + d.mood, 0) / 30).toFixed(1);

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">2月健康报告</h1>
        <p className="text-sm text-slate-500">记录父母生活的每一个脚步</p>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center">
          <span className="text-slate-400 text-[10px] font-bold uppercase mb-1">本月出门</span>
          <span className="text-2xl font-bold text-slate-800">{totalOutings} 次</span>
          <span className="text-[10px] text-slate-400 mt-1">日均 {(totalOutings/30).toFixed(1)} 次</span>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center">
          <span className="text-slate-400 text-[10px] font-bold uppercase mb-1">健康指数</span>
          <span className="text-2xl font-bold text-slate-800">{avgMood} 分</span>
          <span className="text-[10px] text-green-500 mt-1">状态：优秀</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
        <h3 className="text-sm font-bold text-slate-700 mb-6">日活跃度趋势</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 8}} />
              <YAxis hide />
              <Tooltip 
                 cursor={{fill: '#f8fafc'}}
                 contentStyle={{borderRadius: '8px', border: 'none', fontSize: '10px'}}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.count >= 2 ? '#3b82f6' : '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-4">
          蓝柱代表活跃天数，灰色代表运动量较少的天数。
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-700 mb-2">月度高光时刻</h3>
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-4 text-white shadow-lg shadow-orange-100">
           <div className="flex items-center space-x-3">
             <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
               📸
             </div>
             <div>
               <div className="text-[10px] font-bold opacity-80 uppercase tracking-widest">2月14日 · 情人节</div>
               <div className="font-bold text-sm">妈妈当天心情达到 10 分满分</div>
               <div className="text-xs opacity-90 mt-1 line-clamp-1">记录：和邻居张阿姨去逛了公园，笑容灿烂。</div>
             </div>
           </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <h4 className="text-xs font-bold text-blue-800 mb-2">💡 改善建议</h4>
          <ul className="text-xs text-blue-900 space-y-2 list-disc list-inside opacity-80">
            <li>下周气温回升，适合多出门走动。</li>
            <li>本月社交型外出占比较高，建议继续保持。</li>
            <li>平均晚归时间 21:00，较为规律。</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MonthlyReport;
