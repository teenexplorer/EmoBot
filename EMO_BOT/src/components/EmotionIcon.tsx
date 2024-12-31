import React from 'react';
import { 
  Heart, 
  Frown, 
  Smile, 
  Angry, 
  Skull, 
  ThumbsDown,
  AlertCircle,
  HelpCircle,
  Undo2,
  Trophy,
  HeartHandshake,
  Sparkles,
  LucideIcon
} from 'lucide-react';

interface EmotionIconProps {
  emotion: string;
  className?: string;
}

const emotionConfigs: Record<string, { icon: LucideIcon; color: string }> = {
  love: { icon: Heart, color: 'text-pink-500' },
  sad: { icon: Frown, color: 'text-blue-500' },
  happy: { icon: Smile, color: 'text-yellow-500' },
  angry: { icon: Angry, color: 'text-red-500' },
  disgust: { icon: ThumbsDown, color: 'text-green-500' },
  fear: { icon: Skull, color: 'text-gray-500' },
  confusion: { icon: HelpCircle, color: 'text-purple-500' },
  regret: { icon: Undo2, color: 'text-indigo-500' },
  proud: { icon: Trophy, color: 'text-amber-500' },
  grateful: { icon: HeartHandshake, color: 'text-emerald-500' },
  hope: { icon: Sparkles, color: 'text-cyan-500' }
};

export default function EmotionIcon({ emotion, className = '' }: EmotionIconProps) {
  const config = emotionConfigs[emotion] || emotionConfigs.happy;
  const IconComponent = config.icon;
  
  return (
    <IconComponent className={`w-8 h-8 ${config.color} ${className}`} />
  );
}