import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PopularDrinks from "./components/Coctaildb/PopularDrinks";
import ShowIngred from "./components/Coctaildb/showIngred";
import Cocktail from "./components/Coctaildb/Coctaildb";
import Search from "./components/Coctaildb/Search";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PopularDrinks />} />
          <Route path="/ingredient/:id" element={<ShowIngred />} />
          <Route path="/random" element={<Cocktail />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
