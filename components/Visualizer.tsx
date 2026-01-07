
import React, { useState } from 'react';
import { generateKurdishArt } from '../services/gemini';
import { GeneratedImage } from '../types';

const Visualizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<GeneratedImage[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const url = await generateKurdishArt(prompt);
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url,
        prompt,
        timestamp: Date.now()
      };
      setHistory(prev => [newImage, ...prev]);
      setPrompt('');
    } catch (error) {
      console.error(error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <h2 className="text-xl font-bold mb-2">Kurdish Art Visualizer</h2>
        <p className="text-slate-400 text-sm mb-6">Create stunning visualizations of Kurdish landscapes, culture, and concepts.</p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A digital painting of sunset over Amedi mountains..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Visualize
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((img) => (
          <div key={img.id} className="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
            <div className="aspect-square bg-slate-800 relative">
              <img src={img.url} alt={img.prompt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <p className="text-white text-xs font-medium line-clamp-2">{img.prompt}</p>
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = img.url;
                    link.download = `soz-art-${img.id}.png`;
                    link.click();
                  }}
                  className="mt-2 text-[10px] bg-white/20 hover:bg-white/30 backdrop-blur-md text-white py-1 px-2 rounded w-fit"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
        {history.length === 0 && !isGenerating && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl">
            <div className="text-slate-600 mb-2">No art generated yet</div>
            <p className="text-slate-500 text-sm">Enter a prompt above to start creating.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Visualizer;
