import React, { useState } from 'react';
import { Box, Input, Button, HStack, useToast } from '@chakra-ui/react';

export const SitemapForm = ({ onSubmit, isLoading }) => {
  const [sitemapUrl, setSitemapUrl] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sitemapUrl) {
      toast({
        title: 'Error',
        description: 'Please enter a sitemap URL',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onSubmit(sitemapUrl);
  };

  const handleTryGoogle = () => {
    setSitemapUrl('https://www.google.com/sitemap.xml');
    onSubmit('https://www.google.com/sitemap.xml');
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <HStack>
        <Input
          placeholder="Enter sitemap URL here"
          value={sitemapUrl}
          onChange={(e) => setSitemapUrl(e.target.value)}
          size="lg"
        />
        <Button type="submit" colorScheme="blue" size="lg" isLoading={isLoading}>
          Extract
        </Button>
      </HStack>
      <Button onClick={handleTryGoogle} mt={4} variant="outline" size="sm">
        Try Google Sitemap
      </Button>
    </Box>
  );
};
