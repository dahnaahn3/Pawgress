import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function TrainingHistory() {
  console.log("TRAINING HISTORY FORM");
  const [history, setHistory] = useState([]);

  const { token } = useToken();

  const fetchData = async () => {
    const url = "http://localhost:8000/reservation";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setHistory(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!token) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <header className="px-3 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Training History 🐾</h2>
        <Link to={"/training"}>
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
                <th className="p-8">Class Start Date and Time</th>
                <th className="p-8">Class End Date and Time</th>
              </tr>
            </thead>
            <tbody className="border-b">
              {history.map((reservation) => {
                let start_datetime = reservation.start_datetime;
                let end_datetime = reservation.end_datetime;
                start_datetime = new Date(start_datetime);
                end_datetime = new Date(end_datetime);
                console.log(reservation.reservation_id);
                return (
                  <tr key={reservation.reservation_id}>
                    <td className="px-8 py-2">{reservation.reservation_id}</td>
                    <td className="px-8 py-2">{reservation.pet_id}</td>
                    <td className="px-8 py-2">
                      {start_datetime.toLocaleString()}
                    </td>
                    <td className="px-8 py-2">
                      {end_datetime.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Previous Training History</p>
      )}
    </div>
  );
}

export default TrainingHistory;
