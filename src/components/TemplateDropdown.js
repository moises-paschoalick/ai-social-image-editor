import React from 'react';

const TemplateDropdown = ({ templates, selectedTemplate, onTemplateChange, isLoading }) => {
  return (
    <div className="template-selector">
      <label htmlFor="template-select">Selecione um modelo:</label>
      <select
        id="template-select"
        value={selectedTemplate.id}
        onChange={(e) => {
          const template = templates.find((t) => t.id === e.target.value);
          onTemplateChange(template);
        }}
        disabled={isLoading}
      >
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
      {isLoading && <div className="loading">Carregando modelo...</div>}
    </div>
  );
};

export default TemplateDropdown; 