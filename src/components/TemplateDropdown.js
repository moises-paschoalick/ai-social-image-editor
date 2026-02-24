import React from 'react';

const TemplateDropdown = ({ templates, selectedTemplate, onTemplateChange, isLoading }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="template-select" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Selecione um modelo</label>
      <select
        id="template-select"
        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
        value={selectedTemplate.id}
        onChange={(e) => {
          const template = templates.find((t) => t.id === e.target.value);
          onTemplateChange(template);
        }}
        disabled={isLoading}
      >
        {templates.map((template) => (
          <option key={template.id} value={template.id} className="bg-slate-800">
            {template.name}
          </option>
        ))}
      </select>
      {isLoading && <div className="text-primary text-sm font-medium mt-2 animate-pulse">Carregando modelo...</div>}
    </div>
  );
};

export default TemplateDropdown; 