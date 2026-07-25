import React, { useRef } from 'react';
import { Download, Sparkles, AlertTriangle, Link as LinkIcon } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import type { VibeData } from '../services/ai';

interface ResultCardProps {
  data: VibeData;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data, onReset }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, { 
        quality: 1.0,
        pixelRatio: 2 // High res
      });
      const link = document.createElement('a');
      link.download = `my-vibe-id.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
      alert('Failed to save image.');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('App link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const StatBar = ({ label, value, colorClass }: { label: string, value: number, colorClass: string }) => (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1 font-bold">
        <span className="text-gray-300 uppercase tracking-wider">{label}</span>
        <span className={colorClass.replace('bg-', 'text-')}>{value}%</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass} rounded-full transition-all duration-1000 ease-out`} 
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center mt-4 mb-12">
      {/* 9:16 Aspect Ratio Card Container */}
      <div 
        ref={cardRef}
        className="w-full aspect-[9/16] glass-card rounded-[2rem] p-6 flex flex-col relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(20,10,35,0.95) 0%, rgba(10,5,20,0.98) 100%)' }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-[80px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600 rounded-full mix-blend-multiply filter blur-[80px] opacity-20"></div>

        <div className="relative z-10 flex-grow flex flex-col">
          {/* Header */}
          <div className="text-center mb-6 mt-4">
            <div className="inline-flex items-center justify-center p-2 bg-white/10 rounded-full mb-4">
              <Sparkles size={24} className="text-pink-400" />
            </div>
            <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-400 leading-tight">
              {data.archetype}
            </h2>
          </div>

          {/* Stats */}
          <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10 shadow-inner">
            <StatBar label="Chaos" value={data.stats.chaos} colorClass="bg-pink-500" />
            <StatBar label="Intuition" value={data.stats.intuition} colorClass="bg-purple-400" />
            <StatBar label="Energy" value={data.stats.energy} colorClass="bg-yellow-400" />
            <StatBar label="Sarcasm" value={data.stats.sarcasm} colorClass="bg-cyan-400" />
          </div>

          {/* Roast */}
          <div className="mb-6">
            <p className="text-sm text-gray-300 italic font-medium text-center px-2 leading-relaxed">
              "{data.roast}"
            </p>
          </div>

          {/* Traits */}
          <div className="mt-auto space-y-3">
            <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex gap-3 items-start">
              <Sparkles className="text-yellow-400 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-[10px] uppercase text-gray-500 font-bold mb-0.5">Secret Power</p>
                <p className="text-sm font-medium text-purple-100">{data.secretPower}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex gap-3 items-start">
              <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-[10px] uppercase text-gray-500 font-bold mb-0.5">Red Flag</p>
                <p className="text-sm font-medium text-purple-100">{data.redFlag}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 pt-4 border-t border-white/10">
            <p className="text-xs font-bold tracking-widest text-white/40 uppercase">vibe-id.app</p>
          </div>
        </div>
      </div>

      {/* Action Buttons (outside the card so they aren't in the image) */}
      <div className="w-full mt-6 grid grid-cols-2 gap-3">
        <button 
          onClick={handleDownload}
          className="bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors font-semibold"
        >
          <Download size={18} />
          Save Image
        </button>
        <button 
          onClick={handleCopyLink}
          className="bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors font-semibold"
        >
          <LinkIcon size={18} />
          Copy Link
        </button>
      </div>
      
      <button 
        onClick={onReset}
        className="mt-4 text-sm text-gray-400 hover:text-white transition-colors"
      >
        Generate Another
      </button>
    </div>
  );
};
