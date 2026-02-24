import React, { useState } from "react";
import instagramTemplates from '../../models/instagramTemplates.json';
import Toolbar from '../../components/Toolbar';
import Header from "../../components/Header";
import Workspace from "../../components/Workspace";
import { useCanvas } from "../../hooks/useCanvas";
import { generateTextElements } from "../../ai/skills";

const InstagramPostGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(instagramTemplates.templates[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 1 = 100%
  const [texts, setTexts] = useState([
    {
      id: 1,
      text: "Texto para Instagram",
      fontSize: 60,
      fontFamily: "Arial",
      textColor: "#000000",
      position: {
        x: 540,
        y: 540,
        scaleX: 1,
        scaleY: 1,
        angle: 0
      }
    }
  ]);
  const [selectedTextId, setSelectedTextId] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState(selectedTemplate.style.backgroundColor);
  const [gradientStart, setGradientStart] = useState(selectedTemplate.style.gradientStart);
  const [gradientEnd, setGradientEnd] = useState(selectedTemplate.style.gradientEnd);

  const updateText = (textId, updates) => {
    setTexts(texts.map(text =>
      text.id === textId ? { ...text, ...updates } : text
    ));
  };

  const { canvasRef, fabricCanvas } = useCanvas({
    texts,
    selectedTemplate,
    backgroundColor,
    gradientStart,
    gradientEnd,
    selectedTextId,
    setSelectedTextId,
    updateText,
    zoomLevel,
  });

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
    setBackgroundColor(template.style.backgroundColor);
    setGradientStart(template.style.gradientStart);
    setGradientEnd(template.style.gradientEnd);
  };

  const addNewText = () => {
    const newId = texts.length > 0 ? Math.max(...texts.map(t => t.id)) + 1 : 1;
    const newText = {
      id: newId,
      text: "Novo Texto",
      fontSize: 60,
      fontFamily: "Arial",
      textColor: "#000000",
      position: { x: 540, y: 540, scaleX: 1, scaleY: 1 }
    };

    // Deselect current text so Fabric knows to pick up the new one cleanly
    setSelectedTextId(null);
    if (fabricCanvas.current) {
      fabricCanvas.current.discardActiveObject();
    }

    setTexts([...texts, newText]);

    // Set the new text as selected in the next tick after state updates
    setTimeout(() => {
      setSelectedTextId(newId);
    }, 0);
  };

  const downloadImage = () => {
    if (!fabricCanvas.current) return;

    // Deselect before downloading to remove the bounding box
    fabricCanvas.current.discardActiveObject();
    fabricCanvas.current.renderAll();

    const dataURL = fabricCanvas.current.toDataURL({ format: 'png' });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `instagram-post-${selectedTemplate.id}.png`;
    link.click();
  };

  const handleGenerateFromPrompt = (prompt) => {
    const newTexts = generateTextElements(prompt);
    setTexts(newTexts);
  };

  const selectedText = texts.find(t => t.id === selectedTextId);

  return (
    <div className="flex flex-col min-h-screen bg-darkBg text-white w-full m-0 p-0">
      <Header />

      <div className="flex flex-1 flex-row overflow-hidden relative bg-darkBg">
        <Toolbar
          onAddText={addNewText}
          onDownload={downloadImage}
          isLoading={isLoading}
          templates={instagramTemplates.templates}
          selectedTemplate={selectedTemplate}
          onTemplateChange={handleTemplateChange}
          backgroundColor={backgroundColor}
          gradientStart={gradientStart}
          gradientEnd={gradientEnd}
          onBackgroundColorChange={setBackgroundColor}
          onGradientStartChange={setGradientStart}
          onGradientEndChange={setGradientEnd}
          selectedText={selectedText}
          onTextChange={(value) => updateText(selectedTextId, { text: value })}
          onFontSizeChange={(value) => updateText(selectedTextId, { fontSize: value })}
          onFontFamilyChange={(value) => updateText(selectedTextId, { fontFamily: value })}
          onTextColorChange={(value) => updateText(selectedTextId, { textColor: value })}
          onGenerateFromPrompt={handleGenerateFromPrompt}
        />

        <Workspace
          canvasRef={canvasRef}
          zoomLevel={zoomLevel}
          onZoomChange={setZoomLevel}
        />
      </div>
    </div>
  );
};

export default InstagramPostGenerator;
