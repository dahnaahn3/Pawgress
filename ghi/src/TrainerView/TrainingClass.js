import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function TrainingClass() {
  const [classes, setClasses] = useState([]);

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
      const url = "http://localhost:8000/api/classes";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setClasses(data);

      }
    };

    fetchData();
  }, []);

  if (!token) {
    return null;
  }

  return (
    <div
      className="class-container"
      style={{ paddingLeft: "20rem", marginTop: "-50%" }}
    >
      <header className="c-ext">
        <h2 className="c-h2">Classes 🐾</h2>
        <NavLink to="./form">
          <button className="new-class-button">
            Create a new class
          </button>
        </NavLink>
      </header>
      <table className="c-box">
        <thead className="c-main-row">
          <tr>
            <th className="c-cat1">Class Name</th>
            <th className="c-cat1">Category</th>
            <th className="c-cat1">Attendees</th>
            <th className="c-cat1">Max Attendees</th>
            <th className="c-cat2">Start Time</th>
            <th className="c-cat2">End time</th>
            <th className="c-cat2">Description</th>
          </tr>
        </thead>
        <tbody className="c-b">
          {classes.map((c) => {
            const formattedStartDateTime = formatDate(c.start_datetime)
            const formattedEndDateTime = formatDate(c.end_datetime)
            return(
            <tr key={c.class_id}>
              <td className="c-row">{c.name}</td>
              <td className="c-row">{c.category}</td>
              <td className="c-row">{c.attendees}</td>
              <td className="c-row">{c.max_attendees}</td>
              <td className="c-row">{formattedStartDateTime}</td>
              <td className="c-row">{formattedEndDateTime}</td>
              <td className="c-row">{c.description}</td>
            </tr>
          );
          })}
        </tbody>
      </table>
      <Outlet/>
    </div>
  );
}

export default TrainingClass;
