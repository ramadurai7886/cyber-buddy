import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  User,
  ShieldAlert,
  ChevronDown,
} from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';
import { ChatMessage } from '../../types/chatbot';
import { ChatbotService } from '../../services/chatbotService';
import { StorageService } from '../../services/storageService';

export const Chatbot: React.FC = () => {
  const { t, language } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return StorageService.getItem<ChatMessage[]>(StorageService.KEYS.CHAT_HISTORY, [
      {
        id: 'msg_welcome',
        sender: 'assistant',
        text: t.chatbot.welcomeMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'help',
      },
    ]);
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update welcome message if language changes and only 1 message exists
  useEffect(() => {
    setMessages(prev => {
      if (prev.length <= 1) {
        return [
          {
            id: 'msg_welcome',
            sender: 'assistant',
            text: t.chatbot.welcomeMsg,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            category: 'help',
          },
        ];
      }
      return prev;
    });
  }, [language, t.chatbot.welcomeMsg]);

  // Persist messages
  useEffect(() => {
    StorageService.setItem(StorageService.KEYS.CHAT_HISTORY, messages);
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 150);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || inputValue).trim();
    if (!textToSend || isTyping) return;

    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await ChatbotService.processMessage(
        textToSend,
        language,
        location.pathname
      );

      const botMessage: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: response.category,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'assistant',
        text: 'Assistant is temporarily unavailable. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'help',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    const freshWelcome: ChatMessage = {
      id: `msg_welcome_${Date.now()}`,
      sender: 'assistant',
      text: t.chatbot.welcomeMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'help',
    };
    setMessages([freshWelcome]);
  };

  const suggestionPills = [
    { key: 'howToUse', text: t.chatbot.suggestions.howToUse },
    { key: 'explainPage', text: t.chatbot.suggestions.explainPage },
    { key: 'whatCanIDo', text: t.chatbot.suggestions.whatCanIDo },
    { key: 'changeLanguage', text: t.chatbot.suggestions.changeLanguage },
    { key: 'changeTheme', text: t.chatbot.suggestions.changeTheme },
    { key: 'scanCode', text: t.chatbot.suggestions.scanCode },
    { key: 'howToLogin', text: t.chatbot.suggestions.howToLogin },
    { key: 'createAccount', text: t.chatbot.suggestions.createAccount },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window Panel */}
      {isOpen && (
        <div
          className="pointer-events-auto mb-3 w-[92vw] sm:w-[420px] h-[560px] max-h-[82vh] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          role="dialog"
          aria-label="CyberBuddy AI Copilot"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyber-500/20 text-cyber-500 border border-cyber-500/40 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {t.chatbot.title}
                  </h3>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {t.chatbot.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={t.chatbot.clearChat}
                aria-label={t.chatbot.clearChat}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-cyber-500/20 text-cyber-500 border border-cyber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-cyber-500 text-slate-950 font-medium rounded-tr-none shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-slate-800/70' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs">
                <div className="w-6 h-6 rounded-full bg-cyber-500/20 text-cyber-500 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl flex items-center gap-1.5 border border-slate-200 dark:border-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-500 animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-500 animate-bounce [animation-delay:0.3s]" />
                  <span className="text-[11px] ml-1">{t.chatbot.typing}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions Carousel */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/40">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
              {t.chatbot.suggestionsTitle}
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {suggestionPills.map(s => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => handleSend(s.text)}
                  disabled={isTyping}
                  className="shrink-0 px-2.5 py-1 text-[11px] rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-cyber-500 hover:text-cyber-600 dark:hover:text-cyber-400 transition-colors disabled:opacity-50"
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chatbot.inputPlaceholder}
                disabled={isTyping}
                className="flex-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-cyber-500/30 focus:border-cyber-500"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping}
                className="p-2 rounded-xl bg-cyber-500 hover:bg-cyber-600 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                aria-label={t.chatbot.send}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto relative group flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-cyber-500 to-brand-600 text-slate-950 font-semibold shadow-lg hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyber-400 active:scale-95 transition-all duration-200"
        aria-label="Open CyberBuddy Copilot"
      >
        <div className="relative">
          <Bot className="w-5 h-5 stroke-[2.2]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 animate-pulse" />
        </div>
        <span className="text-xs font-bold tracking-tight hidden sm:inline">
          {isOpen ? t.common.close : 'AI Copilot'}
        </span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <Sparkles className="w-3.5 h-3.5 text-slate-950 fill-slate-950/20 animate-spin [animation-duration:6s]" />
        )}
      </button>
    </div>
  );
};
