import { WordTokenizer, PorterStemmer } from 'natural';

interface EmotionKeywords {
  [key: string]: string[];
}

const emotionKeywords: EmotionKeywords = {
  happy: ['happy', 'joy', 'delight', 'excited', 'wonderful', 'smile', 'laugh', 'cheerful', 'blessed', 'great'],
  sad: ['sad', 'sorrow', 'grief', 'depressed', 'unhappy', 'cry', 'tears', 'heartbroken', 'miserable', 'down'],
  angry: ['angry', 'rage', 'fury', 'mad', 'hate', 'frustrated', 'annoyed', 'irritated', 'furious', 'outraged'],
  love: ['love', 'adore', 'cherish', 'passion', 'romantic', 'heart', 'affection', 'beloved', 'darling', 'soulmate'],
  fear: ['fear', 'scared', 'terrified', 'anxious', 'worried', 'dread', 'panic', 'frightened', 'horror', 'afraid'],
  disgust: ['disgust', 'gross', 'repulsive', 'nasty', 'yuck', 'revolting', 'distaste', 'sick', 'nauseous', 'ugh'],
  surprise: ['surprise', 'shock', 'amazed', 'astonished', 'wow', 'unexpected', 'startled', 'stunned', 'speechless', 'incredible']
};

const tokenizer = new WordTokenizer();

export function detectEmotion(text: string): { emotion: string; confidence: number } {
  const tokens = tokenizer.tokenize(text.toLowerCase());
  if (!tokens) return { emotion: 'neutral', confidence: 0 };

  const stemmedTokens = tokens.map(token => PorterStemmer.stem(token));
  
  const emotionScores: { [key: string]: number } = {};
  
  Object.keys(emotionKeywords).forEach(emotion => {
    const stemmedKeywords = emotionKeywords[emotion].map(keyword => 
      PorterStemmer.stem(keyword.toLowerCase())
    );
    
    let score = 0;
    stemmedTokens.forEach(token => {
      if (stemmedKeywords.includes(token)) {
        score += 1;
      }
    });
    
    emotionScores[emotion] = score / tokens.length;
  });

  const dominantEmotion = Object.entries(emotionScores).reduce((a, b) => 
    a[1] > b[1] ? a : b
  );

  return {
    emotion: dominantEmotion[0],
    confidence: dominantEmotion[1]
  };
}