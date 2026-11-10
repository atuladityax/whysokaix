import { useEffect, useState } from "react"
import { UserContext } from "./UserContext";
import axios from "axios";


const UserProvider = ( {children} ) => {
    const [random, setRandom] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
 const getCocktail = async () => {
        try {
            const response = await axios.get(
                "https://www.thecocktaildb.com/api/json/v1/1/random.php",
            );

            const data = response.data;
            console.log(JSON.stringify(data,null,2))
            setRandom(data);
        } catch (error) {
            console.error("It Not Able to Fetch Right Now ", error);
            }
            };

    /// First API Call 
    useEffect(() =>{
       
    getCocktail();
        },[]);

    /// Second API Call
    
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


  return (
    <>
       <UserContext.Provider value={{random , drinks , loading ,getCocktail}} >
            {children}
       </UserContext.Provider>
    </>
  )
}

export default UserProvider