
export enum AppTab {
  CHAT = 'chat',
  TRANSLATE = 'translate',
  ABOUT = 'about'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// Interface for images generated via GenAI
export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}
