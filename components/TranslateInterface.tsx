
import React, { useState } from 'react';
import { translateText } from '../services/gemini';

const TranslateInterface: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [targetLang, setTargetLang] = useState<'badini' | 'english' | 'arabic'>('badini');
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim() || isTranslating) return;
    setIsTranslating(true);
    setResult('');
    setCopied(false);
    try {
      const translated = await translateText(text, targetLang);
      setResult(translated || '');
    } catch (error) {
      setResult('ببورە، خەلەتیەک رویدا. کێمەکێ دی دووبارە بکە.');
    } finally {
      setIsTranslating(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setText('');
    setResult('');
    setCopied(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full animate-fade-in pb-12 px-2">
      {/* Selection Tab */}
      <div className="bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800 flex shadow-lg">
        {[
          { id: 'badini', label: 'بادینی', icon: '☀️' },
          { id: 'english', label: 'English', icon: '🇬🇧' },
          { id: 'arabic', label: 'العربية', icon: '🇮🇶' }
        ].map((lang) => (
          <button
            key={lang.id}
            onClick={() => setTargetLang(lang.id as any)}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl transition-all duration-300 ${
              targetLang === lang.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
            }`}
          >
            <span className="text-lg mb-0.5">{lang.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-tight">{lang.label}</span>
          </button>
        ))}
      </div>

      {/* Input Section */}
      <div className="relative">
        <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 shadow-xl space-y-4 focus-within:border-blue-500/30 transition-colors">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 tracking-widest px-1">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
              نڤیسینا تە (INPUT)
            </span>
            {text && (
              <button onClick={clearAll} className="text-red-400/60 hover:text-red-400 transition-colors">پاککرن</button>
            )}
          </div>
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="لێرە بنڤیسە دا وەرگێڕانێ بۆ بکەم..."
            className="w-full bg-transparent border-none text-white text-lg placeholder:text-slate-700 focus:ring-0 focus:outline-none min-h-[160px] resize-none leading-relaxed rtl"
          />

          <button
            onClick={handleTranslate}
            disabled={!text.trim() || isTranslating}
            className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-3 shadow-xl ${
              !text.trim() || isTranslating
                ? 'bg-slate-800 text-slate-600'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20 active:scale-[0.98]'
            }`}
          >
            {isTranslating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span className="animate-pulse">وەرگێڕان دکەت...</span>
              </div>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                دەستپێبکە
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Section */}
      {(result || isTranslating) && (
        <div className={`bg-slate-900/80 border border-blue-500/10 rounded-[2rem] p-7 shadow-2xl space-y-4 animate-in slide-in-from-bottom-6 duration-500 ${isTranslating ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex justify-between items-center text-[10px] font-bold text-blue-400 tracking-widest px-1">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              بەرسفا وەرگێڕانێ (OUTPUT)
            </span>
            {result && (
              <button 
                onClick={copyToClipboard}
                className={`px-3 py-1.5 rounded-xl transition-all font-bold flex items-center gap-1.5 ${
                  copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-600/10 text-blue-300 hover:bg-blue-600/20'
                }`}
              >
                {copied ? 'کۆپی بوو!' : 'کۆپی بکە'}
              </button>
            )}
          </div>
          
          <div className={`w-full text-white/95 text-xl leading-relaxed ${targetLang === 'english' ? 'ltr text-left font-sans' : 'rtl text-right'}`}>
            <p className="whitespace-pre-wrap">{result}</p>
          </div>
        </div>
      )}
      
      {!result && !isTranslating && (
        <div className="bg-blue-600/5 border border-blue-500/10 rounded-2xl p-4 text-center">
          <p className="text-slate-500 text-[11px] leading-relaxed">
            وەرگێڕانا بیرهات تەنێ وەرگێڕانا پەیڤان نینە، بەڵکو ڕامان و مانا تێکستی دپارێزیت.
          </p>
        </div>
      )}
    </div>
  );
};

export default TranslateInterface;
