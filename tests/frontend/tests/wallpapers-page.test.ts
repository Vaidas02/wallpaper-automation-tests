import { getSearchData } from "../../../test-data/search-data";
import { test } from "../fixtures";

test.describe("Test Suite: Search Functionality", { tag: ["@Regression", "@UI", "@WallpapersPage"] }, () => {
    test("TC_01 Verify that users can search for wallpapers using a keyword", { tag: "@Smoke" }, async ({ wallpapersPage }) => {
        const searchData = getSearchData();
        await wallpapersPage.selectSearchCategory();
        await wallpapersPage.fillSearchInput(searchData.searchKeywordNature);
        await wallpapersPage.verifyUrlContainsKeyword(searchData.searchKeywordNature);
        await wallpapersPage.searchKeywordInsideWallpaper(searchData.searchKeywordNature);
    });

    test("TC_02 Verify that free wallpapers and premium wallpapers are correctly labeled", { tag: "@Smoke" }, async ({ wallpapersPage }) => {
        const searchData = getSearchData();
        await wallpapersPage.selectSearchCategory();
        await wallpapersPage.fillSearchInput(searchData.searchKeywordCat);
        await wallpapersPage.verifyUrlContainsKeyword(searchData.searchKeywordCat);
        await wallpapersPage.identifyFirstPremiumWallpaper();
        await wallpapersPage.identifyFirstNonPremiumWallpaper();
    });

    test("TC_03 Verify that users can download a free wallpaper successfully", { tag: "@Smoke" }, async ({ wallpapersPage }) => {
        const searchData = getSearchData();
        await wallpapersPage.selectSearchCategory();
        await wallpapersPage.fillSearchInput(searchData.searchKeywordSun);
        await wallpapersPage.verifyUrlContainsKeyword(searchData.searchKeywordSun);
        await wallpapersPage.identifyFirstNonPremiumWallpaperAndDownload();
    });

    test("TC_04 Verify that free price option filter works", { tag: "@Smoke" }, async ({ wallpapersPage }) => {
        const searchData = getSearchData();
        await wallpapersPage.selectSearchCategory();
        await wallpapersPage.fillSearchInput(searchData.searchKeywordDog);
        await wallpapersPage.verifyUrlContainsKeyword(searchData.searchKeywordDog);
        await wallpapersPage.selectFreeOptionFromDropdown();
        await wallpapersPage.clickLeftCorner();
        await wallpapersPage.verifyButtonFreeIsVisible();
        await wallpapersPage.identifyFirstNonPremiumWallpaper();
    });

    test("TC_05 Verify that paid price option filter works", { tag: "@Smoke" }, async ({ wallpapersPage }) => {
        const searchData = getSearchData();
        await wallpapersPage.selectSearchCategory();
        await wallpapersPage.fillSearchInput(searchData.searchKeywordCar);
        await wallpapersPage.verifyUrlContainsKeyword(searchData.searchKeywordCar);
        await wallpapersPage.selectPaidOptionFromDropdown();
        await wallpapersPage.clickLeftCorner();
        await wallpapersPage.verifyButtonPaidIsVisible();
        await wallpapersPage.identifyFirstPremiumWallpaper();
    });

    test("TC_06 Search for a non-existent keyword", { tag: "@Smoke" }, async ({ wallpapersPage }) => {
        const searchData = getSearchData();
        await wallpapersPage.selectSearchCategory();
        await wallpapersPage.fillSearchInput(searchData.randomNumbers);
        await wallpapersPage.verifyCouldntFindResultsTextIsVisible();
    });

    test("TC_07 Attempt to download a Premium wallpaper without payment", { tag: "@Smoke" }, async ({ wallpapersPage }) => {
        const searchData = getSearchData();
        await wallpapersPage.selectSearchCategory();
        await wallpapersPage.fillSearchInput(searchData.searchKeywordSun);
        await wallpapersPage.verifyUrlContainsKeyword(searchData.searchKeywordSun);
        await wallpapersPage.identifyFirstPremiumWallpaperAndDownload();
        await wallpapersPage.clickBuyForCurrencyButton();
        await wallpapersPage.verifyBuyCreditsButtonIsVisible();
    });
});
