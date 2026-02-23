import React from 'react';

const ZoomController = ({ zoomLevel, onZoomChange }) => {
    const handleZoomIn = () => {
        onZoomChange(Math.min(zoomLevel + 0.1, 3)); // Max 300%
    };

    const handleZoomOut = () => {
        onZoomChange(Math.max(zoomLevel - 0.1, 0.2)); // Min 20%
    };

    const handleResetZoom = () => {
        onZoomChange(1);
    };

    return (
        <div className="zoom-controller">
            <button onClick={handleZoomOut} title="Diminuir Zoom">−</button>
            <div className="zoom-level" onClick={handleResetZoom} title="Resetar Zoom">
                {Math.round(zoomLevel * 100)}%
            </div>
            <button onClick={handleZoomIn} title="Aumentar Zoom">+</button>
        </div>
    );
};

export default ZoomController;
