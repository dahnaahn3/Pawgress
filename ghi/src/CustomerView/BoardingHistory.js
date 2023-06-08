import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import getUser from "../useUser";

function BoardingHistory() {
  const [history, setHistory] = useState([]);
  const [pets, setPets] = useState([]);
  const { token } = useAuthContext();
  const user = getUser(token);
  const baseUrl = process.env.REACT_APP_PAWGRESS_API_HOST;
  const fetchData = async () => {
    const url = `${baseUrl}/api/reservation`;
    const urlPets = `${baseUrl}/api/pets`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      setHistory(data);
    }
    const responsePets = await fetch(urlPets, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (responsePets.ok) {
      const petData = await responsePets.json();
      setPets(petData);
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

  const getPetName = (reservation, pets) => {
    const pet = pets.filter((pet) => pet.pet_id === reservation.pet_id);
    return pet[0]?.name;
  };

  return (
    <div
      className="overflow-x-auto"
      style={{ paddingLeft: "20rem", marginTop: "5rem" }}
    >
      <header className="px-3 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Boarding History 🐾</h2>
        <Link to={"/customers/boarding"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Make a reservation
          </button>
        </Link>
      </header>
      {history && history.length ? (
        <div>
          <table className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-8">Reservation Number</th>
                <th className="p-8">Pet</th>
                <th className="p-8">Dropoff Date and Time</th>
                <th className="p-8">Pickup Date and Time</th>
              </tr>
            </thead>
            <tbody className="border-b">
              {history.map((reservation) => {
                let start_datetime = reservation.start_datetime;
                let end_datetime = reservation.end_datetime;
                start_datetime = new Date(start_datetime);
                end_datetime = new Date(end_datetime);
                const petName = getPetName(reservation, pets);
                if (
                  reservation.customer_id === parseInt(user?.user?.id) &&
                  reservation.category === "BOARDING"
                ) {
                  return (
                    <tr key={reservation.reservation_id}>
                      <td className="px-8 py-2">
                        {reservation.reservation_id}
                      </td>
                      <td className="px-8 py-2">{petName}</td>
                      <td className="px-8 py-2">
                        {start_datetime.toLocaleString()}
                      </td>
                      <td className="px-8 py-2">
                        {end_datetime.toLocaleString()}
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Previous Boarding History</p>
      )}
    </div>
  );
}

export default BoardingHistory;
