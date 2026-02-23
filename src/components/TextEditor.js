import React from 'react';

const FONT_FAMILIES = [
  'Arial',
  'Helvetica',
  'Roboto',
  'Open Sans',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  'Impact'
];

const TextEditor = ({ text, onTextChange, fontSize, onFontSizeChange, fontFamily, onFontFamilyChange, textColor, onTextColorChange }) => {
  return (
    <div className="text-editor">
      <h3>Editor de Texto</h3>
      <div className="editor-controls">
        <div className="control-group">
          <label htmlFor="text-input">Texto:</label>
          <input
            type="text"
            id="text-input"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Digite seu texto aqui"
          />
        </div>

        <div className="control-group">
          <label htmlFor="font-size">Tamanho da Fonte:</label>
          <input
            type="range"
            id="font-size"
            min="20"
            max="120"
            value={fontSize}
            onChange={(e) => onFontSizeChange(Number(e.target.value))}
          />
          <span>{fontSize}px</span>
        </div>

        <div className="control-group">
          <label htmlFor="font-family">Fonte:</label>
          <select
            id="font-family"
            value={fontFamily}
            onChange={(e) => onFontFamilyChange(e.target.value)}
          >
            {FONT_FAMILIES.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="text-color">Cor do Texto:</label>
          <input
            type="color"
            id="text-color"
            value={textColor}
            onChange={(e) => onTextColorChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TextEditor; 