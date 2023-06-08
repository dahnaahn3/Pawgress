import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function RoomsList() {
  const baseUrl = process.env.REACT_APP_PAWGRESS_API_HOST;
  const { token } = useToken();
  const [rooms, setRooms] = useState([]);
  const [pets, setPets] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    const roomsURL = `${baseUrl}/api/rooms`;
    const petsURL = `${baseUrl}/api/pets`;
    const response = await Promise.all([
      fetch(roomsURL, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(petsURL, { headers: { Authorization: `Bearer ${token}` } }),
    ]);
    const roomsData = await response[0].json();
    const petsData = await response[1].json();
    setRooms(roomsData);
    setPets(petsData);
  };


    if (token) {
      fetchData();
    }
  }, [baseUrl, token]);

  if (!token) {
    return null;
  }
  return (
    <div
      className="room-container"
      style={{ paddingLeft: "20rem", marginTop: "-80%" }}
    >
      <header className="room-ext">
        <h2 className="room-title">Rooms 🐾</h2>
        <NavLink to="./form">
          <button className="new-room-button">Create a new room</button>
        </NavLink>
      </header>
      <table className="room-box">
        <thead className="room-main-row">
          <tr>
            <th className="room-cat">Room Number</th>
            <th className="room-cat">Occupied</th>
            <th className="room-cat">Pet Name</th>
          </tr>
        </thead>
        <tbody className="room-body">
          {rooms.map((room) => {
            const pet = pets.find((pet) => pet.pet_id === room.pet_id);
            let occupied = room.pet_id ? "Yes ✅" : "No ❌";
            let petName = pet ? pet.name : "";

            return (
              <tr key={room.room_id}>
                <td className="room-info1">{room.room_number}</td>
                <td className="room-info2">{occupied}</td>
                <td className="room-info2">{petName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Outlet />
    </div>
  );
}

export default RoomsList;
