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
      if(response.ok){
      const historydata = await response[0].json();
      const userdata = await response[1].json();
      const petdata = await response[2].json();
        setHistory(historydata);
        setUser(userdata)
        setPet(petdata)}
    };

    let userName;
    history.map((h)=>{
      user.map((u) => {
        if(h.customer_id === u.id){
          userName=`${u.first_name} ${u.last_name}`
        }
      })
    })

    let petName;
    history.map((h) => {
      pet.map((p) => {
        if (h.pet_id === p.pet_id) {
          petName = `${p.name}`;
        }
      });
    });

useEffect(() => {
    fetchData();
  }, []);

    if (!token) {
    return null;
  }

  return (
    <div style={{ paddingLeft: "20rem", marginTop: "-40rem" }}>
      {history && history.length ? (
        <>
          <div>
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">
                Training History 🐾
              </h2>
            </header>
            <table className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr className="dark:bg-gray-700">
                  <th className="p-10">Customer</th>
                  <th className="p-10">Pet</th>
                  <th className="p-10">Start</th>
                  <th className="p-10">End</th>
                </tr>
              </thead>
              <tbody className="border-b dark:bg-gray-900 dark:border-gray-700">
                {history.map((h) => {
                  if (h.category === "TRAINING") {
                    const formattedStartDateTime = formatDate(h.start_datetime);
                    const formattedEndDateTime = formatDate(h.end_datetime);
                    return (
                      <tr>
                        <td className="px-3 py-2">{userName}</td>
                        <td className="px-3 py-2">{petName} </td>
                        <td className="px-3 py-2">{formattedStartDateTime}</td>
                        <td className="px-3 py-2">{formattedEndDateTime}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
          <div>
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">
                Boarding History 🐾
              </h2>
            </header>
            <table className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr className="dark:bg-gray-700">
                  <th className="p-8">Customer</th>
                  <th className="p-8">Pet</th>
                  <th className="p-8">Start</th>
                  <th className="p-8">End</th>
                </tr>
              </thead>
              <tbody className="border-b dark:bg-gray-900 dark:border-gray-700">
                {history.map((h) => {
                  if (h.category === "BOARDING") {
                    const formattedStartDateTime = formatDate(h.start_datetime);
                    const formattedEndDateTime = formatDate(h.end_datetime);
                    return (
                      <tr>
                        <td className="px-3 py-2">{userName}</td>
                        <td className="px-3 py-2">{petName} </td>
                        <td className="px-3 py-2">{formattedStartDateTime}</td>
                        <td className="px-3 py-2">{formattedEndDateTime}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p> No history to display! </p>
      )}
    </div>
  );
}

export default TrainingBoardingHistory;
