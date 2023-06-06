import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import useUser from "./useUser";

function EditPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    password_confirm: "",
  });

  const { user_id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password === formData.password_confirm) {
      
      const url = `http://localhost:8000/api/accounts/${user_id}/password`;

      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: formData.password }),
      };

      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        setFormData({
          password: "",
          password_confirm: "",
        });
        navigate(`/customers/${user_id}/profile`);
      } else {
        console.log(response.status);
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
          id="update-user-pw-form"
          className="update-user-pw-form"
        >
          <div className="mb-5">
            <label htmlFor="first_name" className="label-css">
              Password
            </label>
            <input
              onChange={handleFormChange}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="form-input-container"
              value={formData.password}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password_confirm" className="label-css">
              Confirm Password
            </label>
            <input
              onChange={handleFormChange}
              type="password"
              name="password_confirm"
              id="password_confirm"
              placeholder="Confirm password"
              className="form-input-container"
              value={formData.password_confirm}
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

export default EditPassword;
