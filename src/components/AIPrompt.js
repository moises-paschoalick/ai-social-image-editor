import React, { useState } from 'react';

const AIPrompt = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    onGenerate(prompt);
  };

  return (
    <div className="ai-prompt">
      <h3>AI Assistant</h3>
      <div className="editor-controls">
        <div className="control-group">
          <label htmlFor="ai-prompt-input">Prompt:</label>
          <textarea
            id="ai-prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'Create a post for a new product launch'"
          />
        </div>
        <button onClick={handleGenerate}>Generate</button>
      </div>
    </div>
  );
};

export default AIPrompt;
