import { NextApiRequest, NextApiResponse } from 'next';
import { chromium, Page, Response } from 'playwright';

let res: any[] = []

const checkJson = (response: Response) => {
    // if (response.url().includes("src=initial_load")) {
    //     response.json().then((json) => {
    //         console.log(json);
    //         res = json
    //     });
    // }
    console.log(response.url());

}

const scrapeNotionData = async (page: Page) => {
    const url = "https://prototypist.notion.site/prototypist/dfedac384a2b494c9137be7638b11e93?v=11769ac8c9764aafb907fe3d65fb0c50";

    await page.goto(url);

    page.on("response", (response) => checkJson(response))

    await Promise.all([
        page.waitForSelector(".notion-board-group"),
        page.waitForSelector(".notion-collection-item"),
        page.waitForLoadState("networkidle")
    ]);

    for (let index = 0; index < 5; index++) {
        const prevScrollHeight = await page.evaluate(() => document.body.scrollHeight);
        await page.evaluate(() => {
            window.scrollBy(0, 1000);
        });
        await page.waitForTimeout(3000);
        console.log(prevScrollHeight);
    }


    const [groupElements, collectionElements] = await Promise.all([
        page.$$(".notion-board-group"),
        page.$$(".notion-collection-item")
    ]);

    const groups = await Promise.all(groupElements.map((group) => group.textContent()));
    const collections = await Promise.all(collectionElements.map((collection) => collection.textContent()));

    const result = {
        groups: groups.map((value) => value?.split("Drag image to reposition")),
        collections,
        res
    };

    return result;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        const scrapedData = await scrapeNotionData(page);
        res.status(200).json(scrapedData);
    } catch (error) {
        console.error("Error scraping data:", error);
        res.status(500).json({ error: "An error occurred while scraping data" });
    } finally {
        await browser.close();
    }
};