import React, { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Text, Select } from '@chakra-ui/react';

const UrlClusterView = ({ urls }) => {
  const [clusters, setClusters] = useState([]);
  const [filterBy, setFilterBy] = useState('');

  useEffect(() => {
    const clusteredUrls = clusterUrls(urls);
    setClusters(clusteredUrls);
  }, [urls]);

  const clusterUrls = (urls) => {
    // ... (clusterUrls logic remains the same)
  };

  const handleShowUrls = (segment) => {
    console.log(`Show URLs for segment: ${segment}`);
    // Implement logic to show URLs for the selected segment
  };

  const filteredClusters = filterBy
    ? clusters.filter(cluster => cluster.segment.includes(filterBy))
    : clusters;

  return (
    <Box>
      <Text fontSize="md" fontWeight="bold" mb={2}>URL Path Clusters</Text>
      <Select
        placeholder="Filter by segment"
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
        size="sm"
        mb={2}
      >
        {clusters.map(cluster => (
          <option key={cluster.segment} value={cluster.segment}>{cluster.segment}</option>
        ))}
      </Select>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Path Segments</Th>
            <Th isNumeric>Total</Th>
            <Th>URLs</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredClusters.map(({ segment, count }) => (
            <Tr key={segment}>
              <Td>{segment}</Td>
              <Td isNumeric>{count}</Td>
              <Td>
                <Button
                  colorScheme="purple"
                  variant="outline"
                  size="xs"
                  onClick={() => handleShowUrls(segment)}
                >
                  Show
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UrlClusterView;
