// 白噪音音源配置
export interface Sound {
  id: string;
  name: string;
  icon: string;
  audioUrl: string;
  color: string;
}

export const sounds: Sound[] = [
  {
    id: 'rain',
    name: '雨声',
    icon: '🌧️',
    audioUrl: '/audio/rain.mp3',
    color: '#4A90D9',
  },
  {
    id: 'thunder',
    name: '雷雨',
    icon: '⛈️',
    audioUrl: '/audio/thunder.mp3',
    color: '#5C6BC0',
  },
  {
    id: 'ocean',
    name: '海浪',
    icon: '🌊',
    audioUrl: '/audio/ocean.mp3',
    color: '#00ACC1',
  },
  {
    id: 'wind',
    name: '风声',
    icon: '🍃',
    audioUrl: '/audio/wind.mp3',
    color: '#66BB6A',
  },
  {
    id: 'fire',
    name: '篝火',
    icon: '🔥',
    audioUrl: '/audio/fire.mp3',
    color: '#FF7043',
  },
  {
    id: 'forest',
    name: '森林',
    icon: '🌲',
    audioUrl: '/audio/forest.mp3',
    color: '#43A047',
  },
  {
    id: 'stream',
    name: '溪流',
    icon: '💧',
    audioUrl: '/audio/stream.mp3',
    color: '#29B6F6',
  },
  {
    id: 'birds',
    name: '鸟鸣',
    icon: '🐦',
    audioUrl: '/audio/birds.mp3',
    color: '#FFCA28',
  },
  {
    id: 'night',
    name: '夜晚',
    icon: '🌙',
    audioUrl: '/audio/night.mp3',
    color: '#7E57C2',
  },
  {
    id: 'cafe',
    name: '咖啡馆',
    icon: '☕',
    audioUrl: '/audio/cafe.mp3',
    color: '#8D6E63',
  },
  {
    id: 'whitenoise',
    name: '白噪音',
    icon: '📻',
    audioUrl: '/audio/whitenoise.mp3',
    color: '#78909C',
  },
  {
    id: 'pinknoise',
    name: '粉噪音',
    icon: '🩷',
    audioUrl: '/audio/pinknoise.mp3',
    color: '#EC407A',
  },
];
