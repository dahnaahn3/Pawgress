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
    <div style={{ marginLeft: "20rem", marginTop: "-45rem" }}>
      <table class="w-full max-w mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
          <NavLink to="./form">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Create a new pet
            </button>
          </NavLink>
          <tr className="dark:bg-gray-700">
            <th className="p-5">Name</th>
            <th className="p-5">Breed</th>
            <th className="p-5">Gender</th>
            <th className="p-5">Age</th>
            <th className="p-5">Picture</th>
            <th className="p-5">Size</th>
            <th className="p-5">Weight</th>
            <th className="p-5">Diet</th>
            <th className="p-5">Owner</th>
          </tr>
        </thead>
        <tbody className="border-b dark:bg-gray-900 dark:border-gray-700">
          {users.map((user) => {
            return pets.map((pet) => {
              if (user.id === pet.owner_id) {
                let owner = `${user.first_name} ${user.last_name}`;

                return (
                  <tr key={pet.pet_id}>
                    <td>
                      <NavLink
                        className="bg-blue-200 text-black active:bg-blue-500
                          font-bold px-6 py-3 rounded
                        shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        to={`${pet.pet_id}`}
                        key={pet.pet_id}
                      >
                        {pet.name}
                      </NavLink>
                    </td>
                    <td className="px-3 py-2">{pet.breed}</td>
                    <td className="px-3 py-2">{pet.gender}</td>
                    <td className="px-3 py-2">{pet.age}</td>
                    <td className="px-3 py-2">
                      <img
                        className="img-fluid w-100 h-100"
                        style={{ maxWidth: "200px", maxHeight: "150px" }}
                        src={pet.picture}
                      />
                    </td>
                    <td className="px-3 py-2">{pet.size}</td>
                    <td className="px-3 py-2">{pet.weight}</td>
                    <td className="px-3 py-2">{pet.diet}</td>
                    <td className="px-3 py-2">{owner}</td>
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
