import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function EditPet() {
  const navigate = useNavigate();
  const { token } = useToken();

  const [pet, setPet] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    gender: "",
    age: "",
    picture: "",
    size: "",
    weight: "",
    diet: "",
  });

  // put this in the NAV
  // const { token } = useToken();
  // const { user } = useUser(token);

  const { user_id, pet_id } = useParams();
  const fetchData = async () => {
    const petURL = `http://localhost:8000/api/pets/${pet_id}/`;

    const petResponse = await fetch(petURL, {headers: {"Authorization": `Bearer ${token}`,}, });

    if (petResponse.ok) {
      const petData = await petResponse.json();
      setPet(petData);
    } else {
      console.log("Error fetching data");
    }
  };

  useEffect(() => {
      if (token) {
      fetchData();
    }}, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Determine the fields that have changed
    const updatedFields = {};
    for (const key in formData) {
      if (formData[key] !== "") {
        updatedFields[key] = formData[key];
      } else {
        updatedFields[key] = pet[key];
      }
    }
    updatedFields["pet_id"] = pet_id;
    updatedFields["owner_id"] = user_id;

    // If no fields have changed
    if (updatedFields.length === 0) {
      alert("No changes have been made.");
      return;
    } else {
      const url = `http://localhost:8000/api/pets/${pet_id}`;

      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      };

      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        setFormData({
          name: "",
          breed: "",
          gender: "",
          age: "",
          picture: "",
          size: "",
          weight: "",
          diet: "",
        });
        navigate(`/customers/${user_id}/${pet_id}`);
      }
    }
  };

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({ ...formData, [inputName]: value });
  };

  return (
    <div className="form-container">
      <div className="secondary-container">
        <form
          onSubmit={handleSubmit}
          id="update-pet-form"
          className="update-pet-form"
        >
          <div className="mb-5">
            <label htmlFor="name" className="label-css">
              Pet Name
            </label>
            <input
              onChange={handleFormChange}
              type="text"
              name="name"
              id="name"
              placeholder={pet.name}
              className="form-input-container"
              value={formData.name}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="breed" className="label-css">
              Breed
            </label>
            <input
              onChange={handleFormChange}
              type="text"
              name="breed"
              id="breed"
              placeholder={pet.breed}
              className="form-input-container"
              value={formData.breed}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="gender" className="label-css">
              Gender
            </label>
            <input
              onChange={handleFormChange}
              type="text"
              name="gender"
              id="gender"
              placeholder={pet.gender}
              className="form-input-container"
              value={formData.gender}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="age" className="label-css">
              Age
            </label>
            <input
              onChange={handleFormChange}
              type="number"
              name="age"
              id="age"
              placeholder={pet.age}
              className="form-input-container"
              value={formData.age}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="picture" className="label-css">
              Picture
            </label>
            <input
              onChange={handleFormChange}
              type="text"
              name="picture"
              id="picture"
              placeholder={pet.picture}
              className="form-input-container"
              value={formData.picture}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="size" className="label-css">
              Size
            </label>
            <input
              onChange={handleFormChange}
              type="text"
              name="size"
              id="size"
              placeholder={pet.size}
              className="form-input-container"
              value={formData.size}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="weight" className="label-css">
              Weight (lbs.)
            </label>
            <input
              onChange={handleFormChange}
              type="number"
              name="weight"
              id="weight"
              placeholder={pet.weight}
              className="form-input-container"
              value={formData.weight}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="diet" className="label-css">
              Diet
            </label>
            <input
              onChange={handleFormChange}
              type="text"
              name="diet"
              id="diet"
              placeholder={pet.diet}
              className="form-input-container"
              value={formData.diet}
            />
          </div>
          <div>
            <button className="submit-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPet;
