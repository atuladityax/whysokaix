import axios from "axios";
import { useEffect, useState } from "react";
import "./Coctaildb.css";
import { useNavigate } from "react-router-dom";

const AllDrinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const navigate = useNavigate();
  const[state,setState] = useState("")

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    const getAllDrinks = async () => {
      try {
        const responses = await Promise.all(
          alphabet.map((letter) =>axios.get(
              `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`,
            ),
          ),
        );
        setDrinks(responses.flatMap((res) => res.data.drinks || []));
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllDrinks();
  }, []);
  const handleNavigate = (data)=>{
    setState(data)
navigate("/ingredient/" + data.idDrink)

  }
  const filteredDrinks = drinks.filter((drink) => {
    const name = drink.strDrink.toLowerCase();
    return (
      name.includes(search.toLowerCase()) 
      &&
      name.startsWith(selectedLetter.toLowerCase())
    );
  });
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSelectedLetter("");
  };

  if (loading) {
    return (
      <main className="popular-drinks-page">
        <p className="popular-drinks-loading">Loading drinks...</p>
      </main>
    );
  }

  return (
    <main className="popular-drinks-page">
      <header className="popular-drinks-header">
        <div className="left">

          <p>THE COCKTAIL GUIDE</p>
          <h1>Explore all drinks</h1>
          <span>{filteredDrinks.length} cocktails to discover</span>
        </div>

        <div className="random">
         <button onClick={() => navigate("/random")}>
          Random Drink 
         </button>
        </div>

        <div className="right">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search drink"
          value={search}
          onChange={handleSearch}/>
          </form>
        </div>

        <div className="browse-letters">
          <p>Browse By Name</p>
          <button
            className={selectedLetter === "" ? "active" : ""}
            onClick={() => setSelectedLetter("")}
          >
            All
          </button>
          {alphabet.map((letter) => (
            <button
              
              className={selectedLetter === letter ? "active" : ""}
              onClick={() => setSelectedLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </header>

      <div className="drink-grid">
      {filteredDrinks.map((drink) => (
        <div className="drink-card"
        role="button"
        onClick={() =>handleNavigate(drink) }
        >
            <img
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
              
              />
              <div className="drink-card-content">
              <h2>{drink.strDrink}</h2>
              
              {drink.strCategory && (
                <p className="drink-card-category">{drink.strCategory}
                </p>)}
              {drink.strInstructions && 
              (<p className="drink-card-instructions">
                  {drink.strInstructions}
                </p>
              )}
            </div>
          </div>
        ))}
        < Abc data={state} />
      </div>
    </main>
  );
};

export default AllDrinks;

function Abc(props){
  props.data
}