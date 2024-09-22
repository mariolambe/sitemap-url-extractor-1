import React, { useState, useEffect } from 'react';

export const ResultsDisplay = ({ urls, isLoading, error }) => {
  const [filteredUrls, setFilteredUrls] = useState(urls);
  const [filterText, setFilterText] = useState('');
  const [exportFormat, setExportFormat] = useState('txt');

  useEffect(() => {
    setFilteredUrls(urls);
  }, [urls]);

  const handleFilterChange = (e) => {
    const text = e.target.value;
    setFilterText(text);
    setFilteredUrls(urls.filter(url => url.toLowerCase().includes(text.toLowerCase())));
  };

  const handleExport = () => {
    let content = '';
    switch (exportFormat) {
      case 'txt':
        content = filteredUrls.join('\n');
        break;
      case 'csv':
        content = 'URL\n' + filteredUrls.join('\n');
        break;
      case 'json':
        content = JSON.stringify(filteredUrls, null, 2);
        break;
      case 'xml':
        content = `<?xml version="1.0" encoding="UTF-8"?>\n<urls>\n${filteredUrls.map(url => `  <url>${url}</url>`).join('\n')}\n</urls>`;
        break;
    }
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `exported_urls.${exportFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (isLoading) {
    return <p>Loading... Please wait while we extract URLs.</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <p className="font-bold">
        {urls.length > 0 
          ? `Extracted ${urls.length} URLs:`
          : "No URLs extracted. Please check the sitemap URL and try again."}
      </p>
      
      {urls.length > 0 && (
        <>
          <input
            className="border p-2 rounded"
            placeholder="Filter URLs..."
            value={filterText}
            onChange={handleFilterChange}
          />
          <div className="max-h-[300px] overflow-y-auto border rounded p-2">
            <ul className="list-none m-0 space-y-1">
              {filteredUrls.map((url, index) => (
                <li key={index} className="text-sm font-mono">
                  {url}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex space-x-2">
            <select 
              className="border p-2 rounded"
              value={exportFormat} 
              onChange={(e) => setExportFormat(e.target.value)}
            >
              <option value="txt">Text</option>
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
              <option value="xml">XML</option>
            </select>
            <button 
              onClick={handleExport} 
              className="bg-green-500 text-white p-2 rounded"
            >
              Export URLs
            </button>
          </div>
        </>
      )}
    </div>
  );
};
