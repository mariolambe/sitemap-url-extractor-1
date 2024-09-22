import React, { useState, useEffect } from 'react';
import { Box, Text, Button, VStack, HStack, Input, Select, UnorderedList, ListItem, Collapse, useDisclosure } from '@chakra-ui/react';

export const ResultsDisplay = ({ urls, isLoading, error }) => {
  const [filteredUrls, setFilteredUrls] = useState(urls);
  const [filterText, setFilterText] = useState('');
  const [exportFormat, setExportFormat] = useState('txt');
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    console.log("URLs received in ResultsDisplay:", urls);
    setFilteredUrls(urls);
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
    return <Text>Loading... Please wait while we extract URLs.</Text>;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  return (
    <VStack align="stretch" spacing={4}>
      <Text fontWeight="bold">
        {urls.length > 0 
          ? `Extracted ${urls.length} URLs:`
          : "No URLs extracted. Please check the sitemap URL and try again."}
      </Text>
      
      {urls.length > 0 && (
        <>
          <Input
            placeholder="Filter URLs..."
            value={filterText}
            onChange={handleFilterChange}
          />
          <Box maxHeight="300px" overflowY="auto" borderWidth={1} borderRadius="md" p={2}>
            <UnorderedList styleType="none" margin={0} spacing={1}>
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
          
          <Button onClick={onToggle} size="sm" variant="outline">
            {isOpen ? "Hide" : "Show"} URL Path Clusters
          </Button>
          <Collapse in={isOpen} animateOpacity>
            <Box borderWidth={1} borderRadius="md" p={2}>
              <UrlClusterView urls={urls} />
            </Box>
          </Collapse>
        </>
      )}
    </VStack>
  );
};
