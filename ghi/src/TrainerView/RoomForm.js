import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function RoomForm() {
  const baseUrl = process.env.REACT_APP_PAWGRESS_API_HOST;
  const [room, setRoom] = useState("");
  const [occupancy, setOccupancy] = useState(false);
  const [pet, setPet] = useState(null);
  const [pets, setPets] = useState([]);

  const navigate = useNavigate();
  const { token } = useToken();

  const roomChange = (event) => {
    const valueRoom = event.target.value;
    setRoom(valueRoom);
  };

  const petChange = (event) => {
    const valuePet = event.target.value;
    setPet(valuePet);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.room_number = room;
    data.occupied = occupancy;
    data.pet_id = pet;

    const roomUrl = `${baseUrl}/api/rooms`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(roomUrl, fetchConfig);
    if (response.ok) {
      await response.json();

      setRoom("");
      setOccupancy(false);
      setPet(null);
      setPets([]);
      navigate("/trainer/rooms");

      fetchData();
    }
  };
  const fetchData = async () => {
    const petUrl = `${baseUrl}/api/pets`;
    const response = await fetch(petUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      setPets(data);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  if (!token) {
    return null;
  }

  return (
    <div
      className="form-container"
      style={{ paddingLeft: "20rem", marginTop: "-60%" }}
    >
      <div className="secondary-container">
        <form onSubmit={handleSubmit} id="create-user-form">
          <div className="mb-5">
            <label htmlFor="room_number" className="label-css">
              Room Number
            </label>
            <input
              required
              onChange={roomChange}
              type="text"
              name="room_number"
              id="room_number"
              placeholder="Room Number"
              className="form-input-container"
              value={room}
            />
          </div>
          <div className="mb-5">
            <select
              onChange={petChange}
              name="pet_id"
              id="pet_id"
              placeholder="Choose a Pet"
              className="form-input-container"
              value={pet !== null ? pet : ""}
            >
              <option value="">Optional</option>
              {pets &&
                pets.map((pet) => {
                  return (
                    <option key={pet.pet_id} value={pet.pet_id}>
                      {pet.name}
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

export default RoomForm;
