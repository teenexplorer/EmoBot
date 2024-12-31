import { emotions } from './emotions';

export interface EmotionResult {
  emotion: string;
  confidence: number;
  secondaryEmotions?: Array<{ emotion: string; confidence: number }>;
}

export function analyzeText(text: string): EmotionResult {
  if (!text?.trim()) {
    return { emotion: 'neutral', confidence: 0 };
  }

  // Improved text preprocessing
  const words = text.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);
  
  // Calculate weighted scores for each emotion
  const scores = emotions.map(emotion => {
    let totalScore = 0;
    let maxPhraseLength = 1;

    // Check for multi-word phrases first
    emotion.keywords.forEach(keyword => {
      const keywordParts = keyword.toLowerCase().split(' ');
      if (keywordParts.length > 1) {
        // Look for phrases in the text
        for (let i = 0; i <= words.length - keywordParts.length; i++) {
          const phrase = words.slice(i, i + keywordParts.length).join(' ');
          if (phrase === keyword.toLowerCase()) {
            totalScore += 2; // Give higher weight to phrase matches
            maxPhraseLength = Math.max(maxPhraseLength, keywordParts.length);
          }
        }
      }
    });

    // Then check for single word matches
    words.forEach(word => {
      emotion.keywords.forEach(keyword => {
        const keywordLower = keyword.toLowerCase();
        if (keywordLower.length <= word.length + 2) { // Allow small variations
          if (
            word === keywordLower || 
            word.includes(keywordLower) || 
            keywordLower.includes(word)
          ) {
            totalScore += word === keywordLower ? 1.5 : 0.8;
          }
        }
      });
    });

    // Apply emotion weight and normalize score
    const normalizedScore = (totalScore / Math.max(words.length / maxPhraseLength, 1)) * (emotion.weight || 1);

    return {
      emotion: emotion.name,
      score: normalizedScore,
      combinations: emotion.combinations || []
    };
  });

  // Sort scores by confidence
  const sortedScores = scores
    .filter(score => score.score > 0)
    .sort((a, b) => b.score - a.score);

  if (sortedScores.length === 0) {
    return { emotion: 'neutral', confidence: 0 };
  }

  const primaryEmotion = sortedScores[0];
  const maxPossibleScore = 3; // Based on our scoring system
  const normalizedConfidence = Math.min(primaryEmotion.score / maxPossibleScore, 1);

  // Check for emotion combinations
  const secondaryEmotions = sortedScores
    .slice(1)
    .filter(score => {
      const isSignificant = score.score > primaryEmotion.score * 0.4;
      const isPossibleCombination = 
        primaryEmotion.combinations?.includes(score.emotion) ||
        score.combinations?.includes(primaryEmotion.emotion);
      return isSignificant && isPossibleCombination;
    })
    .map(score => ({
      emotion: score.emotion,
      confidence: Math.min(score.score / maxPossibleScore, 1)
    }));

  return {
    emotion: primaryEmotion.emotion,
    confidence: normalizedConfidence,
    ...(secondaryEmotions.length > 0 && { secondaryEmotions })
  };
}