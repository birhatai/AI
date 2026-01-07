
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

// Added missing interface for image generation history to fix import error in Visualizer
export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}
