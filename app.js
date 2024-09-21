import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Heading, Text } from '@chakra-ui/react';
import { SitemapForm } from './components/SitemapForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { About } from './components/About';

function App() {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExtract = async (sitemapUrl) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sitemapUrl }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch sitemap');
      }
      const data = await response.json();
      setUrls(data.urls);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
          <ResultsDisplay urls={urls} isLoading={isLoading} error={error} />
          <About />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
