
import React, { useState, useRef } from 'react';
import { analyzeMoodFromPhoto } from '../services/geminiService';
import { OutingRecord } from '../types';

interface SimulatorProps {
  onRecordEvent: (record: Partial<OutingRecord>) => void;
  activeOuting: OutingRecord | null;
}

const Simulator: React.FC<SimulatorProps> = ({ onRecordEvent, activeOuting }) => {
  const [capturing, setCapturing] = useState(false);
  const [statusMsg, setStatusMsg] = useState('设备在线：已连接到门厅摄像头');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setCapturing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error(err);
      setStatusMsg('摄像头启动失败，请检查权限');
    }
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const photo = canvasRef.current.toDataURL('image/jpeg');
    
    setStatusMsg('正在进行 AI 情绪识别...');
    const analysis = await analyzeMoodFromPhoto(photo);
    
    if (activeOuting) {
      // It's a return event
      onRecordEvent({
        id: activeOuting.id,
        entryTime: new Date(),
        entryMoodScore: analysis.score,
        entryPhoto: photo,
        durationMinutes: (Date.now() - activeOuting.exitTime.getTime()) / 60000
      });
      setStatusMsg(`检测到回家！识别分数：${analysis.score}`);
    } else {
      // It's a new exit event
      onRecordEvent({
        exitTime: new Date(),
        exitMoodScore: analysis.score,
        exitPhoto: photo
      });
      setStatusMsg(`检测到出门！识别分数：${analysis.score}`);
    }

    // Stop camera
    const stream = videoRef.current.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setCapturing(false);
  };

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-left-4 duration-500">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">硬件仿真模拟</h1>
        <p className="text-sm text-slate-500">模拟智能摄像头的自动触发行为</p>
      </header>

      <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl overflow-hidden relative border-4 border-slate-800 mb-6">
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-mono text-white opacity-70">CAM_01 LIVE</span>
        </div>

        {capturing ? (
          <video 
            ref={videoRef} 
            autoPlay 
            className="w-full h-64 object-cover rounded-xl bg-black transform scale-x-[-1]"
          />
        ) : (
          <div className="w-full h-64 bg-slate-800 rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-camera text-4xl text-slate-600"></i>
          </div>
        )}
        
        <canvas ref={canvasRef} width="640" height="480" className="hidden" />
        
        <div className="mt-6 flex flex-col items-center">
          {!capturing ? (
            <button 
              onClick={startCamera}
              className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold shadow-lg shadow-white/10 active:scale-95 transition-transform"
            >
              启动识别
            </button>
          ) : (
            <button 
              onClick={capturePhoto}
              className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
            >
              模拟触发 (拍照并分析)
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-slate-100 p-2 rounded-lg">
            <i className="fa-solid fa-terminal text-slate-500 text-sm"></i>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-700">设备控制台</h3>
            <p className="text-[10px] text-slate-400 font-mono">{statusMsg}</p>
          </div>
        </div>
        
        <div className="space-y-3">
           <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
             <span className="text-xs font-medium text-slate-600">当前门磁状态</span>
             <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${activeOuting ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
               {activeOuting ? '出门中 (已开启)' : '在家 (已关闭)'}
             </span>
           </div>
           <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
             <span className="text-xs font-medium text-slate-600">AI 离线处理模式</span>
             <div className="w-10 h-5 bg-blue-500 rounded-full flex items-center px-1">
               <div className="w-3 h-3 bg-white rounded-full ml-auto"></div>
             </div>
           </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-2xl text-orange-800 text-xs">
        <i className="fa-solid fa-circle-info mr-2"></i>
        真实场景中，系统会通过 OpenCV 和传感器自动检测人体移动，无需手动触发。本模拟器用于演示系统感知能力。
      </div>
    </div>
  );
};

export default Simulator;
