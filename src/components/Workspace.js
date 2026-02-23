import React from 'react';
import Canvas from './Canvas';
import ZoomController from './ZoomController';

const Workspace = ({ canvasRef, zoomLevel, onZoomChange }) => {
  return (
    <div className="generator-workspace">
      <div
        className="canvas-wrapper"
        style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease' }}
      >
        <Canvas canvasRef={canvasRef} />
      </div>

      <ZoomController
        zoomLevel={zoomLevel}
        onZoomChange={onZoomChange}
      />
    </div>
  );
};

export default Workspace;
