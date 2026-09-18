export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: 'navigation' | 'security' | 'help' | 'system';
}

export interface ChatSuggestion {
  id: string;
  label: string;
  prompt: string;
}
