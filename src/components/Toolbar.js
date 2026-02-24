import React, { useState } from 'react';
import TemplateDropdown from './TemplateDropdown';
import BackgroundEditor from './BackgroundEditor';
import TextEditor from './TextEditor';
import AIPrompt from './AIPrompt';

const Toolbar = ({
  onAddText,
  onDownload,
  isLoading,
  templates,
  selectedTemplate,
  onTemplateChange,
  backgroundColor,
  gradientStart,
  gradientEnd,
  onBackgroundColorChange,
  onGradientStartChange,
  onGradientEndChange,
  selectedText,
  onTextChange,
  onFontSizeChange,
  onFontFamilyChange,
  onTextColorChange,
  onGenerateFromPrompt,
}) => {
  const [activeMenu, setActiveMenu] = useState(null); // 'ai', 'templates', 'background', 'text'

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <div className="flex h-full z-40 shadow-2xl shrink-0">
      {/* Vertical Icon Sidebar */}
      <div className="w-20 bg-darkCard border-r border-darkBorder flex flex-col items-center py-6 gap-6 z-40 shrink-0">
        <button
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all ${activeMenu === 'ai' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
          onClick={() => toggleMenu('ai')}
          title="Gerar com AI"
        >
          ✨
        </button>
        <button
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all ${activeMenu === 'templates' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
          onClick={() => toggleMenu('templates')}
          title="Templates"
        >
          📝
        </button>
        <button
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all ${activeMenu === 'background' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
          onClick={() => toggleMenu('background')}
          title="Fundo"
        >
          🎨
        </button>
        <button
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all ${!selectedText ? 'opacity-30 cursor-not-allowed grayscale text-slate-500' : activeMenu === 'text' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
          onClick={() => selectedText && toggleMenu('text')}
          disabled={!selectedText}
          title={!selectedText ? "Selecione um texto para editar" : "Editar Texto"}
        >
          Aa
        </button>

        <div className="w-8 h-px bg-darkBorder my-2"></div>

        <button
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-slate-700 text-white hover:bg-slate-600 transition-colors border border-slate-600 shadow disabled:opacity-50"
          onClick={onAddText}
          disabled={isLoading}
          title="Adicionar Texto"
        >
          +
        </button>

        <div className="flex-1"></div>

        <button
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors border border-indigo-500 shadow-lg shadow-indigo-500/20 disabled:opacity-50"
          onClick={onDownload}
          disabled={isLoading}
          title="Baixar Imagem"
        >
          ↓
        </button>
      </div>

      {/* Expanded Horizontal Side Panel */}
      {activeMenu && (
        <div className="w-80 bg-slate-900 border-r border-darkBorder flex flex-col p-6 overflow-y-auto shrink-0 shadow-lg transition-transform text-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">
              {activeMenu === 'ai' && 'Gerar com AI'}
              {activeMenu === 'templates' && 'Escolher Template'}
              {activeMenu === 'background' && 'Cores & Degradê'}
              {activeMenu === 'text' && 'Opções de Texto'}
            </h3>
            <button
              className="text-slate-400 hover:text-white hover:bg-slate-800 rounded p-1"
              onClick={() => setActiveMenu(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div className="flex-1">
            {activeMenu === 'ai' && (
              <AIPrompt onGenerate={onGenerateFromPrompt} />
            )}

            {activeMenu === 'templates' && (
              <TemplateDropdown
                templates={templates}
                selectedTemplate={selectedTemplate}
                onTemplateChange={onTemplateChange}
                isLoading={isLoading}
              />
            )}

            {activeMenu === 'background' && (
              <BackgroundEditor
                backgroundColor={backgroundColor}
                gradientStart={gradientStart}
                gradientEnd={gradientEnd}
                onBackgroundColorChange={onBackgroundColorChange}
                onGradientStartChange={onGradientStartChange}
                onGradientEndChange={onGradientEndChange}
              />
            )}

            {activeMenu === 'text' && selectedText && (
              <TextEditor
                text={selectedText.text}
                onTextChange={onTextChange}
                fontSize={selectedText.fontSize}
                onFontSizeChange={onFontSizeChange}
                fontFamily={selectedText.fontFamily}
                onFontFamilyChange={onFontFamilyChange}
                textColor={selectedText.textColor}
                onTextColorChange={onTextColorChange}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
