
import React, { useState } from 'react';
import { AppTab } from './types';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import TranslateInterface from './components/TranslateInterface';
import About from './components/About';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.CHAT);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600/40 overflow-hidden font-['IBM_Plex_Sans_Arabic']">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 container mx-auto px-4 py-4 max-w-5xl flex flex-col overflow-hidden">
        {activeTab === AppTab.CHAT && <ChatInterface />}
        {activeTab === AppTab.TRANSLATE && <TranslateInterface />}
        {activeTab === AppTab.ABOUT && <About />}
      </main>

      <footer className="py-4 text-center text-[10px] text-slate-600 border-t border-slate-900 bg-slate-950/50">
        © 2024 Berhat AI • تایبەت ب موبایل و سوشیال میدیایێ
      </footer>
    </div>
  );
};

export default App;
