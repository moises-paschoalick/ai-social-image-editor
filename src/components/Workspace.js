import React from 'react';
import Canvas from './Canvas';

const Workspace = ({ canvasRef }) => {
  return (
    <div className="generator-workspace">
      <Canvas canvasRef={canvasRef} />
    </div>
  );
};

export default Workspace;
