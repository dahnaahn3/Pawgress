import React, {useEffect, useState} from "react"
import { NavLink, Outlet } from "react-router-dom";

function RoomsList(){
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
return (
  <div
    className="overflow-x-auto"
    style={{ paddingLeft: "20rem", marginTop: "-50rem" }}
  >
    <header className="px-3 py-4 border-b border-gray-100">
      <h2 className="font-semibold text-gray-800">Rooms 🐾</h2>
      <NavLink to="./form">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Create a new room
        </button>
      </NavLink>
    </header>
    <table className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
      <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
        <tr className="dark:bg-gray-700">
          <th className="p-8">Room Number</th>
          <th className="p-8">Occupied</th>
          <th className="p-8">Pet Name</th>
        </tr>
      </thead>
      <tbody className="border-b dark:bg-gray-900 dark:border-gray-700">
        {rooms.map((room) => {
          const pet = pets.find((pet) => pet.pet_id === room.pet_id);
          let occupied = room.occupied ? "Yes ✅" : "No ❌";
          let petName = pet ? pet.name : "";

          return (
            <tr key={room.id}>
              <td className="px-10 py-2">{room.room_number}</td>
              <td className="px-8 py-2">{occupied}</td>
              <td className="px-8 py-2">{petName}</td>
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
