
import axios from "axios";
import { useEffect, useState } from "react";

const Usersearch = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = user.filter((item) =>
    item.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="container">
        <div className="header">
          <h1>User List</h1>

          <input
            type="text"
            placeholder="Search by username..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="user-detail">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((item) => (
              <div className="user-card" key={item.id}>
                <h3>{item.username}</h3>
                <p>{item.email}</p>
                <p>{item.address.city}</p>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Usersearch;
