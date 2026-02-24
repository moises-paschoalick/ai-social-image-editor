import React from 'react';

const BackgroundEditor = ({
  backgroundColor,
  gradientStart,
  gradientEnd,
  onBackgroundColorChange,
  onGradientStartChange,
  onGradientEndChange
}) => {
  const colorInputClass = "w-full h-10 p-0.5 rounded cursor-pointer bg-slate-800 border border-slate-700 mt-1";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cor de Fundo</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            className={colorInputClass}
            value={backgroundColor}
            onChange={(e) => onBackgroundColorChange(e.target.value)}
          />
        </div>
      </div>

      <div className="h-px bg-slate-800 w-full my-1"></div>

      <div className="flex flex-col">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cor Inicial do Gradiente</label>
        <input
          type="color"
          className={colorInputClass}
          value={gradientStart}
          onChange={(e) => onGradientStartChange(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cor Final do Gradiente</label>
        <input
          type="color"
          className={colorInputClass}
          value={gradientEnd}
          onChange={(e) => onGradientEndChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BackgroundEditor; 