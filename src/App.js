import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Heading, Text, useToast, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { SitemapForm } from './components/SitemapForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { About } from './components/About';

function App() {
  // ... (previous code remains the same)

  return (
    <ChakraProvider>
      <Box maxWidth="1200px" margin="auto" padding={8}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center">
            Sitemap URL Extractor 😎
          </Heading>
          <Text fontSize="lg" textAlign="center">
            Enter the URL of your sitemap XML file below and click "Extract" to get all URLs.
          </Text>
          <SitemapForm onSubmit={handleExtract} isLoading={isLoading} />
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Error!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <ResultsDisplay urls={urls} isLoading={isLoading} error={error} />
          <About />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
