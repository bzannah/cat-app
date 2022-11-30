export const getCatBreeds = async () => {
  const response = await fetch("https://catfact.ninja/breeds");
  return response.json();
};

export const getFact = async () => {
  const response = await fetch("https://catfact.ninja/fact");
  return response.json();
};
