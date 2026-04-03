'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Sound } from '@/lib/sounds';

interface ActiveSound {
  sound: Sound;
  volume: number;
  audio: HTMLAudioElement;
}

export function useSoundMixer() {
  const [activeSounds, setActiveSounds] = useState<Map<string, ActiveSound>>(
    () => new Map()
  );
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  // 切换声音
  const toggleSound = useCallback((sound: Sound) => {
    if (activeSounds.has(sound.id)) {
      // 停止并移除
      const active = activeSounds.get(sound.id);
      if (active?.audio) {
        active.audio.pause();
        active.audio.currentTime = 0;
      }
      audioRefs.current.delete(sound.id);
      setActiveSounds((prev) => {
        const next = new Map(prev);
        next.delete(sound.id);
        return next;
      });
    } else {
      // 添加并播放
      const audio = new Audio(sound.audioUrl);
      audio.loop = true;
      audio.volume = 0.5;
      audioRefs.current.set(sound.id, audio);
      audio.play().catch(console.error);

      setActiveSounds((prev) => {
        const next = new Map(prev);
        next.set(sound.id, {
          sound,
          volume: 0.5,
          audio,
        });
        return next;
      });
    }
  }, [activeSounds]);

  // 调整音量
  const setVolume = useCallback((soundId: string, volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    const audio = audioRefs.current.get(soundId);
    if (audio) {
      audio.volume = clampedVolume;
    }
    setActiveSounds((prev) => {
      const active = prev.get(soundId);
      if (!active) return prev;
      const next = new Map(prev);
      next.set(soundId, { ...active, volume: clampedVolume });
      return next;
    });
  }, []);

  // 获取音量
  const getVolume = useCallback(
    (soundId: string) => {
      return activeSounds.get(soundId)?.volume ?? 0.5;
    },
    [activeSounds]
  );

  // 检查是否激活
  const isActive = useCallback(
    (soundId: string) => {
      return activeSounds.has(soundId);
    },
    [activeSounds]
  );

  // 停止所有
  const stopAll = useCallback(() => {
    audioRefs.current.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    audioRefs.current.clear();
    setActiveSounds(new Map());
  }, []);

  // 暂停所有
  const pauseAll = useCallback(() => {
    audioRefs.current.forEach((audio) => {
      audio.pause();
    });
  }, []);

  // 恢复所有
  const resumeAll = useCallback(() => {
    audioRefs.current.forEach((audio) => {
      audio.play().catch(console.error);
    });
  }, []);

  // 清理
  useEffect(() => {
    return () => {
      audioRefs.current.forEach((audio) => {
        audio.pause();
      });
    };
  }, []);

  return {
    activeSounds,
    toggleSound,
    setVolume,
    getVolume,
    isActive,
    stopAll,
    pauseAll,
    resumeAll,
    activeCount: activeSounds.size,
  };
}
