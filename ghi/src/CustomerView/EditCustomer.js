import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";


function EditCustomer() {
  const baseUrl = process.env.REACT_APP_PAWGRESS_API_HOST;
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pets,setPets] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    phone_number: "",
  });

  const { token } = useToken();

  const { user_id } = useParams();

  useEffect(() => {
  const fetchData = async () => {
    const userURL = `${baseUrl}/api/accounts/${user_id}`;
    const petsURL = `${baseUrl}/api/pets`;
    const [userResponse, petsResponse] = await Promise.all([
      fetch(userURL, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(petsURL, { headers: { Authorization: `Bearer ${token}` } }),
    ]);

    if (userResponse.ok && petsResponse.ok) {
      const userData = await userResponse.json();
      const petsData = await petsResponse.json();
      setUser(userData);
      setPets(petsData);
    } else {
      console.log("Error fetching data");
    }
  };

  if (token) {
    fetchData();
  }
}, [token]);

  const handlePassword = () => {
    navigate(`/customers/${user_id}/editpw`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    const updatedFields = {};
    for (const key in formData) {
      if (formData[key] !== "") {
        updatedFields[key] = formData[key];
      } else {
        updatedFields[key] = user[key];
      }
    }
    updatedFields["role"] = user["role"];
    updatedFields["hashed_password"] = user["hashed_password"];

    if (updatedFields.length === 0) {
      alert("No changes have been made.");
      return;
    } else {
      const url = `${baseUrl}/api/accounts/${user_id}`;

      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      };

      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        setFormData({
          first_name: "",
          last_name: "",
          address: "",
          email: "",
          phone_number: "",
        });
        navigate(`/customers/${user_id}/profile`);
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
          id="update-user-form"
          className="update-user-form"
        >
          <div className="mb-5">
            <label htmlFor="first_name" className="label-css">
              First Name
            </label>
            <input
              onChange={handleFormChange}
              type="text"
              name="first_name"
              id="first_name"
              placeholder={user.first_name}
              className="form-input-container"
              value={formData.first_name}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="last_name" className="label-css">
              Last Name
            </label>
            <input
              onChange={handleFormChange}
              type="text"
              name="last_name"
              id="last_name"
              placeholder={user.last_name}
              className="form-input-container"
              value={formData.last_name}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="address" className="label-css">
              Address
            </label>
            <input
              onChange={handleFormChange}
              type="text"
              name="address"
              id="address"
              placeholder={user.address}
              className="form-input-container"
              value={formData.address}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="label-css">
              Email
            </label>
            <input
              onChange={handleFormChange}
              type="text"
              name="email"
              id="email"
              placeholder={user.email}
              className="form-input-container"
              value={formData.email}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="phone_number" className="label-css">
              Phone Number
            </label>
            <input
              onChange={handleFormChange}
              type="text"
              name="phone_number"
              id="phone_number"
              placeholder={user.phone_number}
              className="form-input-container"
              value={formData.phone_number}
            />
          </div>
          <div className="mb-5">
            <button
              type="button"
              className="w-full border-blue-900 hover:border-[#003087] hover:border-[2px] border-[1px] rounded-3xl p-3 text-[#0070ba] font-bold transition duration-200"
              onClick={handlePassword}
            >
              Edit Password
            </button>
          </div>
          <div>
            <button className="submit-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCustomer;
