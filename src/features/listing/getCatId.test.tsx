import { getCatId } from "./getCatId";

const BREED_MOCK = {
  breed: "Abyssinian",
  country: "Ethiopia",
  origin: "Natural/Standard",
  coat: "Short",
  pattern: "Ticked",
};

const BREED_MOCK_SPACES = {
  breed: "American Curl",
  country: "United States",
  origin: "Mutation",
  coat: "Short/Long",
  pattern: "All",
};

describe("getCatId", () => {
  test("base scenario", () => {
    expect(getCatId(BREED_MOCK)).toBe("abyssinianethiopia");
  });

  test("working with spaces", () => {
    expect(getCatId(BREED_MOCK_SPACES)).toBe("american_curlunited_states");
  });
});
