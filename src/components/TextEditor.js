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
  const inputClass = "w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        <label htmlFor="text-input" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Texto</label>
        <input
          type="text"
          id="text-input"
          className={inputClass}
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Digite seu texto aqui"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <label htmlFor="font-size" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tamanho da Fonte</label>
          <span className="text-sm font-medium text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md">{fontSize}px</span>
        </div>
        <input
          type="range"
          id="font-size"
          className="w-full mt-3 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
          min="20"
          max="120"
          value={fontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="font-family" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fonte</label>
        <select
          id="font-family"
          className={inputClass}
          value={fontFamily}
          onChange={(e) => onFontFamilyChange(e.target.value)}
        >
          {FONT_FAMILIES.map((font) => (
            <option key={font} value={font} className="bg-slate-800">
              {font}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="text-color" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cor do Texto</label>
        <div className="flex items-center gap-3 mt-1">
          <input
            type="color"
            id="text-color"
            className="w-10 h-10 p-0.5 rounded bg-slate-800 border border-slate-700 cursor-pointer"
            value={textColor}
            onChange={(e) => onTextColorChange(e.target.value)}
          />
          <span className="text-sm font-mono text-slate-400 uppercase">{textColor}</span>
        </div>
      </div>
    </div>
  );
};

export default TextEditor; 