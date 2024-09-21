const axios = require('axios');
const xml2js = require('xml2js');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { sitemapUrl } = JSON.parse(event.body);
    
    const response = await axios.get(sitemapUrl, {
      headers: {
        'User-Agent': 'Sitemap URL Extractor (https://your-app-url.netlify.app/)'
      }
    });
    
    const xml = response.data;
    const parser = new xml2js.Parser();
    
    const result = await parser.parseStringPromise(xml);
    
    let urls = [];
    
    if (result.urlset && result.urlset.url) {
      // Standard sitemap
      urls = result.urlset.url.map(url => url.loc[0]);
    } else if (result.sitemapindex && result.sitemapindex.sitemap) {
      // Sitemap index
      urls = result.sitemapindex.sitemap.map(sitemap => sitemap.loc[0]);
    } else {
      throw new Error('Unsupported sitemap format');
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ urls }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Failed to fetch or process sitemap: ' + error.message }),
    };
  }
};
