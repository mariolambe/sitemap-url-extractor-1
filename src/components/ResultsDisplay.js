import React from 'react';
import { Box, Text, VStack, HStack, Progress, Tooltip } from '@chakra-ui/react';

const analyzeUrls = (urls) => {
  const totalUrls = urls.length;
  const httpsCount = urls.filter(url => url.startsWith('https://')).length;
  const wwwCount = urls.filter(url => url.includes('://www.')).length;
  const avgDepth = urls.reduce((sum, url) => sum + (url.match(/\//g) || []).length, 0) / totalUrls;
  
  return {
    totalUrls,
    httpsPercentage: (httpsCount / totalUrls) * 100,
    wwwPercentage: (wwwCount / totalUrls) * 100,
    avgDepth: avgDepth.toFixed(2),
  };
};

export const URLAnalysis = ({ urls }) => {
  const analysis = analyzeUrls(urls);

  return (
    <Box borderWidth={1} borderRadius="md" p={4} bg="gray.50">
      <VStack align="stretch" spacing={3}>
        <Text fontWeight="bold">URL Analysis:</Text>
        <HStack justify="space-between">
          <Text>Total URLs:</Text>
          <Text fontWeight="bold">{analysis.totalUrls}</Text>
        </HStack>
        <VStack align="stretch">
          <Tooltip label={`${analysis.httpsPercentage.toFixed(1)}% of URLs use HTTPS`}>
            <Text>HTTPS Usage:</Text>
          </Tooltip>
          <Progress value={analysis.httpsPercentage} colorScheme="green" />
        </VStack>
        <VStack align="stretch">
          <Tooltip label={`${analysis.wwwPercentage.toFixed(1)}% of URLs use www`}>
            <Text>WWW Usage:</Text>
          </Tooltip>
          <Progress value={analysis.wwwPercentage} colorScheme="blue" />
        </VStack>
        <HStack justify="space-between">
          <Text>Average URL Depth:</Text>
          <Text fontWeight="bold">{analysis.avgDepth}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};
