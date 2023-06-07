import { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";

function formatDateTime(dateTime) {
  return new Date(dateTime).toLocaleString([], {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function LandingPage() {
  const [pets, setPets] = useState([]);
  const [boardings, setBoardings] = useState([]);
  const [trainings, setTrainings] = useState([]);

  const { token } = useAuthContext();
  console.log(token);
  const tokenUser = useUser(token);
  console.log("I AM:::::", tokenUser);

  const fetchData = async () => {
    const reservationsURL = "http://localhost:8000/reservation";
    const petsURL = "http://localhost:8000/api/pets";

    const [reservationsResponse, petsResponse] = await Promise.all([
      fetch(reservationsURL),
      fetch(petsURL),
    ]);

    if (reservationsResponse.ok && petsResponse.ok && tokenUser) {
      console.log("I AM:::::", tokenUser);
      const reservationsData = await reservationsResponse.json();
      console.log("reservationsData:::", reservationsData);
      const petsData = await petsResponse.json();
      console.log("petsData:::", petsData);

      const filteredPets = petsData.filter(
        (pet) => pet.owner_id === parseInt(tokenUser.user.id)
      );
      console.log("filteredpetsData:::", filteredPets);
      const filteredBoardings = reservationsData.filter(
        (reservation) =>
          reservation.customer_id === parseInt(tokenUser.user.id) &&
          reservation.category === "BOARDING"
      );
      const filteredTrainings = reservationsData.filter(
        (reservation) =>
          reservation.customer_id == tokenUser.user.id &&
          reservation.category === "TRAINING"
      );
       console.log("filteredTrainingData:::", filteredTrainings);

      setPets(filteredPets);
      setBoardings(filteredBoardings);
      setTrainings(filteredTrainings);
    } else {
      console.log("Error fetching data");
    }
  };

  return (
    <>
      <div className="w-full cs-main-component">
        <div
          className="background-image"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1597633611385-17238892d086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80)`,
            opacity: 0.5,
          }}
        ></div>
        <div>
          <h4 className="mb-2 mt-0 text-2xl font-medium leading-tight text-primary">
            Upcoming Boardings
          </h4>
          <table className="table-auto w-full border-x">
            <thead className="border-b">
              <tr className="bg-gray-100">
                <th className="text-left p-4 font-medium">Name</th>
                <th className="text-left p-4 font-medium">Start Time</th>
                <th className="text-left p-4 font-medium">End Time</th>
              </tr>
            </thead>
            <tbody>
              {boardings?.map((boarding) => {
                return (
                  <tr
                    className="border-b hover:bg-gray-50"
                    key={boarding.reservation_id}
                  >
                    <td className="p-4">{boarding.pet_id}</td>
                    <td className="p-4">
                      {formatDateTime(boarding.start_datetime)}
                    </td>
                    <td className="p-4">
                      {formatDateTime(boarding.end_datetime)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="my-8" />

          <h4 className="mb-2 mt-0 text-2xl font-medium leading-tight text-primary">
            Upcoming Trainings
          </h4>

          <table className="table-auto w-full border-x">
            <thead className="border-b">
              <tr className="bg-gray-100">
                <th className="text-left p-4 font-medium">Name</th>
                <th className="text-left p-4 font-medium">Start Time</th>
                <th className="text-left p-4 font-medium">End Time</th>
              </tr>
            </thead>
            <tbody>
              {trainings?.map((training) => {
                return (
                  <tr
                    className="border-b hover:bg-gray-50"
                    key={training.reservation_id}
                  >
                    <td className="p-4">{training.pet_id}</td>
                    <td className="p-4">
                      {formatDateTime(training.start_datetime)}
                    </td>
                    <td className="p-4">
                      {formatDateTime(training.end_datetime)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
