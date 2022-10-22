import chromium from "@sparticuz/chrome-aws-lambda";

export default async function createPDF(html) {
  let browser = null;
  let res = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
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
    throw err;
  } finally {
    if (browser !== null) {
      // await browser.close();
    }
  }

  return res;
}
