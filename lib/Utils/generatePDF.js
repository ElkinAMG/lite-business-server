import chromium from "chrome-aws-lambda";
const puppeteer = chromium.puppeteer;

export default async function createPDF(html) {
  let browser = null;
  let res = null;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: true,
      defaultViewport: { width: 1280, height: 800 },
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "domcontentloaded",
    });

    // Saves a file
    // await page.pdf({ format: "a4", path: `${__dirname}/inventory.pdf` });

    // Generates a pdf buffer
    res = await page.pdf({ format: "a4" });
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    browser.close();
  }

  return res;
}
