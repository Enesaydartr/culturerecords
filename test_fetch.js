import https from 'https';

function fetchBubilet(query) {
  return new Promise((resolve) => {
    https.get(`https://www.bubilet.com.tr/arama?q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, dataLength: data.length }));
    }).on('error', (err) => resolve({ error: err.message }));
  });
}

(async () => {
  const r1 = await fetchBubilet('eray067');
  const r2 = await fetchBubilet('mansur');
  console.log('Query result 1:', r1);
  console.log('Query result 2:', r2);
})();
