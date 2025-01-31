import { Locator, Page } from "@playwright/test";
import BasePage from "./base-page";
import { ElementRole } from "../../../utils/enum/locators-enum";

export class WallpapersPage extends BasePage {
    override readonly page: Page;
    readonly searchCategoryDropdownButton: Locator;
    readonly wallpaperRadioButton: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly wallpapers: Locator;
    readonly downloadButton: Locator;
    readonly couldntFindResultsHeader: Locator;
    readonly buyForCurrencyButton: Locator;
    readonly buyCreditsButton: Locator;
    readonly priceButton: Locator;
    readonly freeOption: Locator;
    readonly paidOption: Locator;
    readonly buttonFree: Locator;
    readonly buttonPaid: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.searchCategoryDropdownButton = page.getByRole(ElementRole.Main).getByRole(ElementRole.Button, { name: "All" });
        this.wallpaperRadioButton = page.getByRole(ElementRole.MenuItemRadio, { name: "Wallpapers" });
        this.searchInput = page.locator("//div[@data-size='large']//input[@id='search']");
        this.searchButton = page.getByRole(ElementRole.Main).getByRole(ElementRole.Button, { name: "Search" });
        this.wallpapers = page.locator("//body/div[2]/main[1]/div[1]/div[1]/div[1]/div[2]/a");
        this.downloadButton = this.page.getByRole(ElementRole.Button, { name: "Download Free" });
        this.couldntFindResultsHeader = page.getByRole(ElementRole.Heading, { name: "Oops, couldn’t find it" });
        this.buyForCurrencyButton = page.getByRole(ElementRole.Button, { name: "Buy for Ƶ" });
        this.buyCreditsButton = page.getByRole(ElementRole.Button, { name: "Buy Credits" });
        this.priceButton = page.getByRole(ElementRole.Button, { name: "Price" });
        this.freeOption = page.getByRole(ElementRole.Option, { name: "Free" });
        this.paidOption = page.getByRole(ElementRole.Option, { name: "Paid" });
        this.buttonFree = page.getByRole(ElementRole.Button, { name: "Free" });
        this.buttonPaid = page.getByRole(ElementRole.Button, { name: "Paid" });
    }

    async selectSearchCategory() {
        await this.searchCategoryDropdownButton.click();
        await this.wallpaperRadioButton.click();
    }

    async fillSearchInput(keyword: string) {
        await this.searchInput.fill(keyword);
        await this.searchButton.click();
    }

    async clickBuyForCurrencyButton() {
        await this.buyForCurrencyButton.click();
    }

    async selectFreeOptionFromDropdown() {
        await this.priceButton.click();
        await this.freeOption.click();
    }

    async selectPaidOptionFromDropdown() {
        await this.priceButton.click();
        await this.paidOption.click();
    }

    async searchKeywordInsideWallpaper(keyword: string) {
        keyword = keyword.toLowerCase().trim();

        const count = await this.wallpapers.count();
        for (let i = 0; i < count; i++) {
            const wallpaper = this.wallpapers.nth(i);
            const title = (await wallpaper.getAttribute("title")) || "";
            const ariaLabel = (await wallpaper.getAttribute("aria-label")) || "";

            const labelText = `${title} ${ariaLabel}`.toLowerCase().trim();
            if (labelText.includes(keyword)) {
                return wallpaper;
            }
        }
        return null;
    }

    async identifyWallpaperByPremiumStatus(isPremium: boolean) {
        const count = await this.wallpapers.count();

        for (let i = 0; i < count; i++) {
            const wallpaper = this.wallpapers.nth(i);
            const hasPremiumBadge = await wallpaper.locator("span[data-icon='true'][data-child='true']").first().isVisible();
            const hasPremiumCrown = await wallpaper.locator("span[data-icon='true'][data-child='false']").first().isVisible();

            if (isPremium === (hasPremiumBadge && hasPremiumCrown)) {
                return wallpaper;
            }
        }
        return null;
    }

    async identifyFirstPremiumWallpaper() {
        return this.identifyWallpaperByPremiumStatus(true);
    }

    async identifyFirstNonPremiumWallpaper() {
        return this.identifyWallpaperByPremiumStatus(false);
    }

    async identifyAndDownloadWallpaper(isPremium: boolean) {
        const wallpaper = await this.identifyWallpaperByPremiumStatus(isPremium);

        if (!wallpaper) return null;

        await wallpaper.click();

        if (!isPremium) {
            await this.downloadButton.waitFor({ state: "visible" });

            const downloadPromise = this.page.waitForEvent("download");
            await this.downloadButton.click();

            const download = await downloadPromise;
            return await download.path();
        }
    }

    async identifyFirstPremiumWallpaperAndDownload() {
        return this.identifyAndDownloadWallpaper(true);
    }

    async identifyFirstNonPremiumWallpaperAndDownload() {
        return this.identifyAndDownloadWallpaper(false);
    }

    async clickLeftCorner() {
        const viewport = this.page.viewportSize();
        if (!viewport) return;

        await this.page.mouse.click(0, viewport.height / 2);
    }
}
