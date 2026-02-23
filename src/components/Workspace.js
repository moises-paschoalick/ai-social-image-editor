import React from 'react';
import Canvas from './Canvas';
import ZoomController from './ZoomController';

const Workspace = ({ canvasRef, zoomLevel, onZoomChange }) => {
  return (
    <div className="generator-workspace">
      <div className="viewport-crop">
        <div className="canvas-wrapper">
          <Canvas canvasRef={canvasRef} />
        </div>
      </div>

      <ZoomController
        zoomLevel={zoomLevel}
        onZoomChange={onZoomChange}
      />
    </div>
  );
};

export default Workspace;
