export interface Emotion {
  name: string;
  keywords: string[];
  weight: number; // Higher weight for stronger emotions
  combinations?: string[]; // Related emotions that commonly combine
}

export const emotions: Emotion[] = [
  {
    name: 'happy',
    keywords: ['happy', 'joy', 'delight', 'excited', 'wonderful', 'smile', 'laugh', 'cheerful', 'blessed', 'great', 'pleased', 'content', 'satisfied', 'blissful', 'ecstatic', 'thrilled', 'overjoyed', 'elated', 'jubilant', 'radiant'],
    weight: 1.0,
    combinations: ['proud', 'grateful', 'love']
  },
  {
    name: 'sad',
    keywords: ['sad', 'sorrow', 'grief', 'depressed', 'unhappy', 'cry', 'tears', 'heartbroken', 'miserable', 'down', 'gloomy', 'melancholy', 'hopeless', 'despair', 'devastated', 'lonely', 'hurt', 'anguish', 'blue', 'weeping', 'mourn', 'loss'],
    weight: 1.2,
    combinations: ['regret', 'love']
  },
  {
    name: 'angry',
    keywords: ['angry', 'rage', 'fury', 'mad', 'hate', 'frustrated', 'annoyed', 'irritated', 'furious', 'outraged', 'hostile', 'bitter', 'enraged', 'livid', 'irate', 'seething', 'vexed', 'indignant', 'resentful', 'fierce'],
    weight: 1.3,
    combinations: ['regret', 'disgust']
  },
  {
    name: 'love',
    keywords: ['love', 'adore', 'cherish', 'passion', 'romantic', 'heart', 'affection', 'beloved', 'darling', 'soulmate', 'devoted', 'fond', 'intimate', 'tender', 'warmth', 'caring', 'attachment', 'devoted', 'enamored', 'infatuated'],
    weight: 1.2,
    combinations: ['happy', 'sad']
  },
  {
    name: 'regret',
    keywords: ['regret', 'sorry', 'apologetic', 'remorse', 'guilt', 'ashamed', 'mistake', 'fault', 'apology', 'conscience', 'repentant', 'remorseful', 'contrite', 'penitent', 'rueful', 'apologize', 'wrong', 'blunder', 'error', 'disappointed', 'forgive'],
    weight: 1.1,
    combinations: ['sad', 'angry']
  },
  {
    name: 'proud',
    keywords: ['proud', 'accomplished', 'achievement', 'success', 'triumph', 'victory', 'honored', 'satisfied', 'fulfilled', 'confident', 'dignity', 'self-respect', 'gratified', 'successful', 'achieving', 'accomplished', 'honored', 'dignified', 'prestigious', 'remarkable'],
    weight: 1.0,
    combinations: ['happy', 'grateful']
  },
  {
    name: 'confusion',
    keywords: ['confused', 'puzzled', 'perplexed', 'bewildered', 'unsure', 'uncertain', 'lost', 'baffled', 'mystified', 'disoriented', 'unclear', 'doubtful', 'ambiguous', 'questioning', 'wondering', 'hesitant', 'indecisive', 'muddled', 'confounding', 'dazed'],
    weight: 0.9
  },
  {
    name: 'fear',
    keywords: ['fear', 'scared', 'terrified', 'anxious', 'worried', 'dread', 'panic', 'frightened', 'horror', 'afraid', 'alarmed', 'nervous', 'timid', 'uneasy', 'phobia', 'apprehensive', 'paranoid', 'threatened', 'trembling', 'petrified'],
    weight: 1.2
  },
  {
    name: 'grateful',
    keywords: ['grateful', 'thankful', 'appreciative', 'blessed', 'appreciation', 'gratitude', 'indebted', 'recognized', 'acknowledged', 'valued', 'obliged', 'pleased', 'touched', 'moved', 'overwhelmed', 'humbled', 'honored', 'fortunate', 'blessed', 'favored'],
    weight: 0.9,
    combinations: ['happy', 'love']
  }
];