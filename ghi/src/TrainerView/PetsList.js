import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

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
          className="overflow-x-auto"
          style={{ paddingLeft: "20rem", marginTop: "-50rem" }}
        >
          <header class="px-5 py-4 border-b border-gray-100">
            <h2 class="font-semibold text-gray-800">
              Our friends with four legs 🐾
            </h2>
          </header>
          <table class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr className="dark:bg-gray-700">
                <th className="p-5">Name</th>
                <th className="p-5">Breed</th>
                <th className="p-5">gender</th>
                <th className="p-5">age</th>
                <th className="p-5">picture</th>
                <th className="p-5">size</th>
                <th className="p-5">weight</th>
                <th className="p-5">diet</th>
                <th className="p-5">owner</th>
              </tr>
            </thead>
            <tbody className="border-b dark:bg-gray-900 dark:border-gray-700">
              {users.map((user) => {
                return pets.map((pet) => {
                  if (user.id === pet.owner_id) {
                    let owner = `${user.first_name} ${user.last_name}`;

                    return (
                      <tr key={pet.id}>
                        <td
                          style={{ textDecoration: "underline" }}
                          className="px-3 py-2"
                        >
                          <NavLink to={`${pet.pet_id}`} key={pet.pet_id}>
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
                  return null; // Return null if the user is not the owner of the pet
                });
              })}
            </tbody>
          </table>
          <Outlet />
        </div>
      );
}

export default PetsList;
