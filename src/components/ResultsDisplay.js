import React, { useState, useEffect } from 'react';
import { Box, Text, Button, VStack, HStack, Input, Select, UnorderedList, ListItem } from '@chakra-ui/react';
import UrlClusterView from './UrlClusterView';  // Make sure this path is correct

export const ResultsDisplay = ({ urls, isLoading, error }) => {
  const [filteredUrls, setFilteredUrls] = useState(urls);
  const [filterText, setFilterText] = useState('');
  const [exportFormat, setExportFormat] = useState('txt');
  const [showExportOptions, setShowExportOptions] = useState(false);

  useEffect(() => {
    setFilteredUrls(urls);
    setShowExportOptions(urls.length > 0);
  }, [urls]);

  const handleFilterChange = (e) => {
    const text = e.target.value;
    setFilterText(text);
    setFilteredUrls(urls.filter(url => url.toLowerCase().includes(text.toLowerCase())));
  };

  const handleExport = () => {
    let content;
    let filename;
    let type;

    switch (exportFormat) {
      case 'csv':
        content = filteredUrls.join('\n');
        filename = 'urls.csv';
        type = 'text/csv';
        break;
      case 'json':
        content = JSON.stringify(filteredUrls, null, 2);
        filename = 'urls.json';
        type = 'application/json';
        break;
      case 'xml':
        content = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${filteredUrls.map(url => `  <url>\n    <loc>${url}</loc>\n  </url>`).join('\n')}\n</urlset>`;
        filename = 'sitemap.xml';
        type = 'application/xml';
        break;
      default:
        content = filteredUrls.join('\n');
        filename = 'urls.txt';
        type = 'text/plain';
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <VStack align="stretch" spacing={4}>
      <Text fontWeight="bold">Extracted {urls.length} URLs:</Text>
      
      {showExportOptions && (
        <>
          <UrlClusterView urls={urls} />
          
          <Input
            placeholder="Filter URLs..."
            value={filterText}
            onChange={handleFilterChange}
          />
          <Box maxHeight="400px" overflowY="auto" borderWidth={1} borderRadius="md" p={4}>
            <UnorderedList styleType="none" margin={0} spacing={2}>
              {filteredUrls.map((url, index) => (
                <ListItem key={index} fontSize="sm" fontFamily="monospace">
                  {url}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
          <HStack>
            <Select value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
              <option value="txt">Text</option>
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
              <option value="xml">XML</option>
            </Select>
            <Button onClick={handleExport} colorScheme="green">
              Export URLs
            </Button>
          </HStack>
        </>
      )}
    </VStack>
  );
};
