import React from 'react';

const Canvas = ({ canvasRef }) => {
  return (
    <div className="canvas-container">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Canvas;
