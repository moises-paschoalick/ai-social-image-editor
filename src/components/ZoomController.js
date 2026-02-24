import React from 'react';

const ZoomController = ({ zoomLevel, onZoomChange }) => {
    const handleSliderChange = (e) => {
        onZoomChange(parseFloat(e.target.value));
    };

    const handleResetZoom = () => {
        onZoomChange(0.5); // Reset to default 50%
    };

    return (
        <div className="flex items-center gap-4 bg-darkCard border border-darkBorder px-6 py-3 rounded-full shadow-lg">
            <span className="min-w-[45px] text-left text-sm font-semibold text-slate-300 cursor-pointer hover:text-blue-400 transition-colors" onClick={handleResetZoom} title="Resetar para 50%">
                {Math.round(zoomLevel * 100)}%
            </span>
            <input
                type="range"
                className="w-32 h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primaryHover transition-transform hover:scale-105"
                min="0.1"
                max="3"
                step="0.05"
                value={zoomLevel}
                onChange={handleSliderChange}
                title="Ajustar Zoom"
            />
        </div>
    );
};

export default ZoomController;
