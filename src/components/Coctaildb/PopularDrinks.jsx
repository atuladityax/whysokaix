import axios from "axios";
import { useEffect, useState } from "react";
import "./Coctaildb.css";
import { useNavigate } from "react-router-dom";

const AllDrinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
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
        <p>THE COCKTAIL GUIDE</p>
        <h1>Explore all drinks</h1>
        <span>{drinks.length} cocktails to discover</span>
      </header>

      <div className="drink-grid">
        {drinks.map((drink) => (
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