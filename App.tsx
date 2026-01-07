
import React, { useState } from 'react';
import { AppTab } from './types';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import TranslateInterface from './components/TranslateInterface';
import About from './components/About';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.CHAT);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600/40 font-['IBM_Plex_Sans_Arabic'] overflow-x-hidden">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 container mx-auto px-4 py-4 max-w-5xl flex flex-col">
        {activeTab === AppTab.CHAT && <ChatInterface />}
        {activeTab === AppTab.TRANSLATE && <TranslateInterface />}
        {activeTab === AppTab.ABOUT && <About />}
      </main>

      <footer className="py-6 text-center text-[10px] text-slate-600 border-t border-slate-900 bg-slate-950/50">
        <p className="font-bold tracking-widest uppercase mb-1">Berhat AI System</p>
        <p>© 2024 هەمی ماف پاراستینە بۆ بیرهاتی</p>
      </footer>
    </div>
  );
};

export default App;
