import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Heading, Text, useToast } from '@chakra-ui/react';
import { SitemapForm } from './components/SitemapForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { About } from './components/About';

function App() {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  const handleExtract = async (sitemapUrl) => {
    setIsLoading(true);
    setError(null);
    setUrls([]);
    try {
      const response = await fetch('/.netlify/functions/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sitemapUrl }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch sitemap');
      }
      setUrls(data.urls);
      toast({
        title: 'URLs Extracted',
        description: `Successfully extracted ${data.urls.length} URLs`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      setError(err.message);
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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
