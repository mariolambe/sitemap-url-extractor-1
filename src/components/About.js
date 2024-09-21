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
        <Text fontWeight="bold">What is a Sitemap URL Extractor?</Text>
        <Text>
          A sitemap URL extractor is a tool that helps users quickly access all the URLs listed within an XML sitemap file. These URLs represent the pages a website owner wants search engines to crawl and index.
        </Text>
        <Text>
          Sitemaps are essential for SEO because they help search engines discover your website's content efficiently. An extractor simplifies this process by allowing webmasters, SEOs, and developers to see the structure of the URLs in an easy-to-read format.
        </Text>
        <Text fontWeight="bold">Why Use a Sitemap URL Extractor?</Text>
        <Text>
          - SEO Audits: Extract all URLs to ensure they are indexed properly by search engines.
        </Text>
        <Text>
          - Broken Links: Identify broken links or pages that return errors.
        </Text>
        <Text>
          - Content Inventory: Analyze the URLs to see if important pages are missing from the sitemap.
        </Text>
        <Text>
          - Website Redesigns: When planning website changes, extract URLs to ensure nothing gets left behind.
        </Text>
        <Text>
          - Competitor Analysis: If competitors have accessible sitemaps, extracting their URLs gives insight into their SEO strategies.
        </Text>
        <Text fontWeight="bold">How to Use the Sitemap URL Extractor Tool</Text>
        <Text>
          - Step 1: Enter the URL of your sitemap (e.g., https://www.example.com/sitemap.xml).
        </Text>
        <Text>
          - Step 2: Click "Extract" to retrieve all URLs listed in the sitemap.
        </Text>
        <Text>
          - Step 3: Review the extracted URLs, copy them for further use, or analyze them in bulk.
        </Text>
        <Text fontWeight="bold">Benefits of Sitemap URL Extractors for SEO</Text>
        <Text>
          - Faster SEO Insights: Quickly pull a complete list of URLs to analyze your site’s structure.
        </Text>
        <Text>
          - URL Validation: Ensure that URLs in your sitemap are live, relevant, and properly formatted.
        </Text>
        <Text>
          - Indexing Support: By understanding your sitemap, you can ensure critical pages are being indexed.
        </Text>
        <Text>
          - Improve Crawl Efficiency: Identify any unnecessary URLs that might bloat the sitemap and cause inefficient crawling.
        </Text>
        <Text fontWeight="bold">Common Issues with Sitemaps & How to Fix Them</Text>
        <Text>
          - Missing Pages: Check if important pages are missing from your sitemap and add them.
        </Text>
        <Text>
          - Duplicate URLs: Ensure that each page is represented by only one URL to avoid duplication issues.
        </Text>
        <Text>
          - Sitemap Size Limits: If your sitemap exceeds the recommended size limit (50,000 URLs or 50MB), break it into smaller sitemaps and use a sitemap index.
        </Text>
        <Text>
          - Errors in Sitemap XML Format: Validate your sitemap to ensure proper syntax and structure.
        </Text>
        <Text fontWeight="bold">FAQs About Sitemap URL Extraction</Text>
        <Text>
          - How do I find my website’s sitemap? Most websites have their sitemap at www.example.com/sitemap.xml.
        </Text>
        <Text>
          - How often should I extract URLs from my sitemap? Ideally, every time you update your website’s content or structure.
        </Text>
        <Text>
          - Can I extract sitemaps from competitor websites? Yes, if the competitor's sitemap is public and accessible.
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
