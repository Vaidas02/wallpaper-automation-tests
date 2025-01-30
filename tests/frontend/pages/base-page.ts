import { Page } from "@playwright/test";
import environment from "../../../environment";

export default class BasePage {
    readonly page: Page;
    readonly baseUrl = environment.baseUrl;
    readonly consentButton;

    constructor(page: Page) {
        this.page = page;
        this.consentButton = page.getByLabel("Consent", { exact: true });
    }

    async goTo(urlPath?: string): Promise<void> {
        await this.page.goto(`${this.baseUrl}${urlPath ? urlPath : ""}`);
        await this.consentButton.click();
    }
}
