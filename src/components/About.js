import React from 'react';
import { Box, Text, Link, VStack } from '@chakra-ui/react';

export const About = () => {
  return (
    <Box bg="gray.100" p={6} borderRadius="md">
      <VStack align="stretch" spacing={4}>
        <Text fontWeight="bold">About the Sitemap URL Extractor</Text>
        <Text>
          The Sitemap URL Extractor is a React app that helps you extract URLs from sitemap XML files.
          It works also with sitemap index files (example: <Link href="https://www.google.com/sitemap.xml" isExternal color="blue.500">Google Sitemap</Link>).
        </Text>
        <Text>
          If you want to explore alternative ways (for example via Google sheets, Screaming Frog, command line) check out this article on{' '}
          <Link href="https://www.mariolambertucci.com/how-to-extract-urls-from-sitemaps/" isExternal color="blue.500">
            How to extract URLs from sitemaps
          </Link>
          .
        </Text>
        <Text fontWeight="bold">About Author</Text>
        <Text>
          SEO Specialist{' '}
          <Link href="https://www.linkedin.com/in/mariolambertucci/" isExternal color="blue.500">
            Mario Lambertucci
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};
