import { CatBreed } from "./CatBreedsList";

export const getCatId = (catBreed: CatBreed): string => {
  const { breed } = catBreed;
  const concatenatedId = `${breed.replaceAll(
    " ",
    "_"
  )}${catBreed.country.replaceAll(" ", "_")}`;

  return concatenatedId.toLowerCase();
};
