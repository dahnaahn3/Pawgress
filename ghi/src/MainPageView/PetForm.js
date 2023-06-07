import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function PetForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [picture, setPicture] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [diet, setDiet] = useState("");
  const [owner, setOwner] = useState("");
  const [owners, setOwners] = useState([]);
  const navigation = useNavigate();
  const { token } = useToken();


  const nameChange = (event) => {
    const valueName = event.target.value;
    setName(valueName);
  };

  const breedChange = (event) => {
    const valueBreed = event.target.value;
    setBreed(valueBreed);
  };

  const genderChange = (event) => {
    const valueGender = event.target.value.toUpperCase();
    if (valueGender === "M" || valueGender === "F") {
      setGender(valueGender);
    }
  };

  const ageChange = (event) => {
    const valueAge = event.target.value;
    setAge(valueAge);
  };

  const pictureChange = (event) => {
    const valuePicture = event.target.value;
    setPicture(valuePicture);
  };

  const sizeChange = (event) => {
    const valueSize = event.target.value.toUpperCase();
    setSize(valueSize);
  };

  const weightChange = (event) => {
    const valueWeight = event.target.value;
    setWeight(valueWeight);
  };

  const dietChange = (event) => {
    const valueDiet = event.target.value;
    setDiet(valueDiet);
  };

  const ownerChange = (event) => {
    const valueOwner = event.target.value;
    setOwner(valueOwner);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.name = name;
    data.breed = breed;
    data.gender = gender;
    data.age = age;
    data.picture = picture;
    data.size = size;
    data.weight = weight;
    data.diet = diet;
    data.owner_id = owner;

    const petUrl = "http://localhost:8000/api/pets";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };
    const response = await fetch(petUrl, fetchConfig);
    if (response.ok) {
      await response.json();

      setName("");
      setBreed("");
      setGender("");
      setAge("");
      setPicture("");
      setSize("");
      setWeight("");
      setDiet("");
      setOwner("");
      setOwners([]);
      navigation("/trainer/pets");
      fetchData();
    }
  };
  const fetchData = async () => {
    const userUrl = "http://localhost:8000/api/accounts";
    const response = await fetch(userUrl);

    if (response.ok) {
      const data = await response.json();
      setOwners(data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="form-container" style={{ marginTop: "-55rem" }}>
      <div className="secondary-container">
        <form onSubmit={handleSubmit} id="create-user-form">
          <div className="mb-5">
            <label htmlFor="name" className="label-css">
              Pet Name
            </label>
            <input
              required
              onChange={nameChange}
              type="text"
              name="name"
              id="name"
              placeholder="Pet Name"
              className="form-input-container"
              value={name}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="breed" className="label-css">
              Breed
            </label>
            <input
              required
              onChange={breedChange}
              type="text"
              name="breed"
              id="breed"
              placeholder="Breed"
              className="form-input-container"
              value={breed}
            />
          </div>
          <div className="form-wrap">
            <div className="label-container">
              <div className="mb-5">
                <label htmlFor="gender" className="label-css">
                  Gender
                </label>
                <input
                  required
                  onChange={genderChange}
                  type="text"
                  name="gender"
                  id="gender"
                  placeholder="M or F?"
                  className="form-input-container"
                  value={gender}
                />
              </div>
            </div>
            <div className="label-container">
              <div className="mb-5">
                <label htmlFor="age" className="label-css">
                  Age
                </label>
                <input
                  required
                  onChange={ageChange}
                  type="number"
                  name="age"
                  id="age"
                  placeholder="Age"
                  className="form-input-container"
                  value={age}
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="picture" className="label-css">
              Picture
            </label>
            <input
              required
              onChange={pictureChange}
              type="text"
              name="picture"
              id="picture"
              placeholder="Picture URL"
              className="form-input-container"
              value={picture}
            />
          </div>
          <div className="form-wrap">
            <div className="label-container">
              <div className="mb-5">
                <label htmlFor="size" className="label-css">
                  Size
                </label>
                <input
                  required
                  onChange={sizeChange}
                  type="text"
                  name="size"
                  id="size"
                  placeholder="Use XS to XXL"
                  className="form-input-container"
                  value={size}
                />
              </div>
            </div>
            <div className="label-container">
              <div className="mb-5">
                <label htmlFor="weight" className="label-css">
                  Weight
                </label>
                <input
                  required
                  onChange={weightChange}
                  type="number"
                  name="weight"
                  id="weight"
                  placeholder="Weight by LB"
                  className="form-input-container"
                  value={weight}
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="diet" className="label-css">
              Pet's Diet
            </label>
            <input
              required
              onChange={dietChange}
              type="text"
              name="diet"
              id="diet"
              placeholder="Pet's daily food"
              className="form-input-container"
              value={diet}
            />
          </div>
          <div className="mb-5">
            <select
              required
              onChange={ownerChange}
              name="owner_id"
              id="owner_id"
              placeholder="Choose an owner"
              className="form-input-container"
              value={owner}
            >
              <option value="">Choose a Owner</option>
              {owners &&
                owners.map((owner) => {
                  const ownerName = `${owner.first_name} ${owner.last_name}`;
                  return (
                    <option key={owner.id} value={owner.id}>
                      {ownerName}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <button className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PetForm;
