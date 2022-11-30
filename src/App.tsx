import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Fact } from "./features/details/Fact";
import { CatBreedsList } from "./features/listing/CatBreedsList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CatBreedsList />} />
          <Route path="/fact/:breed" element={<Fact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
