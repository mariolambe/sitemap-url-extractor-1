import React from 'react';
import { Box, Text, Button, VStack, Spinner, UnorderedList, ListItem } from '@chakra-ui/react';

export const ResultsDisplay = ({ urls, isLoading, error }) => {
  if (isLoading) {
    return (
      <Box textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Extracting URLs...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box bg="red.100" p={4} borderRadius="md">
        <Text color="red.800">{error}</Text>
      </Box>
    );
  }

  if (urls.length === 0) {
    return null;
  }

  const handleDownload = () => {
    const blob = new Blob([urls.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'urls.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Text fontWeight="bold">Extracted {urls.length} URLs:</Text>
      <Box maxHeight="400px" overflowY="auto" borderWidth={1} borderRadius="md" p={4}>
        <UnorderedList spacing={2} styleType="none" margin={0}>
          {urls.map((url, index) => (
            <ListItem key={index} fontSize="sm" fontFamily="monospace">
              {url}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Button onClick={handleDownload} colorScheme="green">
        Download URLs
      </Button>
    </VStack>
  );
};
