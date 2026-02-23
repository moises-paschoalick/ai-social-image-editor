import { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

export const useCanvas = ({
  texts,
  selectedTemplate,
  backgroundColor,
  gradientStart,
  gradientEnd,
  selectedTextId, // <-- We need this to know what React thinks is selected
  setSelectedTextId,
  updateText,
}) => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

  // Keep a ref of the latest selectedTextId so the canvas rebuild can read it without depending on it
  const selectedTextIdRef = useRef(selectedTextId);
  useEffect(() => {
    selectedTextIdRef.current = selectedTextId;
  }, [selectedTextId]);

  useEffect(() => {
    if (fabricCanvas.current) {
      fabricCanvas.current.dispose();
    }

    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      width: 1080,
      height: 1080,
      backgroundColor: backgroundColor,
    });

    fabricCanvas.current.on('selection:created', (e) => {
      const selectedObject = e.selected[0];
      if (selectedObject && selectedObject.type === 'text') {
        const textId = selectedObject.data?.id;
        if (textId !== selectedTextIdRef.current) {
          setSelectedTextId(textId);
        }
      }
    });

    fabricCanvas.current.on('selection:updated', (e) => {
      const selectedObject = e.selected[0];
      if (selectedObject && selectedObject.type === 'text') {
        const textId = selectedObject.data?.id;
        if (textId !== selectedTextIdRef.current) {
          setSelectedTextId(textId);
        }
      }
    });

    fabricCanvas.current.on('selection:cleared', (e) => {
      // Prevent clearing if we are just re-rendering
      if (!e.e) return; // e.e is the original mouse event. If it's missing, it's programmatic
      setSelectedTextId(null);
    });

    fabricCanvas.current.on('object:modified', (e) => {
      const modifiedObject = e.target;
      if (modifiedObject && modifiedObject.type === 'text') {
        const textId = modifiedObject.data?.id;
        const newPosition = {
          x: modifiedObject.left,
          y: modifiedObject.top,
          scaleX: modifiedObject.scaleX,
          scaleY: modifiedObject.scaleY,
          angle: modifiedObject.angle,
        };
        updateText(textId, { position: newPosition });
      }
    });

    const createGradient = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');

      const gradient = ctx.createLinearGradient(0, 0, 0, 1080);
      gradient.addColorStop(0, gradientStart);
      gradient.addColorStop(1, gradientEnd);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1080, 1080);

      return canvas;
    };

    const pattern = new fabric.Pattern({
      source: createGradient(),
      repeat: 'no-repeat',
    });

    const backgroundRect = new fabric.Rect({
      left: 0,
      top: 0,
      width: 1080,
      height: 1080,
      fill: pattern,
      selectable: false,
      evented: false,
    });

    fabricCanvas.current.add(backgroundRect);
    fabricCanvas.current.sendToBack(backgroundRect);

    texts.forEach((textObj) => {
      const fabricText = new fabric.Text(textObj.text, {
        left: textObj.position.x,
        top: textObj.position.y,
        fontSize: textObj.fontSize,
        fill: textObj.textColor,
        fontFamily: textObj.fontFamily,
        textAlign: 'center',
        originX: 'center',
        originY: 'center',
        data: { id: textObj.id },
        scaleX: textObj.position.scaleX || 1,
        scaleY: textObj.position.scaleY || 1,
        hasControls: true,
        hasBorders: true,
        hasRotatingPoint: true,
        lockUniScaling: false,
        angle: textObj.position.angle || 0,
        controlsVisibility: {
          mt: true,
          mb: true,
          ml: true,
          mr: true,
          bl: true,
          br: true,
          tl: true,
          tr: true,
          mtr: true,
        },
      });
      fabricCanvas.current.add(fabricText);

      // Restore selection based on the React state ref when canvas is rebuilt
      if (textObj.id === selectedTextIdRef.current) {
        fabricCanvas.current.setActiveObject(fabricText);
      }
    });

    fabricCanvas.current.renderAll();

    return () => {
      if (fabricCanvas.current) {
        fabricCanvas.current.dispose();
        fabricCanvas.current = null;
      }
    };
  }, [texts, selectedTemplate, backgroundColor, gradientStart, gradientEnd]); // Removed selectedTextId

  // Secondary effect to handle purely selection changes from outside (like clicking "Add Text")
  useEffect(() => {
    if (fabricCanvas.current) {
      const activeObject = fabricCanvas.current.getActiveObject();
      const currentActiveId = activeObject?.data?.id;

      if (currentActiveId !== selectedTextId) {
        if (selectedTextId === null) {
          fabricCanvas.current.discardActiveObject();
        } else {
          // Find the object and select it
          const objectToSelect = fabricCanvas.current.getObjects('text').find(obj => obj.data?.id === selectedTextId);
          if (objectToSelect) {
            fabricCanvas.current.setActiveObject(objectToSelect);
          }
        }
        fabricCanvas.current.requestRenderAll();
      }
    }
  }, [selectedTextId]);

  return { canvasRef, fabricCanvas };
};
