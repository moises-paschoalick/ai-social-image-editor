import React from 'react';
import Canvas from './Canvas';
import ZoomController from './ZoomController';

const Workspace = ({ canvasRef, zoomLevel, onZoomChange }) => {
  return (
    <div className="flex-1 flex flex-col justify-start pt-10 items-center overflow-auto relative gap-6">
      {/* 
        VIEWPORT LAYER: Crops the canvas.
        It has a defined constraint so it aligns correctly without shifting layout.
      */}
      <div
        className="w-full max-w-[1080px] h-[75vh] flex justify-center items-center overflow-hidden relative shadow-2xl rounded-xl bg-slate-900 border border-slate-700"
      >
        {/* 
          CANVAS ELEMENT: Scales proportionally from center.
          The Math.min() generates a 'fit screen' base scale, multiplied by user zoomLevel.
        */}
        <div
          className="relative flex-shrink-0 origin-center transition-transform duration-200"
          style={{
            width: 1080,
            height: 1080,
            transform: `scale(${zoomLevel * Math.min(1, window.innerHeight * 0.75 / 1080)})`
          }}
        >
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
