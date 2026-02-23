import React, { useState } from "react";
import instagramTemplates from '../../models/instagramTemplates.json';
import Toolbar from '../../components/Toolbar';
import Header from "../../components/Header";
import Workspace from "../../components/Workspace";
import { useCanvas } from "../../hooks/useCanvas";

const InstagramPostGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(instagramTemplates.templates[0]);
  const [isLoading, setIsLoading] = useState(false);
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
    setSelectedTextId,
    updateText,
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

    setTexts([...texts, newText]);
    setSelectedTextId(newId);
  };

  const downloadImage = () => {
    if (!fabricCanvas.current) return;

    const dataURL = fabricCanvas.current.toDataURL({ format: 'png' });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `instagram-post-${selectedTemplate.id}.png`;
    link.click();
  };

  const selectedText = texts.find(t => t.id === selectedTextId);

  return (
    <div className="instagram-generator">
      <Header />
      
      <div className="generator-main">
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
        />
        
        <Workspace canvasRef={canvasRef} />
      </div>
    </div>
  );
};

export default InstagramPostGenerator;
