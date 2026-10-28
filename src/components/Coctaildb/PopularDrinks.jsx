import axios from "axios";
import { useEffect, useState } from "react";
import "./Coctaildb.css";
import { useNavigate } from "react-router-dom";

const AllDrinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search , setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    const getAllDrinks = async () => {
      const letters = "abcdefghijklmnopqrstuvwxyz".split("");

      try {
        const responses = await Promise.all(
          letters.map((letter) =>
            axios.get(
              `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`,
            ),
          ),
        );

        const allDrinks = responses.flatMap(
          (res) => res.data.drinks || [],
        );

        setDrinks(allDrinks);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllDrinks();
  }, []);

  const filteredDrinks = drinks.filter((drink) => {
  const matchesSearch = drink.strDrink
    .toLowerCase()
    .includes(search.trim().toLowerCase());
  const matchesLetter =
    selectedLetter === "" ||
    drink.strDrink.toUpperCase().startsWith(selectedLetter);
  return matchesSearch && matchesLetter;
});

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  if (loading) {
    return (
      <main className="popular-drinks-page">
        <p className="popular-drinks-loading">Loading drinks...</p>
      </main>
    );
  }

  return (
    <>
    
    <main className="popular-drinks-page">
      <header className="popular-drinks-header">
        <div className="browse-letters">
        <p>Browse By Name</p>
        <button
         className={selectedLetter === "" ? "active" : ""}
         onClick={() => setSelectedLetter("")}>
         All
         </button>
        {alphabet.map((letter) => (
        <button
        key={letter}
        className={selectedLetter === letter ? "active" : ""}
        onClick={() => setSelectedLetter(letter)}
        >
      {letter}
    </button>
  ))}
</div>
       <div className="left">
         <p>THE COCKTAIL GUIDE</p>
        <h1>Explore all drinks</h1>
        <span>{filteredDrinks.length} cocktails to discover</span>
       </div>
       <div className="right">
       <form onSubmit={(e) => e.preventDefault()} action="">
         <input type="text" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
       </form>
       </div>
      </header>

      <div className="drink-grid">
        {filteredDrinks.map((drink) => (
          <div className="drink-card" key={drink.idDrink}>
            <img
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
              width="200"
              onClick={() =>
                navigation("/ingredient/" + drink.idDrink)
              }
            />
            <div className="drink-card-content">
              <h2>{drink.strDrink}</h2>
              {drink.strCategory && (
                <p className="drink-card-category">{drink.strCategory}</p>
              )}
              {drink.strInstructions && (
                <p className="drink-card-instructions">
                  {drink.strInstructions}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
    </>
  );
};

export default AllDrinks;