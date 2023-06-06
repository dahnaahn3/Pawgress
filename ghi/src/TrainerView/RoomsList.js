import React, {useEffect, useState} from "react"
import { NavLink, Outlet } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function RoomsList(){
        const { token } = useToken();
        const [rooms, setRooms] = useState([]);
        const [pets, setPets] = useState([]);
        const fetchData = async () => {
        const roomsURL = "http://localhost:8000/api/rooms";
        const petsURL = "http://localhost:8000/api/pets";
        const response = await Promise.all([fetch(roomsURL), fetch(petsURL)]);
        const roomsData = await response[0].json();
        const petsData = await response[1].json();
        setRooms(roomsData);
        setPets(petsData);
        console.log('rooms', roomsData, 'pets', petsData)
        };

        useEffect(() => {
        fetchData();
        }, []);

  if (!token) {
    return null;
  }
  return (
    <div
      className="room-container"
      style={{ paddingLeft: "20rem", marginTop: "-50rem" }}
    >
      <header className="room-ext">
        <h2 className="room-title">Rooms 🐾</h2>
        <NavLink to="./form">
          <button className="new-room-button">
            Create a new room
          </button>
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
            let occupied = room.occupied ? "Yes ✅" : "No ❌";
            let petName = pet ? pet.name : "";

            return (
              <tr key={room.id}>
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

export default RoomsList
