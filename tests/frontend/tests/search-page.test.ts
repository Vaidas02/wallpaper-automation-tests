import { getSearchData } from "../../../test-data/search-data";
import { test } from "../fixtures";

test.describe("Test Suite: Search Functionality", { tag: ["@Regression", "@UI", "@SearchPage"] }, () => {
    test("TC_01 Verify that users can search for wallpapers using a keyword", { tag: "@Smoke" }, async ({ ringtonesAndWallapapersPage }) => {
        const searchData = getSearchData();
        await ringtonesAndWallapapersPage.selectSearchCategory();
        await ringtonesAndWallapapersPage.fillSearchInput(searchData.searchKeywordNature);
        await ringtonesAndWallapapersPage.verifyUrlContainsKeyword(searchData.searchKeywordNature);
        await ringtonesAndWallapapersPage.searchKeywordInsideWallpaper(searchData.searchKeywordNature);
    });

    test("TC_02 Verify that free wallpapers and premium wallpapers are correctly labeled", { tag: "@Smoke" }, async ({ ringtonesAndWallapapersPage }) => {
        const searchData = getSearchData();
        await ringtonesAndWallapapersPage.selectSearchCategory();
        await ringtonesAndWallapapersPage.fillSearchInput(searchData.searchKeywordCat);
        await ringtonesAndWallapapersPage.verifyUrlContainsKeyword(searchData.searchKeywordCat);
        await ringtonesAndWallapapersPage.identifyFirstPremiumWallpaper();
        await ringtonesAndWallapapersPage.identifyFirstNonPremiumWallpaper();
    });

    test("TC_03 Verify that users can download a free wallpaper successfully", { tag: "@Smoke" }, async ({ ringtonesAndWallapapersPage }) => {
        const searchData = getSearchData();
        await ringtonesAndWallapapersPage.selectSearchCategory();
        await ringtonesAndWallapapersPage.fillSearchInput(searchData.searchKeywordSun);
        await ringtonesAndWallapapersPage.verifyUrlContainsKeyword(searchData.searchKeywordSun);
        await ringtonesAndWallapapersPage.identifyFirstNonPremiumWallpaperAndDownload();
    });

    test("TC_04 Verify that free price option filter works", { tag: "@Smoke" }, async ({ ringtonesAndWallapapersPage }) => {
        const searchData = getSearchData();
        await ringtonesAndWallapapersPage.selectSearchCategory();
        await ringtonesAndWallapapersPage.fillSearchInput(searchData.searchKeywordDog);
        await ringtonesAndWallapapersPage.verifyUrlContainsKeyword(searchData.searchKeywordDog);
        await ringtonesAndWallapapersPage.selectFreeOptionFromDropdown();
        await ringtonesAndWallapapersPage.clickLeftCorner();
        await ringtonesAndWallapapersPage.verifyButtonFreeIsVisible();
        await ringtonesAndWallapapersPage.identifyFirstNonPremiumWallpaper();
    });

    test("TC_05 Verify that paid price option filter works", { tag: "@Smoke" }, async ({ ringtonesAndWallapapersPage }) => {
        const searchData = getSearchData();
        await ringtonesAndWallapapersPage.selectSearchCategory();
        await ringtonesAndWallapapersPage.fillSearchInput(searchData.searchKeywordCar);
        await ringtonesAndWallapapersPage.verifyUrlContainsKeyword(searchData.searchKeywordCar);
        await ringtonesAndWallapapersPage.selectPaidOptionFromDropdown();
        await ringtonesAndWallapapersPage.clickLeftCorner();
        await ringtonesAndWallapapersPage.verifyButtonPaidIsVisible();
        await ringtonesAndWallapapersPage.identifyFirstPremiumWallpaper();
    });

    test("TC_06 Search for a non-existent keyword", { tag: "@Smoke" }, async ({ ringtonesAndWallapapersPage }) => {
        const searchData = getSearchData();
        await ringtonesAndWallapapersPage.selectSearchCategory();
        await ringtonesAndWallapapersPage.fillSearchInput(searchData.randomNumbers);
        await ringtonesAndWallapapersPage.verifyCouldntFindResultsTextIsVisible();
    });

    test("TC_07 Attempt to download a Premium wallpaper without payment", { tag: "@Smoke" }, async ({ ringtonesAndWallapapersPage }) => {
        const searchData = getSearchData();
        await ringtonesAndWallapapersPage.selectSearchCategory();
        await ringtonesAndWallapapersPage.fillSearchInput(searchData.searchKeywordSun);
        await ringtonesAndWallapapersPage.verifyUrlContainsKeyword(searchData.searchKeywordSun);
        await ringtonesAndWallapapersPage.identifyFirstPremiumWallpaperAndDownload();
        await ringtonesAndWallapapersPage.clickBuyForCurrencyButton();
        await ringtonesAndWallapapersPage.verifyBuyCreditsButtonIsVisible();
    });
});
