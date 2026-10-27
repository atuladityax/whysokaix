import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Coctaildb.css";

const ShowIngred = () => {
  const [ingredients, setIngredients] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getIngredient = async () => {
      try {
        const response = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const data = response.data;
        console.log(JSON.stringify(data,2,null))
        setIngredients(response.data);
      } catch (error) {
        console.log("You Having Some Error", error);
      }
    };

    getIngredient();
  }, [id]);

   const drink = ingredients?.drinks?.[0];
    if (!drink) return <p>Loading...</p>;

  const getsIngredients = (drink) => {
    const list = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient) {
        list.push(`${measure ? measure.trim() : ""} ${ingredient}`.trim());
      }
    }
    return list;
  };


  return (
    <>
      <div className="container ingredient-page">
        <div className="ingredient-header">
          <p>THE COCKTAIL GUIDE</p>
          <h1>Discover your drink</h1>
        </div>
        <div className="ingredient-details">
          <h1>{drink.strDrink}</h1>
          <img
            className="ingredient-photo"
            src={`${drink.strDrinkThumb}/medium`}
            alt={drink.strDrink}
          />
          <ul className="ingredient-grid">
            {getsIngredients(drink).map((item ,index) => (
                 <li key={index}> {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ShowIngred;
