'use client';

interface SoundCardProps {
  sound: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
  isActive: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (volume: number) => void;
}

export function SoundCard({
  sound,
  isActive,
  volume,
  onToggle,
  onVolumeChange,
}: SoundCardProps) {
  return (
    <div
      className={`relative flex flex-col items-center p-4 rounded-2xl transition-all duration-300 cursor-pointer select-none
        ${
          isActive
            ? 'bg-gradient-to-br from-white/20 to-white/10 shadow-lg shadow-white/10 scale-105'
            : 'bg-white/5 hover:bg-white/10'
        }
      `}
      style={{
        borderColor: isActive ? sound.color : 'transparent',
        borderWidth: isActive ? 2 : 0,
      }}
      onClick={onToggle}
    >
      {/* 图标 */}
      <div
        className={`text-4xl mb-2 transition-all duration-300 ${
          isActive ? 'scale-125 animate-bounce' : ''
        }`}
      >
        {sound.icon}
      </div>

      {/* 名称 */}
      <span className="text-sm text-white/80 font-medium">{sound.name}</span>

      {/* 音量滑块 - 仅在激活时显示 */}
      {isActive && (
        <div
          className="w-full mt-3 px-1"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => onVolumeChange(Number(e.target.value) / 100)}
            className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:hover:scale-125
            "
            style={{
              background: `linear-gradient(to right, ${sound.color} ${
                volume * 100
              }%, rgba(255,255,255,0.2) ${volume * 100}%)`,
            }}
          />
        </div>
      )}

      {/* 激活指示器 */}
      {isActive && (
        <div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse"
          style={{ backgroundColor: sound.color }}
        />
      )}
    </div>
  );
}
