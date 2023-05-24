import React, { useEffect, useState } from "react";

function TrainerList() {
    const [trainers, setTrainers] = useState([]);

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

return (
  <div style={{ paddingLeft: "20rem", marginTop: "-50rem" }}>
    <header className="px-5 py-4 border-b border-gray-100">
      <h2 className="font-semibold text-gray-800">Trainers 🐾</h2>
    </header>
    <table className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
      <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
        <tr className="dark:bg-gray-700">
          <th className="p-8">First Name</th>
          <th className="p-8">Last Name</th>
          <th className="p-8">Address</th>
          <th className="p-8">Email</th>
          <th className="p-10">Phone number</th>
        </tr>
      </thead>
      <tbody className="border-b dark:bg-gray-900 dark:border-gray-700">
        {trainers.map((trainer) =>
          trainer.role === "trainer" ? (
            <tr key={trainer.id}>
              <td className="px-3 py-2">{trainer.first_name}</td>
              <td className="px-3 py-2">{trainer.last_name}</td>
              <td className="px-3 py-2">{trainer.address}</td>
              <td className="px-3 py-2">{trainer.email}</td>
              <td className="px-3 py-2">{trainer.phone_number}</td>
            </tr>
          ) : null
        )}
      </tbody>
    </table>
  </div>
);

}

export default TrainerList;
