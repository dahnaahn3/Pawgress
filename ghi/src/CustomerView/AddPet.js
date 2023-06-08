import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function AddPet() {
  const navigate = useNavigate();
  const { token } = useAuthContext();

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

  const { user_id } = useParams();

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({ ...formData, [inputName]: value, owner_id: user_id });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const baseUrl = process.env.REACT_APP_PAWGRESS_API_HOST;
    const url = `${baseUrl}/api/pets`;

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
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
      navigate(`/customers/${user_id}/profile`);
    }
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
              placeholder="Name"
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
              placeholder="Breed"
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
              placeholder="M or F"
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
              placeholder="Age"
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
              placeholder="Picture URL"
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
              placeholder="Size (XXS - XXL)"
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
              placeholder="Weight (in lbs)"
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
              placeholder="What does your doggo noms on?"
              className="form-input-container"
              value={formData.diet}
            />
          </div>
          <div>
            <button className="submit-button">Add Pet</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPet;
