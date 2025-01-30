import { test as base } from "@playwright/test";
import { WallpapersPageAssertions } from "./assertions/wallpapers-page-assertions";

export type Fixtures = {
    wallpapersPage: WallpapersPageAssertions;
};

export const test = base.extend<Fixtures>({
    wallpapersPage: async ({ page }, use) => {
        const wallpapersPage = new WallpapersPageAssertions(page);
        await wallpapersPage.goTo("/ringtones-and-wallpapers");
        await use(wallpapersPage);
    },
});

export { expect } from "@playwright/test";
