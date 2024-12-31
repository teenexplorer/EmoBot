import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { analyzeText } from './utils/textAnalysis';
import EmotionDisplay from './components/EmotionDisplay';

export default function App() {
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState<{ emotion: string; confidence: number } | null>(null);

  const handleAnalyze = () => {
    const result = analyzeText(text);
    setEmotion(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Emotion Detection AI
          </h1>
          <p className="text-gray-600">
            Write a few lines and I'll detect the emotions in your text
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <textarea
            className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200"
            onClick={handleAnalyze}
            disabled={!text.trim()}
          >
            Analyze Emotions
          </button>
        </div>

        {emotion && <EmotionDisplay emotion={emotion.emotion} confidence={emotion.confidence} />}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            This AI uses natural language processing to detect emotions in your text.
            Try writing about how you feel!
          </p>
        </div>
      </div>
    </div>
  );
}