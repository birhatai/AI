
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { generateResponse } from '../services/gemini';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'سلاڤ! ئەز بیرهاتم، هاریکارێ تە یێ ژیر بۆ هەمی پرسیارێن تە یێن دەربارەی موبایلان و سوشیال میدیایێ. پرسیارا تە چیە؟',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));
      
      const response = await generateResponse(input, history);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || 'ببورە، من نەشیا بەرسفێ بدەم.',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: 'err',
        role: 'assistant',
        content: 'ببورە، خەلەتیەک رویدا. کێمەکێ دی دووبارە بکە.',
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-900/40 rounded-[2.5rem] border border-slate-800/60 overflow-hidden shadow-2xl relative">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[92%] sm:max-w-[80%] rounded-2xl px-5 py-3 shadow-md text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-100 border border-slate-700/50 rounded-tl-none'
            } rtl text-right`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
              <div className="text-[9px] opacity-40 mt-1.5 flex justify-between items-center gap-2">
                <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                {msg.role === 'assistant' && <span className="text-cyan-400 font-bold tracking-wider">بیرهات</span>}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700/50 rounded-2xl rounded-tl-none px-5 py-3 shadow-sm">
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-950/80 backdrop-blur-md border-t border-slate-800/50">
        <div className="flex gap-2 items-end max-w-4xl mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 768) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="پرسیار بکە دەربارەی موبایلان..."
            className="flex-1 bg-slate-900/80 text-slate-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-blue-600/50 border border-slate-800 resize-none max-h-32 text-sm rtl shadow-inner"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-500 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-blue-900/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
