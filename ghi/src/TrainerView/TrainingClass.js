import React, { useEffect, useState } from "react";

function TrainingClass() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:8000/api/classes";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
        console.log(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="overflow-x-auto"
      style={{ paddingLeft: "20rem", marginTop: "-50rem" }}
    >
      <header class="px-5 py-4 border-b border-gray-100">
        <h2 class="font-semibold text-gray-800">Classes 🐾</h2>
      </header>
      <table class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
          <tr className="dark:bg-gray-700">
            <th className="p-8">Class Name</th>
            <th className="p-8">Category</th>
            <th className="p-8">Attendees</th>
            <th className="p-8">Max Attendees</th>
            <th className="p-10">Start Time</th>
            <th className="p-10">End time</th>
            <th className="p-10">Description</th>
          </tr>
        </thead>
        <tbody className="border-b dark:bg-gray-900 dark:border-gray-700">
          {classes.map((c) => (
            <tr key={c.id}>
              <td className="px-3 py-2">{c.name}</td>
              <td className="px-3 py-2">{c.category}</td>
              <td className="px-3 py-2">{c.attendees}</td>
              <td className="px-3 py-2">{c.max_attendees}</td>
              <td className="px-3 py-2">{c.start_datetime}</td>
              <td className="px-3 py-2">{c.end_datetime}</td>
              <td className="px-3 py-2">{c.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainingClass;
