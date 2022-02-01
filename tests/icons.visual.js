const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

const pkg = require('../package.json');

describe(`Icon`, () => {
  it(`should be set to the right default height`, async() => {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(pkg.localURL+'/foundations/icons#visualtest')
    
    await page.setViewport({ width: 375, height: 800 })

    const iconHeight = await page.$eval(
      '#icon-email .icon',
      (el) => parseInt(window.getComputedStyle(el).getPropertyValue("height"))
    )
    const iconWidth = await page.$eval(
      '#icon-email .icon',
      (el) => parseInt(window.getComputedStyle(el).getPropertyValue("width"))
    )
    
    expect(iconHeight).toBe(64);
    expect(iconWidth).toBe(64);
    await browser.close()
  });


  it(`fill and stroke set correctly`, async() => {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(pkg.localURL+'/foundations/icons#visualtest')
    
    await page.setViewport({ width: 375, height: 800 })

    function rgbToHex(hex){

      function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }

      function stichTogether(r, g, b) {
        var hex = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        return hex.toLocaleLowerCase();
      }
      var hexSplit = hex.split(",");

      var r = parseInt(hexSplit[0].replace('rgb(',''));
      var g = parseInt(hexSplit[1]);
      var b = parseInt(hexSplit[2].replace(')',''));

      return stichTogether(r, g, b); 
    }

    const iconFill = await page.$eval(
      '#icon-email .icon use',
      (el) => window.getComputedStyle(el).getPropertyValue("fill")
    )
    
    expect(rgbToHex(iconFill)).toBe('#00313c');

    await browser.close()
  });
})

describe(`Icons page`, () => {
  it(`It should render correctly.`, async(done) => {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(pkg.localURL+'/foundations/icons#visualtest')
    
    await page.setViewport({ width: 375, height: 800 })
    const mobileImage = await page.screenshot({ fullPage: true });
    expect(mobileImage).toMatchImageSnapshot({ allowSizeMismatch: true, customDiffConfig: { threshold: 0.5 } });

    await page.setViewport({ width: 768, height: 800 })
    const tabletImage = await page.screenshot({ fullPage: true });
    expect(tabletImage).toMatchImageSnapshot({ allowSizeMismatch: true, customDiffConfig: { threshold: 0.5 } });

    await page.setViewport({ width: 1440, height: 800 })
    const desktopImage = await page.screenshot({ fullPage: true });
    expect(desktopImage).toMatchImageSnapshot({ allowSizeMismatch: true, customDiffConfig: { threshold: 0.5 } });

    done()
  });
});
