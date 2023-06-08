import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import getUser from "../useUser";

function BoardingForm() {
  const [reservation, setReservation] = useState({
    start_datetime: "",
    end_datetime: "",
    category: "BOARDING",
    customer_id: "",
    pet_id: "",
  });

  const handleReservationChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;
    const customer_id = user?.user?.id;
    setReservation({
      ...reservation,
      [inputName]: value,
      customer_id: customer_id,
    });
  };

  const navigate = useNavigate();
  const { token } = useToken();
  const user = getUser(token);
  const baseUrl = process.env.REACT_APP_PAWGRESS_API_HOST;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const reservationUrl = `${baseUrl}/api/reservation`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(reservation),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(reservationUrl, fetchConfig);
    if (response.ok) {
      setReservation({
        start_datetime: "",
        end_datetime: "",
        category: "BOARDING",
        customer_id: "",
        pet_id: "",
      });
      navigate(`/customers/${user.user.id}`);
    }
  };

  const [pets, setPets] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const url = `${baseUrl}/api/pets`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setPets(data);
    }
  };
  fetchData();
}, []);

  if (!token) {
    return null;
  }

  return (
    <div
      className="form-container"
      style={{ paddingLeft: "15rem", marginTop: "1rem" }}
    >
      <div className="secondary-container">
        <h1 className="mb-5">Create a boarding reservation</h1>
        <form onSubmit={handleSubmit} id="create-user-form">
          <div className="mb-5">
            <input
              required
              onChange={handleReservationChange}
              placeholder="Dropoff Date"
              type="datetime-local"
              name="start_datetime"
              className="form-input-container"
            />
            <label htmlFor="start_datetime">Dropoff Date and Time</label>
          </div>
          <div className="mb-5">
            <input
              onChange={handleReservationChange}
              placeholder="Pickup Date"
              type="datetime-local"
              name="end_datetime"
              className="form-input-container"
            />
            <label htmlFor="end_datetime">Pickup Date and Time</label>
          </div>
          <div className="mb-5">
            <select
              required
              onChange={handleReservationChange}
              placeholder="Pet ID"
              name="pet_id"
              className="form-input-container"
            >
              <option value="">Pet</option>
              {pets.map((pet) => {
                if (pet.owner_id === parseInt(user?.user?.id)) {
                  return (
                    <option key={pet.pet_id} value={pet.pet_id}>
                      {pet.name}
                    </option>
                  );
                } else {
                  return null;
                }
              })}
            </select>
            <label htmlFor="pet_id">Pet</label>
          </div>
          <button className="submit-button">Add</button>
        </form>
      </div>
    </div>
  );
}
export default BoardingForm;
