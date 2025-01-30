import { expect, Page } from "@playwright/test";
import { WallpapersPage as WallpapersPage } from "../pages/wallpapers-page";

export class WallpapersPageAssertions extends WallpapersPage {
    override readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async verifyUrlContainsKeyword(keyword: string) {
        await expect(this.page).toHaveURL(new RegExp(`${keyword}`, "i"));
    }

    async verifyCouldntFindResultsTextIsVisible() {
        await expect(this.couldntFindResultsHeader).toBeVisible();
    }

    async verifyBuyCreditsButtonIsVisible() {
        await expect(this.buyCreditsButton).toBeVisible();
    }

    async verifyButtonFreeIsVisible() {
        await expect(this.buttonFree).toBeVisible();
    }

    async verifyButtonPaidIsVisible() {
        await expect(this.buttonPaid).toBeVisible();
    }
}
