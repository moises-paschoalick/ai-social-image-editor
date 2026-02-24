import React from 'react';
import Canvas from './Canvas';
import ZoomController from './ZoomController';

const Workspace = ({ canvasRef, zoomLevel, onZoomChange }) => {
  return (
    <div className="flex-1 flex flex-col justify-start pt-10 items-center overflow-auto relative gap-6">
      <div className="w-full max-w-[900px] h-[75vh] flex justify-center items-center overflow-hidden shadow-2xl rounded-xl bg-slate-800 relative ring-1 ring-slate-700">
        <div className="origin-center shadow-md">
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
