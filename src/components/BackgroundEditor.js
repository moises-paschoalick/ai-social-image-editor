import React from 'react';

const BackgroundEditor = ({ 
  backgroundColor, 
  gradientStart, 
  gradientEnd, 
  onBackgroundColorChange,
  onGradientStartChange,
  onGradientEndChange
}) => {
  return (
    <div className="background-editor">
      <h3>Configurações do Fundo</h3>
      <div className="editor-controls">
        <div className="control-group">
          <label>Cor de Fundo:</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => onBackgroundColorChange(e.target.value)}
          />
        </div>
        <div className="control-group">
          <label>Cor Inicial do Gradiente:</label>
          <input
            type="color"
            value={gradientStart}
            onChange={(e) => onGradientStartChange(e.target.value)}
          />
        </div>
        <div className="control-group">
          <label>Cor Final do Gradiente:</label>
          <input
            type="color"
            value={gradientEnd}
            onChange={(e) => onGradientEndChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundEditor; 