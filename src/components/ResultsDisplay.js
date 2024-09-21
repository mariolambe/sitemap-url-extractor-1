import React, { useState, useEffect } from 'react';
import { Box, Text, Button, VStack, HStack, Input, Select, UnorderedList, ListItem } from '@chakra-ui/react';

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
    // ... (export logic remains the same)
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
