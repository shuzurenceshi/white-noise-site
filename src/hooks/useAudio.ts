'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface UseAudioOptions {
  initialVolume?: number;
  loop?: boolean;
}

export function useAudio(
  audioUrl: string,
  options: UseAudioOptions = {}
) {
  const { initialVolume = 0.5, loop = true } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(initialVolume);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.loop = loop;
      audioRef.current.volume = volume;
      audioRef.current.preload = 'auto';

      audioRef.current.addEventListener('canplaythrough', () => {
        setIsLoaded(true);
      });

      audioRef.current.addEventListener('ended', () => {
        if (!loop) setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl, loop]);

  const play = useCallback(async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('播放失败:', error);
      }
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const changeVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      audioRef.current.volume = clampedVolume;
      setVolume(clampedVolume);
    }
  }, []);

  return {
    isPlaying,
    isLoaded,
    volume,
    play,
    pause,
    toggle,
    changeVolume,
    audioRef,
  };
}
