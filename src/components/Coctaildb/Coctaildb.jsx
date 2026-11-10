import { useContext } from "react";
import "./Coctaildb.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const Coctaildb = () => {
  const navigate = useNavigate("");

  const { random , getCocktail } = useContext(UserContext);

  console.log(random);

  if (!random) {
    return (
      <main className="random-page">
        <p className="random-loading">Finding a drink for you...</p>
      </main>
    );
  }
  const drink = random.drinks[0];
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
        <button onClick={() => navigate("/")}>Back</button>
        <button onClick={() =>getCocktail() } className="random-drink-button">Discover another drink</button>
      </div>
    </div>
  );
};

export default Coctaildb;
