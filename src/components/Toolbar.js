import React from 'react';
import TemplateDropdown from './TemplateDropdown';
import BackgroundEditor from './BackgroundEditor';
import TextEditor from './TextEditor';

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
  onTextColorChange
}) => {
  return (
    <div className="toolbar-container">
      <div className="toolbar-actions">
        <button 
          className="toolbar-button toolbar-button-primary"
          onClick={onAddText}
          disabled={isLoading}
        >
          <span className="toolbar-icon">+</span>
          <span className="toolbar-label">Adicionar Texto</span>
        </button>
        
        <button 
          className="toolbar-button"
          onClick={onDownload}
          disabled={isLoading}
        >
          <span className="toolbar-icon">↓</span>
          <span className="toolbar-label">
            {isLoading ? 'Baixando...' : 'Baixar'}
          </span>
        </button>
      </div>

      <div className="toolbar-sections">
        <div className="toolbar-section">
          <h3>Templates</h3>
          <TemplateDropdown
            templates={templates}
            selectedTemplate={selectedTemplate}
            onTemplateChange={onTemplateChange}
            isLoading={isLoading}
          />
        </div>

        <div className="toolbar-section">
          <h3>Fundo</h3>
          <BackgroundEditor
            backgroundColor={backgroundColor}
            gradientStart={gradientStart}
            gradientEnd={gradientEnd}
            onBackgroundColorChange={onBackgroundColorChange}
            onGradientStartChange={onGradientStartChange}
            onGradientEndChange={onGradientEndChange}
          />
        </div>

        {selectedText && (
          <div className="toolbar-section">
            <h3>Editar Texto</h3>
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
    </div>
  );
};

export default Toolbar; 