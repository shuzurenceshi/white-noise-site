'use client';

import { SoundCard } from './SoundCard';
import { syntheticSounds } from '@/lib/audioSynth';
import { useSynthMixer } from '@/hooks/useSynthMixer';

export function SoundGrid() {
  const { toggleSynth, setVolume, getVolume, isActive, activeCount, stopAll } =
    useSynthMixer();

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* 头部 */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🎧</div>
        <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
          白噪音
        </h1>
        <p className="text-white/50 text-lg">
          专注 · 放松 · 助眠
        </p>
        <p className="text-white/40 text-sm mt-2">
          点击播放，可叠加多种音效
        </p>
        
        {activeCount > 0 && (
          <div className="mt-6 inline-flex items-center gap-4 px-6 py-2 bg-white/10 rounded-full">
            <span className="text-white/70">
              正在播放 {activeCount} 个音效
            </span>
            <button
              onClick={stopAll}
              className="px-4 py-1 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-full transition-colors"
            >
              停止全部
            </button>
          </div>
        )}
      </div>

      {/* 声音网格 */}
      <div className="grid grid-cols-3 gap-6">
        {syntheticSounds.map((sound) => (
          <SoundCard
            key={sound.id}
            sound={sound}
            isActive={isActive(sound.id)}
            volume={getVolume(sound.id)}
            onToggle={() => toggleSynth(sound.id, sound.type)}
            onVolumeChange={(vol) => setVolume(sound.id, vol)}
          />
        ))}
      </div>

      {/* 提示 */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-white/40 text-sm">
          <span>💡</span>
          <span>建议使用耳机获得最佳体验</span>
        </div>
      </div>
    </div>
  );
}
