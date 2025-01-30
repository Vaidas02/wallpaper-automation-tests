import { expect, Page } from "@playwright/test";
import { RingtonesAndWallapapersPage } from "../pages/ringtones-and-wallpapers-page";

export class RingtonesAndWallapapersPageAssertions extends RingtonesAndWallapapersPage {
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
