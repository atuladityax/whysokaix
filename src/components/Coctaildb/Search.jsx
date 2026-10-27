import axios from "axios";
import { useState } from "react"


const Search = () => {
    const [search, setSearch] = useState("");
    const [drink , setDrink] = useState([]);

    const SearchDrink = async () => {
        try {
            const response = await 
            axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
            const data = response.data ;
            console.log(JSON.stringify(data,null,2))
            setDrink(data.drinks || []);
        } catch (error) {
            console.log("You Have Some Error",error);
            
        }
    }

    const handlSubmit = (e) => {
       e.preventDefault();
        SearchDrink();
    }

   
  return (
    
    <div>
        <div className="details">
            {drink.length > 0 ? (
                drink.map((item) => (
                <h1 key={item.idDrink}>{item.strDrink}</h1>
         ))
) : (
  <h1>No drinks found</h1>
)}
        </div>
        <form action=""
         onSubmit={handlSubmit}>
            <input type="text"
            placeholder="Search Drink"
            onChange={(e) => setSearch(e.target.value)}/>
         <button type="submit">Search</button>
        </form>

        <div className="container">
            <div className="details">
               <h1>{drink?.strDrink}</h1>
            </div>
        </div>

    </div>
  )
}

export default Search