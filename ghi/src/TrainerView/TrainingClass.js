import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function TrainingClass() {
  const [classes, setClasses] = useState([]);

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
        <NavLink to="./form">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Create a new class
          </button>
        </NavLink>
      </header>
      <table class="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
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
          {classes.map((c) => {
            const formattedStartDateTime = formatDate(c.start_datetime)
            const formattedEndDateTime = formatDate(c.end_datetime)
            return(
            <tr key={c.id}>
              <td className="px-3 py-2">{c.name}</td>
              <td className="px-3 py-2">{c.category}</td>
              <td className="px-3 py-2">{c.attendees}</td>
              <td className="px-3 py-2">{c.max_attendees}</td>
              <td className="px-3 py-2">{formattedStartDateTime}</td>
              <td className="px-3 py-2">{formattedEndDateTime}</td>
              <td className="px-3 py-2">{c.description}</td>
            </tr>
          );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TrainingClass;
