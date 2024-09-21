const axios = require('axios');
const { parseString } = require('xml2js');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { sitemapUrl } = JSON.parse(event.body);
    const response = await axios.get(sitemapUrl);
    const xml = response.data;

    return new Promise((resolve, reject) => {
      parseString(xml, (err, result) => {
        if (err) {
          reject({ statusCode: 500, body: JSON.stringify({ error: 'Failed to parse XML' }) });
        } else {
          const urls = result.urlset.url.map(url => url.loc[0]);
          resolve({
            statusCode: 200,
            body: JSON.stringify({ urls }),
          });
        }
      });
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch or process sitemap' }),
    };
  }
};
