const express = require('express');
const puppeteer = require('puppeteer');

const server = express();

server.get('/', async (request, response) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.ligapokemon.com.br/?view=cards/card&card=Iono%20(185/193)&ed=PAL&num=185');

  const pageContent = await page.evaluate(() => {
    return{
      card_name: document.querySelector('.nome-principal').innerText,
      normal_price: document.querySelector('div.precos-edicoes .row.bloco-preco-superior div.col-prc.col-prc-menor').innerText,
      foil_price: document.querySelector('div.col-prc.col-prc-menor').innerText,
    }
  });

  console.log(pageContent);

  
  response.send({
    card_name: pageContent.card_name,
    normal_price: pageContent.normal_price,
  });
  await page.screenshot({path: 'screenshot.png'});
  await browser.close();
  
});

server.listen(3333, () => {

  console.log('Server started at http://192.168.15.4:3333');
});


// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false, // default is true
//     // slowMo: 1000, // slow down by 1000ms
//   });
//   const page = await browser.newPage();
//   await page.goto('https://www.ligapokemon.com.br/?view=cards/card&card=Iono%20(185/193)&ed=PAL&num=185');
//   // await page.type('input[name=q]', 'puppeteer');
//   // await page.click('input[type="submit"]');
//   // await page.waitForNavigation();
//   await page.screenshot({path: 'screenshot.png'});
//   await browser.close();
// })();

// import puppeteer from 'puppeteer';

// (async () => {
//   // Launch the browser and open a new blank page
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Navigate the page to a URL
//   await page.goto('https://developer.chrome.com/');

//   // Set screen size
//   await page.setViewport({width: 1080, height: 1024});

//   // Type into search box
//   await page.type('.search-box__input', 'automate beyond recorder');

//   // Wait and click on first result
//   const searchResultSelector = '.search-box__link';
//   await page.waitForSelector(searchResultSelector);
//   await page.click(searchResultSelector);

//   // Locate the full title with a unique string
//   const textSelector = await page.waitForSelector(
//     'text/Customize and automate'
//   );
//   const fullTitle = await textSelector?.evaluate(el => el.textContent);

//   // Print the full title
//   console.log('The title of this blog post is "%s".', fullTitle);

//   await browser.close();
// })();