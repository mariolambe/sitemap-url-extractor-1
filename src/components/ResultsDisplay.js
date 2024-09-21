import React, { useState, useEffect } from 'react';
import { Box, Text, Button, VStack, HStack, Input, Select, UnorderedList, ListItem } from '@chakra-ui/react';
import { UrlClusterView } from './UrlClusterView';  // Make sure to import the new component

export const ResultsDisplay = ({ urls, isLoading, error }) => {
  // ... (previous state variables and functions remain the same)

  return (
    <VStack align="stretch" spacing={4}>
      <Text fontWeight="bold">Extracted {urls.length} URLs:</Text>
      
      {showExportOptions && (
        <>
          <UrlClusterView urls={urls} />  {/* Add the UrlClusterView component here */}
          
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
