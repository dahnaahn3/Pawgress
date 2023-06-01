import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";


function PetDetail() {
  const { pet_id } = useParams();
  const [pets, setPets] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const petsURL = `http://localhost:8000/api/pets/${pet_id}`;
    const usersURL = "http://localhost:8000/api/accounts";
    const response = await Promise.all([fetch(petsURL), fetch(usersURL)]);
    const petsData = await response[0].json();
    const usersData = await response[1].json();
    setPets(petsData);
    setUsers(usersData);
    console.log(petsData, usersData);
  };

  useEffect(() => {
    fetchData();
  }, [pet_id]);

  let genderIcon;
  let gender = pets.gender;
  if (gender === "M") {
    genderIcon = "https://img.icons8.com/parakeet/48/male.png";
  } else if (gender === "F") {
    genderIcon = "https://img.icons8.com/parakeet/48/female.png";
  }

  let owner = ""; // Initialize owner variable outside the loop
  users.map((user) => {
    if (user.id === pets.owner_id) {
      owner = `${user.first_name} ${user.last_name}`; // Assign value to owner
    }
  });

  return (
    <div style={{ paddingLeft: "20rem", marginTop: "-30rem" }}>
      <div className="detail-container">
        <div className="card-container">
          <div>

            <Link to="/trainer/pets" >
              <span className="back-button">
                Back to list
              </span>
            </Link>

            <h1 className="pet-name">
              {pets.name}
            </h1>
            <p className="row-text">
              {pets.breed}
            </p>
          </div>

          <img className="image" src={pets.picture} alt="" />
          <div className="h2-container">
            <div className="age-flex">
              <h2 className="age-font">
                Age: {pets.age}
              </h2>
            </div>
            <div className="gender">
              {genderIcon && <img src={genderIcon} alt="Gender Icon" />}
            </div>
          </div>
          <p className="row-text">
            Weight: {pets.weight}
          </p>
          <p className="row-text">
            Diet: {pets.diet}
          </p>
          <p className="row-text">
            Size: {pets.size}
          </p>
          <p className="row-text">
            Owner: {owner}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PetDetail;
