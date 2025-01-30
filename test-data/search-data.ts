import { faker } from "@faker-js/faker";

export interface SearchData {
    readonly searchKeywordNature: string;
    readonly searchKeywordCat: string;
    readonly searchKeywordSun: string;
    readonly randomNumbers: string;
    readonly searchKeywordCar: string;
    readonly searchKeywordDog: string;
}

export function getSearchData(): SearchData {
    return {
        searchKeywordNature: "Nature",
        searchKeywordCat: "Cat",
        searchKeywordSun: "Sun",
        randomNumbers: faker.string.numeric(6),
        searchKeywordCar: "Car",
        searchKeywordDog: "Dog",
    };
}
