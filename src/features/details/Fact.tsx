import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFact } from "../../api/api";

type Fact = {
  fact: string;
  length: number;
};

type Loading = {
  state: "loading";
};

type Success = {
  state: "success";
  data: Fact;
};

type Error = {
  state: "error";
  errorMessage: string;
};

type FactState = Loading | Success | Error;

export const Fact = () => {
  const [state, setState] = useState<FactState>({ state: "loading" });
  const { breed } = useParams();

  useEffect(() => {
    getFact()
      .then((data) => {
        setState({ state: "success", data: data });
      })
      .catch((e) => setState({ state: "error", errorMessage: e.message }));
  }, []);

  if (state.state === "loading") {
    return <div data-testid="fact-loading">Loading....</div>;
  }

  if (state.state === "error") {
    return (
      <div data-testid="fact-error">
        Some error happened: {state.errorMessage}{" "}
      </div>
    );
  }

  return (
    <div data-testid="fact-success">
      <p>Fact: {state.data.fact}</p>
      <p>Breed: {breed}</p>
      <p>Length: {state.data.length}</p>
      <Link to="/">Take me back!</Link>
    </div>
  );
};
