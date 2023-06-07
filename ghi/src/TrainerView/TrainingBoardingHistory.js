import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";


function TrainingBoardingHistory() {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState([]);
  const [pet, setPet] = useState([]);

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

    const fetchData = async () => {
      const historyURL = "http://localhost:8000/reservation";
      const userURL = "http://localhost:8000/api/accounts";
      const petsURL = "http://localhost:8000/api/pets";
      const response = await Promise.all([fetch(historyURL), fetch(userURL), fetch(petsURL)]);
      // if(response.ok){
      const historydata = await response[0].json();
      const userdata = await response[1].json();
      const petdata = await response[2].json();
        setHistory(historydata);
        setUser(userdata)
        setPet(petdata)
      // }
    };

    let userName;
    history.forEach((h)=>(
      user.forEach((u) => {
        if(h.customer_id === u.id){
          userName=`${u.first_name} ${u.last_name}`
        }
      })
    ))

    let petName;
    history.forEach((h) => (
      pet.forEach((p) => {
        if (h.pet_id === p.pet_id) {
          petName = `${p.name}`;
        }
      })
    ));

useEffect(() => {
    fetchData();
  }, []);

    if (!token) {
    return null;
  }

  return (
    <div style={{ paddingLeft: "20rem", marginTop: "-70%" }}>
      {/* {history && history.length ? ( */}
        <>
          <div>
            <header className="label-container">
              <h2 className="label-text">
                Training History 🐾
              </h2>
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
                    const formattedStartDateTime = formatDate(h.start_datetime);
                    const formattedEndDateTime = formatDate(h.end_datetime);
                    return (
                      <tr key={h.reservation_id}>
                        <td className="h-row">{userName}</td>
                        <td className="h-row">{petName} </td>
                        <td className="h-row">{formattedStartDateTime}</td>
                        <td className="h-row">{formattedEndDateTime}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
          <div>
            <header className="label-container">
              <h2 className="label-text">
                Boarding History 🐾
              </h2>
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
                    const formattedStartDateTime = formatDate(h.start_datetime);
                    const formattedEndDateTime = formatDate(h.end_datetime);
                    return (
                      <tr key={h.reservation_id}>
                        <td className="h-row">{userName}</td>
                        <td className="h-row">{petName} </td>
                        <td className="h-row">{formattedStartDateTime}</td>
                        <td className="h-row">{formattedEndDateTime}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </>
      {/* ) : ( */}
        {/* <p> No history to display! </p> */}
      {/* )} */}
    </div>
  );
}

export default TrainingBoardingHistory;
