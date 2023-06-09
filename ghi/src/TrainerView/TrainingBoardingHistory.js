import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function TrainingBoardingHistory() {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState([]);
  const [pet, setPet] = useState([]);
  const baseUrl = process.env.REACT_APP_PAWGRESS_API_HOST;
  const { token } = useToken();

  const formatDate = (input) => {
    const date = new Date(input);
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      const historyURL = `${baseUrl}/api/reservation`;
      const userURL = `${baseUrl}/api/accounts`;
      const petsURL = `${baseUrl}/api/pets`;
      const response = await Promise.all([
        fetch(historyURL, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(userURL, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(petsURL, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const [historyData, userData, petData] = await Promise.all(
        response.map((res) => res.json())
      );
      setHistory(historyData);
      setUser(userData);
      setPet(petData);
    };

    if (token) {
      fetchData();
    }
  }, [token, baseUrl]);

  if (!token) {
    return null;
  }

  return (
    <div style={{ paddingLeft: "20rem", marginTop: "-75%" }}>
      <>
        <div>
          <header className="label-container">
            <h2 className="label-text">Training History 🐾</h2>
          </header>
          <table className="table-container">
            <thead className="category">
              <tr>
                <th className="atitle-margin">Customer</th>
                <th className="atitle-margin">Pet</th>
                <th className="atitle-margin">Start</th>
                <th className="atitle-margin">End</th>
              </tr>
            </thead>
            <tbody className="info-container">
              {history.map((h) => {
                if (h.category === "TRAINING") {
                  const userName = user.find((u) => h.customer_id === u.id);
                  const petName = pet.find((p) => h.pet_id === p.pet_id);
                  const formattedStartDateTime = formatDate(h.start_datetime);
                  const formattedEndDateTime = formatDate(h.end_datetime);
                  return (
                    <tr key={h.reservation_id}>
                      <td className="h-row">
                        {userName?.first_name} {userName?.last_name}
                      </td>
                      <td className="h-row">{petName?.name}</td>
                      <td className="h-row">{formattedStartDateTime}</td>
                      <td className="h-row">{formattedEndDateTime}</td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
        <div>
          <header className="label-container">
            <h2 className="label-text">Boarding History 🐾</h2>
          </header>
          <table className="table-container">
            <thead className="category">
              <tr>
                <th className="btitle-margin">Customer</th>
                <th className="btitle-margin">Pet</th>
                <th className="btitle-margin">Start</th>
                <th className="btitle-margin">End</th>
              </tr>
            </thead>
            <tbody className="info-container">
              {history.map((h) => {
                if (h.category === "BOARDING") {
                  const userName = user.find((u) => h.customer_id === u.id);
                  const petName = pet.find((p) => h.pet_id === p.pet_id);
                  const formattedStartDateTime = formatDate(h.start_datetime);
                  const formattedEndDateTime = formatDate(h.end_datetime);
                  return (
                    <tr key={h.reservation_id}>
                      <td className="h-row">
                        {userName?.first_name} {userName?.last_name}
                      </td>
                      <td className="h-row">{petName?.name}</td>
                      <td className="h-row">{formattedStartDateTime}</td>
                      <td className="h-row">{formattedEndDateTime}</td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
}

export default TrainingBoardingHistory;
