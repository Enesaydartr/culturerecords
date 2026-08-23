import https from 'https';
import fs from 'fs';

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

(async () => {
  const html = await get('https://www.bubilet.com.tr/arama?q=eray067');
  fs.writeFileSync('bubilet_eray.html', html);
  console.log('Saved bubilet_eray.html, bytes:', html.length);
  
  // Find script tags or window.__INITIAL_STATE__ or json
  const scripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
  console.log('Scripts count:', scripts.length);
  for (let s of scripts) {
    if (s.includes('window.') || s.includes('__NEXT_DATA__') || s.includes('events') || s.includes('etkinlik') || s.includes('JSON.parse') || s.includes('items')) {
      console.log('Interesting script snippet:', s.slice(0, 300));
    }
  }
})();
