import React from 'react';
import Canvas from './Canvas';
import ZoomController from './ZoomController';

const Workspace = ({ canvasRef, zoomLevel, onZoomChange }) => {
  return (
    <div className="flex-1 flex flex-col justify-start pt-10 items-center overflow-auto relative gap-6">
      <div className="relative w-[1080px] max-w-full h-[75vh] mx-auto overflow-hidden shadow-2xl rounded-xl bg-slate-800 ring-1 ring-slate-700 flex justify-center items-center">
        {/* We center the wrapper, but the wrapper itself doesn't constrain the Canvas element dynamically */}
        <div className="relative shadow-md bg-white overflow-hidden" style={{ width: 1080, height: 1080, transform: `scale(${Math.min(1, window.innerHeight * 0.75 / 1080)})` }}>
          {/* Note: In a future step, we might want to calculate the raw scale factor based on screen space so the 1080x1080 fits exactly on screen as "100%" */}
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
