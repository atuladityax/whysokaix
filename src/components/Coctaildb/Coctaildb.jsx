import axios from "axios";
import { useEffect, useState } from "react";
import "./Coctaildb.css";

const Coctaildb = () => {
  const [drinks, setDrinks] = useState(null);
  const getCocktail = async () => {
    try {
      const response = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php",
      );

      const data = response.data;
      setDrinks(data);
    } catch (error) {
      console.error("It Not Able to Fetch Right Now ", error);
    }
  };
  useEffect(() => {
    getCocktail();
  }, []);

  if (!drinks) {
    return (
      <main className="random-page">
        <p className="random-loading">Finding a drink for you...</p>
      </main>
    );
  }
  const drink = drinks.drinks[0];
  return (
    <div className="random-page">
      <header className="random-header">
        <p>THE COCKTAIL GUIDE</p>
        <h1>Today's pour</h1>
      </header>
      <section className="random-drink">
        <img
          className="random-drink-photo"
          src={`${drink.strDrinkThumb}/small`}
          alt={drink.strDrink}
        />
        <div className="random-drink-content">
          <p className="random-drink-eyebrow">A drink to discover</p>
          <h2>{drink.strDrink}</h2>
          {drink.strCategory && (
            <p className="random-drink-category">{drink.strCategory}</p>
          )}
          <p className="random-drink-instructions">{drink.strInstructions}</p>
        </div>
      </section>
      <div className="random-drink-actions">
        <button className="random-drink-button" onClick={getCocktail}>
          Discover another drink
        </button>
      </div>
    </div>
  );
};

export default Coctaildb;
