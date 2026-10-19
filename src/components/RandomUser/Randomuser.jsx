import axios from "axios";
import { useState } from "react";
import "../RandomUser/RandomUser.css";

const Randomuser = () => {
  const [user, setUser] = useState(null);

  const randomuser = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api");
      const userData = response.data.results[0];
      console.log(userData);
      setUser(userData);
    } catch (error) {
      alert("Error Fetching error");
      console.log("Error fetching user:", error);
    }
  };
  return (
    <div className="container">
      <div className="card-detail">
        {user && (
          <>
            <div className="logo">
              <img src={user.picture.medium} alt="User profile" />
            </div>
            <div className="user-detail">
              <h3>
                {user.name.first} {user.name.last}
              </h3>
              <p>{user.email}</p>
              <p>{user.location.country}</p>
            </div>
          </>
        )}
      </div>
      <button onClick={randomuser}>Random User</button>
    </div>
  );
};
export default Randomuser;
