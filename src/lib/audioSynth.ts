// Web Audio API 合成白噪音
// 无需外部音频文件，直接在浏览器生成

export class AudioSynthesizer {
  private audioContext: AudioContext | null = null;
  private gainNodes: Map<string, GainNode> = new Map();
  private sources: Map<string, AudioNode> = new Map();

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  // 白噪音
  createWhiteNoise(id: string): { node: AudioNode; gain: GainNode } {
    const ctx = this.getContext();
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const gain = ctx.createGain();
    gain.gain.value = 0;

    source.connect(gain);
    gain.connect(ctx.destination);
    source.start();

    this.sources.set(id, source);
    this.gainNodes.set(id, gain);

    return { node: source, gain };
  }

  // 粉噪音 (1/f 噪音)
  createPinkNoise(id: string): { node: AudioNode; gain: GainNode } {
    const ctx = this.getContext();
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const gain = ctx.createGain();
    gain.gain.value = 0;

    source.connect(gain);
    gain.connect(ctx.destination);
    source.start();

    this.sources.set(id, source);
    this.gainNodes.set(id, gain);

    return { node: source, gain };
  }

  // 棕噪音 (红噪音)
  createBrownNoise(id: string): { node: AudioNode; gain: GainNode } {
    const ctx = this.getContext();
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const gain = ctx.createGain();
    gain.gain.value = 0;

    source.connect(gain);
    gain.connect(ctx.destination);
    source.start();

    this.sources.set(id, source);
    this.gainNodes.set(id, gain);

    return { node: source, gain };
  }

  setVolume(id: string, volume: number) {
    const gain = this.gainNodes.get(id);
    if (gain) {
      const ctx = this.getContext();
      gain.gain.linearRampToValueAtTime(volume * 0.3, ctx.currentTime + 0.1);
    }
  }

  stop(id: string) {
    const source = this.sources.get(id);
    if (source) {
      try {
        (source as AudioBufferSourceNode).stop();
      } catch {}
      this.sources.delete(id);
      this.gainNodes.delete(id);
    }
  }

  stopAll() {
    this.sources.forEach((_, id) => this.stop(id));
  }
}

// 合成音频配置
export const syntheticSounds = [
  { id: 'whitenoise', name: '白噪音', icon: '📻', color: '#78909C', type: 'white' },
  { id: 'pinknoise', name: '粉噪音', icon: '🩷', color: '#EC407A', type: 'pink' },
  { id: 'brownnoise', name: '棕噪音', icon: '🟤', color: '#8D6E63', type: 'brown' },
] as const;
