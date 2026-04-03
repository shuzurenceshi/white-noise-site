'use client';

import { useState, useRef, useCallback } from 'react';
import { AudioSynthesizer, syntheticSounds } from '@/lib/audioSynth';
import { Sound } from '@/lib/sounds';

interface ActiveSynth {
  id: string;
  type: 'white' | 'pink' | 'brown';
  volume: number;
}

export function useSynthMixer() {
  const [activeSynths, setActiveSynths] = useState<Map<string, ActiveSynth>>(
    () => new Map()
  );
  const synthRef = useRef<AudioSynthesizer | null>(null);

  const getSynth = useCallback(() => {
    if (!synthRef.current) {
      synthRef.current = new AudioSynthesizer();
    }
    return synthRef.current;
  }, []);

  const toggleSynth = useCallback(
    (id: string, type: 'white' | 'pink' | 'brown') => {
      const synth = getSynth();

      if (activeSynths.has(id)) {
        synth.stop(id);
        setActiveSynths((prev) => {
          const next = new Map(prev);
          next.delete(id);
          return next;
        });
      } else {
        switch (type) {
          case 'white':
            synth.createWhiteNoise(id);
            break;
          case 'pink':
            synth.createPinkNoise(id);
            break;
          case 'brown':
            synth.createBrownNoise(id);
            break;
        }
        synth.setVolume(id, 0.5);
        setActiveSynths((prev) => {
          const next = new Map(prev);
          next.set(id, { id, type, volume: 0.5 });
          return next;
        });
      }
    },
    [activeSynths, getSynth]
  );

  const setVolume = useCallback(
    (id: string, volume: number) => {
      const synth = getSynth();
      synth.setVolume(id, volume);
      setActiveSynths((prev) => {
        const active = prev.get(id);
        if (!active) return prev;
        const next = new Map(prev);
        next.set(id, { ...active, volume });
        return next;
      });
    },
    [getSynth]
  );

  const getVolume = useCallback(
    (id: string) => activeSynths.get(id)?.volume ?? 0.5,
    [activeSynths]
  );

  const isActive = useCallback(
    (id: string) => activeSynths.has(id),
    [activeSynths]
  );

  const stopAll = useCallback(() => {
    const synth = getSynth();
    synth.stopAll();
    setActiveSynths(new Map());
  }, [getSynth]);

  return {
    activeSynths,
    toggleSynth,
    setVolume,
    getVolume,
    isActive,
    stopAll,
    activeCount: activeSynths.size,
  };
}
