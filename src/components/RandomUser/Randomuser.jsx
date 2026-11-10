
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import "../RandomUser/RandomUser.css";

const Randomuser = () => {

  const {random} = useContext(UserContext)
  
  return (
    <div className="container">
      <div className="card-detail">
        {random && (
          <>
            <div className="logo">
              <img src={random.picture.medium} alt="User profile" />
            </div>
            <div className="user-detail">
              <h3>
                {random.name.first} {random.name.last}
              </h3>
              <p>{random.email}</p>
              <p>{random.location.country}</p>
            </div>
          </>
        )}
      </div>
      <button >Random User</button>
    </div>
  );
};
export default Randomuser;
