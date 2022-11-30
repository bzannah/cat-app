import { useEffect, useState } from "react";
import { getCatBreeds } from "../../api/api";
import styled from "styled-components";
import { getCatId } from "./getCatId";
import { Link } from "react-router-dom";

export type CatBreed = {
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
};

type Loading = {
  state: "loading";
};

type Success = {
  state: "success";
  data: CatBreed[];
};

type Error = {
  state: "error";
  errorMessage: string;
};

type CatBreedsListState = Loading | Success | Error;

const StyledCat = styled.div`
  border-radius: 20px;
  border: 1px solid #ccc;
  width: 500px;
  margin: 20px;
`;

export const CatBreedsList = () => {
  const [state, setState] = useState<CatBreedsListState>({ state: "loading" });

  useEffect(() => {
    getCatBreeds()
      .then((data) => {
        setState({ state: "success", data: data.data });
      })
      .catch((e) => setState({ state: "error", errorMessage: e.message }));
  }, []);

  if (state.state === "loading") {
    return <div>Loading....</div>;
  }

  if (state.state === "error") {
    return <div>Some error happened: {state.errorMessage} </div>;
  }

  return (
    <div>
      {state.data.map((catBreed) => (
        <StyledCat key={getCatId(catBreed)}>
          <div>Breed: {catBreed.breed}</div>
          <div>Country: {catBreed.country}</div>
          <div>Origin: {catBreed.origin}</div>
          <Link to={`/fact/${catBreed.breed}`}>Click me!</Link>
        </StyledCat>
      ))}
    </div>
  );
};
