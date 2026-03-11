const { chromium } = require('playwright');

(async () => {
  console.log('Lancement du navigateur...');
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  console.log('Navigation vers H&M...');
  try {
    await page.goto('https://www2.hm.com/en_gb/index.html', { timeout: 15000 });
    console.log('✅ Connexion OK ! URL:', page.url());
  } catch (err) {
    console.log('❌ Erreur:', err.message);
  }
  await browser.close();
})();