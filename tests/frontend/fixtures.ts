import { test as base } from "@playwright/test";
import { RingtonesAndWallapapersPageAssertions } from "./assertions/ringtones-and-wallapapers-page-assertions";

export type Fixtures = {
    ringtonesAndWallapapersPage: RingtonesAndWallapapersPageAssertions;
};

export const test = base.extend<Fixtures>({
    ringtonesAndWallapapersPage: async ({ page }, use) => {
        const ringtonesAndWallapapersPage = new RingtonesAndWallapapersPageAssertions(page);
        await ringtonesAndWallapapersPage.goTo("/ringtones-and-wallpapers");
        await use(ringtonesAndWallapapersPage);
    },
});

export { expect } from "@playwright/test";
