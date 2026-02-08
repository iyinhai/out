
import React, { useState, useEffect } from 'react';
import { TabType, OutingRecord, Alert } from './types';
import { MOCK_OUTINGS, MOCK_ALERTS } from './constants';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import EmotionAnalysis from './components/EmotionAnalysis';
import MonthlyReport from './components/MonthlyReport';
import AlertCenter from './components/AlertCenter';
import Simulator from './components/Simulator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.DASHBOARD);
  const [outings, setOutings] = useState<OutingRecord[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [activeOuting, setActiveOuting] = useState<OutingRecord | null>(null);

  useEffect(() => {
    // Initial data load
    const savedOutings = localStorage.getItem('outings');
    const savedAlerts = localStorage.getItem('alerts');
    
    if (savedOutings) {
      setOutings(JSON.parse(savedOutings).map((o: any) => ({
        ...o,
        exitTime: new Date(o.exitTime),
        entryTime: o.entryTime ? new Date(o.entryTime) : undefined
      })));
    } else {
      setOutings(MOCK_OUTINGS);
    }

    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts).map((a: any) => ({
        ...a,
        timestamp: new Date(a.timestamp)
      })));
    } else {
      setAlerts(MOCK_ALERTS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('outings', JSON.stringify(outings));
    // Find if there's an ongoing outing
    const ongoing = outings.find(o => !o.entryTime);
    setActiveOuting(ongoing || null);
  }, [outings]);

  useEffect(() => {
    localStorage.setItem('alerts', JSON.stringify(alerts));
  }, [alerts]);

  const handleRecordEvent = (data: Partial<OutingRecord>) => {
    if (data.id) {
      // Return event
      setOutings(prev => prev.map(o => o.id === data.id ? { ...o, ...data } : o));
    } else {
      // New exit event
      const newOuting: OutingRecord = {
        id: Date.now().toString(),
        exitTime: data.exitTime!,
        exitMoodScore: data.exitMoodScore!,
        exitPhoto: data.exitPhoto
      };
      setOutings(prev => [newOuting, ...prev]);
    }
  };

  const handleResolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'RESOLVED' as const, isRead: true } : a));
  };

  const renderContent = () => {
    switch (activeTab) {
      case TabType.DASHBOARD:
        return <Dashboard outings={outings} />;
      case TabType.EMOTION:
        return <EmotionAnalysis outings={outings} />;
      case TabType.MONTHLY:
        return <MonthlyReport />;
      case TabType.ALERTS:
        return <AlertCenter alerts={alerts} onResolve={handleResolveAlert} />;
      case TabType.SIMULATOR:
        return <Simulator onRecordEvent={handleRecordEvent} activeOuting={activeOuting} />;
      default:
        return <Dashboard outings={outings} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative overflow-x-hidden">
      <main className="p-6">
        {renderContent()}
      </main>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
