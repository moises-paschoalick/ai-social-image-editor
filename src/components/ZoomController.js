import React from 'react';

const ZoomController = ({ zoomLevel, onZoomChange }) => {
    const handleSliderChange = (e) => {
        onZoomChange(parseFloat(e.target.value));
    };

    const handleResetZoom = () => {
        onZoomChange(0.5); // Reset to default 50%
    };

    return (
        <div className="zoom-controller">
            <span className="zoom-level-text" onClick={handleResetZoom} title="Resetar para 50%">
                {Math.round(zoomLevel * 100)}%
            </span>
            <input
                type="range"
                className="zoom-slider"
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
