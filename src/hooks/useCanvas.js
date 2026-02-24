import { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

export const useCanvas = ({
  texts,
  selectedTemplate,
  backgroundColor,
  gradientStart,
  gradientEnd,
  selectedTextId,
  setSelectedTextId,
  updateText,
  zoomLevel, // <- New prop
}) => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

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
      selection: true,
    });

    // --- Panning Logic (Alt + Drag or Space + Drag) ---
    fabricCanvas.current.on('mouse:down', function (opt) {
      const evt = opt.e;
      if (evt.altKey || evt.shiftKey) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });

    fabricCanvas.current.on('mouse:move', function (opt) {
      if (this.isDragging) {
        const e = opt.e;
        let vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });

    fabricCanvas.current.on('mouse:up', function (opt) {
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      this.setViewportTransform(this.viewportTransform);
      this.isDragging = false;
      this.selection = true;
    });
    // ----------------------------------------------------

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
      if (!e.e) return;
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

    // Apply texts
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

      if (textObj.id === selectedTextIdRef.current) {
        fabricCanvas.current.setActiveObject(fabricText);
      }
    });

    // Apply init zoom
    if (zoomLevel) {
      fabricCanvas.current.setZoom(zoomLevel);
    }

    fabricCanvas.current.renderAll();

    return () => {
      if (fabricCanvas.current) {
        fabricCanvas.current.dispose();
        fabricCanvas.current = null;
      }
    };
  }, [texts, selectedTemplate, backgroundColor, gradientStart, gradientEnd]); // Removed zoomLevel from rebuild dependency

  // Effect to handle programmatic Native Zoom updates without rebuilding
  useEffect(() => {
    if (fabricCanvas.current && zoomLevel) {
      // Since we center the canvas via CSS transform origin, the fabric zoom point needs to be the top-left (0,0)
      // so it grows outwards from its own bounds rather than double-centering.
      fabricCanvas.current.zoomToPoint(
        new fabric.Point(0, 0),
        zoomLevel
      );
    }
  }, [zoomLevel]);

  // Secondary effect to handle purely selection changes
  useEffect(() => {
    if (fabricCanvas.current) {
      const activeObject = fabricCanvas.current.getActiveObject();
      const currentActiveId = activeObject?.data?.id;

      if (currentActiveId !== selectedTextId) {
        if (selectedTextId === null) {
          fabricCanvas.current.discardActiveObject();
        } else {
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
