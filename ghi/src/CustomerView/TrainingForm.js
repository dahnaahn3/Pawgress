import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import getUser from "../useUser";

function TrainingForm() {
  const { token } = useToken();
  const user = getUser(token);
  console.log(user?.user?.id);
  const [reservation, setReservation] = useState({
    start_datetime: "",
    end_datetime: "",
    category: "TRAINING",
    customer_id: "",
    pet_id: "",
  });
  const [trainingClasses, setTrainingClasses] = useState([]);

  const handleReservationChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;
    setReservation({
      ...reservation,
      [inputName]: value,
    });
    console.log(reservation);
  };

  const getClassSelected = (class_id, trainingClasses) => {
    class_id = parseInt(class_id);
    const trainingClass = trainingClasses.filter(
      (trainingClass) => class_id === trainingClass.class_id
    );
    return trainingClass;
  };

  const handleClassSelect = (event) => {
    const class_id = event.target.value;
    const classSelected = getClassSelected(class_id, trainingClasses);
    console.log(classSelected);
    const start_datetime = classSelected[0].start_datetime;
    const end_datetime = classSelected[0].end_datetime;
    console.log(start_datetime);
    console.log(end_datetime);
    setReservation({
      ...reservation,
      start_datetime: start_datetime,
      end_datetime: end_datetime,
      customer_id: user?.user?.id,
    });
    console.log(reservation);
  };

  const navigate = useNavigate();

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
        category: "TRAINING",
        customer_id: "",
        pet_id: "",
      });
      navigate(`/customers/${user.user.id}`);
    }
  };

  const [pets, setPets] = useState([]);
  const fetchData = async () => {
    const url = "http://localhost:8000/api/pets";
    const urlClasses = "http://localhost:8000/api/classes";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setPets(data);
    }
    const responseClasses = await fetch(urlClasses);
    if (responseClasses.ok) {
      const classesData = await responseClasses.json();
      setTrainingClasses(classesData);
      console.log(classesData);
    }
  };

  useEffect(() => {
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
        <h1 className="mb-5">Create a training reservation</h1>
        <form onSubmit={handleSubmit} id="create-user-form">
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
          <div className="mb-5">
            <select
              required
              onChange={handleClassSelect}
              placeholder="Class"
              name="class"
              className="form-input-container"
            >
              <option value="">Class</option>
              {trainingClasses.map((trainingClass) => {
                return (
                  <option
                    key={trainingClass.class_id}
                    value={trainingClass.class_id}
                  >
                    {trainingClass.name}
                  </option>
                );
              })}
            </select>
            <label htmlFor="class">Class</label>
          </div>
          <button className="submit-button">Add</button>
        </form>
      </div>
    </div>
  );
}
export default TrainingForm;
