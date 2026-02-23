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
    <div className="ribbon-toolbar">
      <div className="ribbon-tabs">
        <button
          className={`ribbon-tab ${activeMenu === 'ai' ? 'active' : ''}`}
          onClick={() => toggleMenu('ai')}
        >
          <span>✨ AI Prompt</span>
        </button>
        <button
          className={`ribbon-tab ${activeMenu === 'templates' ? 'active' : ''}`}
          onClick={() => toggleMenu('templates')}
        >
          <span>📝 Templates</span>
        </button>
        <button
          className={`ribbon-tab ${activeMenu === 'background' ? 'active' : ''}`}
          onClick={() => toggleMenu('background')}
        >
          <span>🎨 Fundo</span>
        </button>
        <button
          className={`ribbon-tab ${activeMenu === 'text' ? 'active' : ''} ${!selectedText ? 'disabled' : ''}`}
          onClick={() => selectedText && toggleMenu('text')}
          disabled={!selectedText}
          title={!selectedText ? "Selecione um texto para editar" : ""}
        >
          <span>Aa Editar Texto</span>
        </button>

        <div className="ribbon-divider"></div>

        <button
          className="ribbon-action primary"
          onClick={onAddText}
          disabled={isLoading}
        >
          <span className="icon">+</span>
          <span>Adicionar Texto</span>
        </button>

        <button
          className="ribbon-action"
          onClick={onDownload}
          disabled={isLoading}
        >
          <span className="icon">↓</span>
          <span>{isLoading ? 'Baixando...' : 'Baixar Imagem'}</span>
        </button>
      </div>

      {/* Floating Suspense Menus */}
      {activeMenu && (
        <div className="suspense-menu-container">
          <button className="suspense-close" onClick={() => setActiveMenu(null)}>×</button>

          {activeMenu === 'ai' && (
            <div className="suspense-content ai-menu">
              <h3>Gerar com AI</h3>
              <AIPrompt onGenerate={onGenerateFromPrompt} />
            </div>
          )}

          {activeMenu === 'templates' && (
            <div className="suspense-content template-menu">
              <h3>Escolher Template</h3>
              <TemplateDropdown
                templates={templates}
                selectedTemplate={selectedTemplate}
                onTemplateChange={onTemplateChange}
                isLoading={isLoading}
              />
            </div>
          )}

          {activeMenu === 'background' && (
            <div className="suspense-content background-menu">
              <h3>Cores & Degradê</h3>
              <BackgroundEditor
                backgroundColor={backgroundColor}
                gradientStart={gradientStart}
                gradientEnd={gradientEnd}
                onBackgroundColorChange={onBackgroundColorChange}
                onGradientStartChange={onGradientStartChange}
                onGradientEndChange={onGradientEndChange}
              />
            </div>
          )}

          {activeMenu === 'text' && selectedText && (
            <div className="suspense-content text-menu">
              <h3>Opções de Texto</h3>
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
