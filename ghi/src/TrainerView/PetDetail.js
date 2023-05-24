import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function PetDetail() {
  const { pet_id } = useParams();
  const [pets, setPets] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const petsURL = `http://localhost:8000/api/pets/${pet_id}`;
    const usersURL = "http://localhost:8000/api/accounts";
    const response = await Promise.all([fetch(petsURL), fetch(usersURL)])
      const petsData = await response[0].json();
      const usersData = await response[1].json()
      setPets(petsData);
      setUsers(usersData)
      console.log(petsData, usersData)
    }

  useEffect(() => {
    fetchData();
  }, [pet_id]);

  let genderIcon;
  let gender=pets.gender
  if (gender === "m") {
    genderIcon = "https://img.icons8.com/parakeet/48/male.png";
  } else if (gender === "f") {
    genderIcon = "https://img.icons8.com/parakeet/48/female.png";
  }

    let owner = ""; // Initialize owner variable outside the loop
    users.map((user) => {
      if (user.id === pets.owner_id) {
        owner = `${user.first_name} ${user.last_name}`; // Assign value to owner
      }
    });

  return (
    <div style={{ paddingLeft: "30rem", marginTop: "-50rem" }}>
      <div className="min-h-screen flex justify-center items-center">
        <div className="max-w-xs container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
          <div>
            <Link to="/trainer/pets" >
              <span className="text-white text-xs font-bold rounded-lg bg-green-500 inline-block mt-4 ml-25 py-1.5 px-4 cursor-pointer">
                Back to list
              </span>
            </Link>

            <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100">
              {pets.name}
            </h1>
            <p className="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer">
              {pets.breed}
            </p>
          </div>
          <img className="w-full cursor-pointer" src={pets.picture} alt="" />
          <div className="flex p-4 justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-gray-800 font-bold cursor-pointer">
                Age: {pets.age}
              </h2>
            </div>
            <div className="flex space-x-2">
              {genderIcon && <img src={genderIcon} alt="Gender Icon" />}
            </div>
          </div>
          <p className="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer">
            Weight: {pets.weight}
          </p>
          <p className="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer">
            Diet: {pets.diet}
          </p>
          <p className="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer">
            Size: {pets.size}
          </p>
          <p className="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer">
            Owner: {owner}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PetDetail;
