import React from 'react';
import EmotionIcon from './EmotionIcon';

interface EmotionDisplayProps {
  emotion: string;
  confidence: number;
  secondaryEmotions?: Array<{ emotion: string; confidence: number }>;
}

const backgroundColors: Record<string, string> = {
  love: 'bg-pink-100 border-pink-200',
  sad: 'bg-blue-100 border-blue-200',
  happy: 'bg-yellow-100 border-yellow-200',
  angry: 'bg-red-100 border-red-200',
  disgust: 'bg-green-100 border-green-200',
  fear: 'bg-gray-100 border-gray-200',
  confusion: 'bg-purple-100 border-purple-200',
  regret: 'bg-indigo-100 border-indigo-200',
  proud: 'bg-amber-100 border-amber-200',
  grateful: 'bg-emerald-100 border-emerald-200',
  hope: 'bg-cyan-100 border-cyan-200'
};

export default function EmotionDisplay({ emotion, confidence, secondaryEmotions }: EmotionDisplayProps) {
  const bgColor = backgroundColors[emotion] || 'bg-gray-50 border-gray-100';

  return (
    <div className={`p-6 rounded-lg border-2 ${bgColor} transition-all duration-300`}>
      <div className="flex items-center justify-center mb-4">
        <EmotionIcon emotion={emotion} />
      </div>
      <h3 className="text-xl font-semibold text-center capitalize mb-2">
        {emotion}
      </h3>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${confidence * 100}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 text-center mb-4">
        Primary Confidence: {(confidence * 100).toFixed(1)}%
      </p>

      {secondaryEmotions && secondaryEmotions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Secondary Emotions:</h4>
          <div className="space-y-2">
            {secondaryEmotions.map((emotion, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <EmotionIcon emotion={emotion.emotion} className="w-4 h-4 mr-2" />
                  <span className="text-sm capitalize">{emotion.emotion}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {(emotion.confidence * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}