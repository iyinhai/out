
import React from 'react';
import { Alert } from '../types';

interface AlertCenterProps {
  alerts: Alert[];
  onResolve: (id: string) => void;
}

const AlertCenter: React.FC<AlertCenterProps> = ({ alerts, onResolve }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'SAFETY': return 'fa-shield-halved text-red-500';
      case 'HEALTH': return 'fa-heart-pulse text-blue-500';
      case 'EMOTION': return 'fa-face-frown text-orange-500';
      case 'HABIT': return 'fa-clock text-indigo-500';
      default: return 'fa-bell text-slate-500';
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case 'SAFETY': return '安全预警';
      case 'HEALTH': return '健康预警';
      case 'EMOTION': return '情绪提醒';
      case 'HABIT': return '习惯异常';
      default: return '普通消息';
    }
  };

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">预警中心</h1>
        <p className="text-sm text-slate-500">及时掌握任何细微的异常</p>
      </header>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500 text-2xl">
              <i className="fa-solid fa-check"></i>
            </div>
            <p className="text-slate-400 text-sm">目前一切正常，暂无预警</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`bg-white rounded-2xl p-4 shadow-sm border transition-all ${
                alert.status === 'PENDING' ? 'border-l-4 border-l-red-500 border-slate-200' : 'border-slate-100 opacity-60'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <i className={`fa-solid ${getIcon(alert.type)} text-sm`}></i>
                  <span className="text-xs font-bold text-slate-700 uppercase">{getLabel(alert.type)}</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {alert.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {alert.message}
              </p>

              {alert.status === 'PENDING' ? (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onResolve(alert.id)}
                    className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
                  >
                    确认已处理
                  </button>
                  <button className="flex-1 bg-slate-900 text-white py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors">
                    立即联系
                  </button>
                </div>
              ) : (
                <div className="flex items-center text-[10px] text-slate-400 font-medium italic">
                  <i className="fa-solid fa-circle-check mr-1 text-green-500"></i>
                  已于昨日 22:15 关闭
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-8 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <h4 className="text-sm font-bold text-slate-700 mb-4">预警配置</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">离家超过 2 小时通知</span>
            <div className="w-8 h-4 bg-blue-500 rounded-full flex items-center px-1">
              <div className="w-2 h-2 bg-white rounded-full ml-auto"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">情绪大幅下滑通知</span>
            <div className="w-8 h-4 bg-blue-500 rounded-full flex items-center px-1">
              <div className="w-2 h-2 bg-white rounded-full ml-auto"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
             <span className="text-xs text-slate-500 font-medium">深夜（22:00后）出门通知</span>
             <div className="w-8 h-4 bg-slate-200 rounded-full flex items-center px-1">
               <div className="w-2 h-2 bg-white rounded-full"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCenter;
