import React, { useState } from 'react';
import { Sparkles, Moon, Sun, Monitor, Battery, BatteryMedium, BatteryCharging, Coffee, Leaf, Zap } from 'lucide-react';

export interface FormData {
  handle: string;
  speed: string;
  energy: string;
  fuel: string;
}

interface InputFormProps {
  onSubmit: (data: FormData) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [handle, setHandle] = useState('');
  const [speed, setSpeed] = useState('Night Owl');
  const [energy, setEnergy] = useState('Mild Chaos');
  const [fuel, setFuel] = useState('Coffee');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) return;
    onSubmit({ handle, speed, energy, fuel });
  };

  const Selector = ({ 
    label, 
    value, 
    options, 
    onChange 
  }: { 
    label: string; 
    value: string; 
    options: { label: string; icon: React.ReactNode }[];
    onChange: (val: string) => void;
  }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-purple-300 mb-3">{label}</label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => onChange(opt.label)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
              value === opt.label
                ? 'bg-purple-600/30 border-purple-400 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            <div className={`mb-2 ${value === opt.label ? 'text-purple-300' : 'text-gray-500'}`}>
              {opt.icon}
            </div>
            <span className="text-[10px] font-semibold text-center leading-tight">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto p-6 glass-card rounded-3xl mt-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
          Vibe ID
        </h1>
        <p className="text-gray-400 text-sm">Discover your true digital archetype</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="mb-2">
          <label className="block text-sm font-medium text-purple-300 mb-2">
            Instagram Handle or Name
          </label>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="@yourname"
            className="w-full glass-input"
            required
          />
        </div>

        <Selector
          label="Vibe Speed"
          value={speed}
          onChange={setSpeed}
          options={[
            { label: 'Night Owl', icon: <Moon size={20} /> },
            { label: 'Early Bird', icon: <Sun size={20} /> },
            { label: 'Chronically Online', icon: <Monitor size={20} /> },
          ]}
        />

        <Selector
          label="Energy Level"
          value={energy}
          onChange={setEnergy}
          options={[
            { label: 'Low Key', icon: <Battery size={20} /> },
            { label: 'Mild Chaos', icon: <BatteryMedium size={20} /> },
            { label: 'Full Speed', icon: <BatteryCharging size={20} /> },
          ]}
        />

        <Selector
          label="Fuel"
          value={fuel}
          onChange={setFuel}
          options={[
            { label: 'Coffee', icon: <Coffee size={20} /> },
            { label: 'Matcha', icon: <Leaf size={20} /> },
            { label: 'Pure Caffeine', icon: <Zap size={20} /> },
          ]}
        />

        <button
          type="submit"
          disabled={!handle.trim()}
          className="w-full neon-button mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles size={20} />
          Generate My Vibe ID
        </button>
      </form>
    </div>
  );
};
