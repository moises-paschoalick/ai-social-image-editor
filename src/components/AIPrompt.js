import React, { useState } from 'react';

const AIPrompt = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    onGenerate(prompt);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="ai-prompt-input" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Prompt de AI</label>
        <textarea
          id="ai-prompt-input"
          className="w-full min-h-[120px] bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="ex: 'Criar um post para lançamento de novo produto'"
        />
      </div>
      <button
        onClick={handleGenerate}
        disabled={!prompt.trim()}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium py-3 rounded-lg transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-95 flex items-center justify-center gap-2"
      >
        <span>✨</span> Gerar Texto
      </button>
    </div>
  );
};

export default AIPrompt;
