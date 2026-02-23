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
    <div className="sidebar-toolbar">
      <div className="sidebar-tabs">
        <button
          className={`sidebar-tab ${activeMenu === 'ai' ? 'active' : ''}`}
          onClick={() => toggleMenu('ai')}
          title="Gerar com AI"
        >
          <span className="icon">✨</span>
        </button>
        <button
          className={`sidebar-tab ${activeMenu === 'templates' ? 'active' : ''}`}
          onClick={() => toggleMenu('templates')}
          title="Templates"
        >
          <span className="icon">📝</span>
        </button>
        <button
          className={`sidebar-tab ${activeMenu === 'background' ? 'active' : ''}`}
          onClick={() => toggleMenu('background')}
          title="Fundo"
        >
          <span className="icon">🎨</span>
        </button>
        <button
          className={`sidebar-tab ${activeMenu === 'text' ? 'active' : ''} ${!selectedText ? 'disabled' : ''}`}
          onClick={() => selectedText && toggleMenu('text')}
          disabled={!selectedText}
          title={!selectedText ? "Selecione um texto para editar" : "Editar Texto"}
        >
          <span className="icon">Aa</span>
        </button>

        <div className="sidebar-divider"></div>

        <button
          className="sidebar-action primary"
          onClick={onAddText}
          disabled={isLoading}
          title="Adicionar Texto"
        >
          <span className="icon">+</span>
        </button>

        <button
          className="sidebar-action"
          onClick={onDownload}
          disabled={isLoading}
          title="Baixar Imagem"
        >
          <span className="icon">↓</span>
        </button>
      </div>

      {/* Floating Suspense Menus (Over Canvas) */}
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
