
import React from 'react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { type: TabType.DASHBOARD, label: '概览', icon: 'fa-house' },
    { type: TabType.EMOTION, label: '情绪', icon: 'fa-face-smile' },
    { type: TabType.MONTHLY, label: '报告', icon: 'fa-chart-line' },
    { type: TabType.ALERTS, label: '预警', icon: 'fa-bell' },
    { type: TabType.SIMULATOR, label: '设备', icon: 'fa-video' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center pb-safe-area-inset-bottom z-50">
      {tabs.map((tab) => (
        <button
          key={tab.type}
          onClick={() => setActiveTab(tab.type)}
          className={`flex flex-col items-center justify-center p-2 transition-colors ${
            activeTab === tab.type ? 'text-blue-600' : 'text-slate-400'
          }`}
        >
          <i className={`fa-solid ${tab.icon} text-xl mb-1`}></i>
          <span className="text-[10px] font-medium">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
