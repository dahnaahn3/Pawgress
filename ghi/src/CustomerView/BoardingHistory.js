import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function BoardingHistory() {
  const [history, setHistory] = useState([]);

    const { token } = useToken();

  const fetchData = async () => {
    const url = "http://localhost:8000/reservation";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
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
    <div>
      <div className="my-5 container">
        <Link to={".."}>
          <button className="btn">Make a reservation</button>
        </Link>
      </div>
      {history && history.length ? (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Reservation Number</th>
                <th>Pet</th>
                <th>Dropoff Date and Time</th>
                <th>Pickup Date and Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((reservation) => {
                let start_datetime = reservation.start_datetime;
                let end_datetime = reservation.end_datetime;
                start_datetime = new Date(start_datetime);
                end_datetime = new Date(end_datetime);
                console.log(reservation);
                return (
                  <tr key={reservation.reservation_id}>
                    <td>{reservation.reservation_id}</td>
                    <td>{reservation.pet_id}</td>
                    <td>{start_datetime.toLocaleString()}</td>
                    <td>{end_datetime.toLocaleString()}</td>
                  </tr>
                );
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
