import React, { useEffect, useState } from "react";
import { NavLink, Outlet, Link} from "react-router-dom";


function PetsList() {
  const [pets, setPets] = useState([]);
  const [users, setUsers] = useState([]);


  const fetchData = async () => {
    const petsURL = "http://localhost:8000/api/pets";
    const userURL = "http://localhost:8000/api/accounts";
    const response = await Promise.all([fetch(petsURL), fetch(userURL)]);
    const petsData = await response[0].json();
    const usersData = await response[1].json();
    setPets(petsData);
    setUsers(usersData);
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div
      className="plist-container"
      style={{ paddingLeft: "20rem", marginTop: "-50rem" }}
    >
      <header class="plist-ext">
        <h2 class="plist-h2">
          Our friends with four legs 🐾
        </h2>
        <NavLink to="./form">
          <button class="new-pet-button">
            Create a new pet
          </button>
        </NavLink>
      </header>
      <table class="plist-box">
        <thead class="plist-main-row">
          <tr>
            <th className="plist-cat">Name</th>
            <th className="plist-cat">Breed</th>
            <th className="plist-cat">gender</th>
            <th className="plist-cat">age</th>
            <th className="plist-cat">picture</th>
            <th className="plist-cat">size</th>
            <th className="plist-cat">weight</th>
            <th className="plist-cat">diet</th>
            <th className="plist-cat">owner</th>
          </tr>
        </thead>
        <tbody className="info-border">
          {users.map((user) => {
            return pets.map((pet) => {
              if (user.id === pet.owner_id) {
                let owner = `${user.first_name} ${user.last_name}`;

                return (
                  <tr key={pet.id}>
                    <td>
                      <NavLink className="nav-name-active" type="button" to={`${pet.pet_id}`} key={pet.pet_id}>
                        {pet.name}
                      </NavLink>
                    </td>

                    <td className="plist-info">{pet.breed}</td>
                    <td className="plist-info">{pet.gender}</td>
                    <td className="plist-info">{pet.age}</td>
                    <td className="plist-info">
                      <img
                        className="p-image"
                        style={{ maxWidth: "200px", maxHeight: "150px" }}
                        src={pet.picture}
                      />
                    </td>
                    <td className="plist-info">{pet.size}</td>
                    <td className="plist-info">{pet.weight}</td>
                    <td className="plist-info">{pet.diet}</td>
                    <td className="plist-info">{owner}</td>
                  </tr>
                );
              }
              return null;
            });
          })}
        </tbody>
      </table>
      <Outlet />
    </div>
  );
}

export default PetsList;
