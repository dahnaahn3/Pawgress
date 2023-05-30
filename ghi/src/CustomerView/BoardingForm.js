import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function BoardingForm() {
  const [reservation, setReservation] = useState({
    start_datetime: "",
    end_datetime: "",
    category: "",
    customer_id: "",
    pet_id: "",
  });

  const handleReservationChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;
    setReservation({
      ...reservation,
      [inputName]: value,
    });
  };

  const navigate = useNavigate();
  const { token } = useToken()

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reservationUrl = "http://localhost:8000/reservation";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(reservation),
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await fetch(reservationUrl, fetchConfig);
    if (response.ok) {
      setReservation({
        start_datetime: "",
        end_datetime: "",
        category: "",
        customer_id: "",
        pet_id: "",
      });
      navigate("/");
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div style={{ paddingLeft: "20rem", marginTop: "-50rem" }}>
      <div>
        <Link to={".."}>
          <button>back to customers</button>
        </Link>
      </div>
      <div>
        <h1>Create a boarding reservation</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              onChange={handleReservationChange}
              placeholder="Dropoff Date"
              type="datetime-local"
              name="start_datetime"
            />
            <label htmlFor="start_datetime">Dropoff Date and Time</label>
          </div>
          <div>
            <input
              onChange={handleReservationChange}
              placeholder="Pickup Date"
              type="datetime-local"
              name="end_datetime"
            />
            <label htmlFor="end_datetime">Pickup Date and Time</label>
          </div>
          <div>
            <input
              onChange={handleReservationChange}
              placeholder="Category"
              type="text"
              name="category"
            />
            <label htmlFor="category">Category</label>
          </div>
          <div>
            <input
              onChange={handleReservationChange}
              placeholder="Customer ID"
              type="text"
              name="customer_id"
            />
            <label htmlFor="customer_id">Customer ID</label>
          </div>
          <div>
            <input
              onChange={handleReservationChange}
              placeholder="Pet ID"
              type="text"
              name="pet_id"
            />
            <label htmlFor="pet_id">Pet ID</label>
          </div>
          <button>Add</button>
        </form>
      </div>
    </div>
  );
}
export default BoardingForm;
