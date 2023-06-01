import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function TrainerList() {
    const [trainers, setTrainers] = useState([]);

    const { token } = useToken();

    useEffect(() => {
      const fetchData = async () => {
        const url = "http://localhost:8000/api/accounts";
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setTrainers(data);
          console.log(data);
        }
      };
      fetchData();
    }, []);

    if (!token) {
    return null;
  }

  return (
    <div style={{ paddingLeft: "20rem", marginTop: "-50rem" }}>
      <header className="t-ext">
        <h2 className="t-h2">Trainers 🐾</h2>
      </header>
      <table className="t-box">
        <thead className="t-main-row">
          <tr>
            <th className="t-cat1">First Name</th>
            <th className="t-cat1">Last Name</th>
            <th className="t-cat1">Address</th>
            <th className="t-cat1">Email</th>
            <th className="t-cat2">Phone number</th>
          </tr>
        </thead>
        <tbody className="t-b">
          {trainers.map((trainer) =>
            trainer.role === "trainer" ? (
              <tr key={trainer.id}>
                <td className="t-row">{trainer.first_name}</td>
                <td className="t-row">{trainer.last_name}</td>
                <td className="t-row">{trainer.address}</td>
                <td className="t-row">{trainer.email}</td>
                <td className="t-row">{trainer.phone_number}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );

}

export default TrainerList;
