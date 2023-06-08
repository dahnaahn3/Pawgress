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
  const baseUrl = process.env.REACT_APP_PAWGRESS_API_HOST;
  const [, setPets] = useState([]);
  const [boardings, setBoardings] = useState([]);
  const [trainings, setTrainings] = useState([]);

  const { token } = useAuthContext();
  const tokenUser = useUser(token);

  useEffect(() => {
  const fetchData = async () => {
    const reservationsURL = `${baseUrl}/api/reservation`;
    const petsURL = `${baseUrl}/api/pets`;

    const [reservationsResponse, petsResponse] = await Promise.all([
      fetch(reservationsURL, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(petsURL, { headers: { Authorization: `Bearer ${token}` } }),
    ]);

    if (reservationsResponse.ok && petsResponse.ok && tokenUser) {
      const reservationsData = await reservationsResponse.json();
      const petsData = await petsResponse.json();

      const filteredPets = petsData.filter(
        (pet) => pet?.owner_id === parseInt(tokenUser?.user?.id)
      );

      const filteredBoardings = reservationsData
        .filter(
          (reservation) =>
            reservation.customer_id === parseInt(tokenUser?.user?.id) &&
            reservation.category === "BOARDING"
        )
        .map((boarding) => ({
          ...boarding,
          pet: filteredPets.find((pet) => pet.pet_id === boarding.pet_id),
        }));

      const filteredTrainings = reservationsData
        .filter(
          (reservation) =>
            reservation.customer_id === parseInt(tokenUser?.user?.id) &&
            reservation.category === "TRAINING"
        )
        .map((training) => ({
          ...training,
          pet: filteredPets.find((pet) => pet.pet_id === training.pet_id),
        }));

      setPets(filteredPets);
      setBoardings(filteredBoardings);
      setTrainings(filteredTrainings);
    } else {
      console.log("Error fetching data");
    }
  };

  if (token) {
    fetchData();
  }
}, [baseUrl, token, tokenUser, tokenUser?.user]);

  return (
    <>
      <div className="w-full cs-main-component">
        <div
          className="background-image"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1597633611385-17238892d086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80)`,
            opacity: 0.5,
            backgroundPosition: "center bottom",
          }}
        ></div>
        <div>
          <h4 className="mb-10 mt-10 text-2xl font-medium leading-tight text-primary">
            Upcoming Boardings 🐾
          </h4>
          <table className="table-container w-full">
            <thead className="category">
              <tr className="bg-gray-100">
                <th className="btitle-margin text-center">Name</th>
                <th className="btitle-margin text-center">Start Time</th>
                <th className="btitle-margin text-center">End Time</th>
              </tr>
            </thead>
            <tbody>
              {boardings?.map((boarding) => {
                return (
                  <tr
                    className="border-b hover:bg-gray-50 h-20"
                    key={boarding.reservation_id}
                  >
                    <td className="h-row text-center">{boarding.pet.name}</td>
                    <td className="h-row text-center">
                      {formatDateTime(boarding.start_datetime)}
                    </td>
                    <td className="h-row text-center">
                      {formatDateTime(boarding.end_datetime)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="my-8" />

          <h4 className="mb-10 mt-5 text-2xl font-medium leading-tight text-primary">
            Upcoming Trainings 🐾
          </h4>

          <table className="table-container w-full">
            <thead className="category">
              <tr className="bg-gray-100">
                <th className="btitle-margin">Name</th>
                <th className="btitle-margin">Start Time</th>
                <th className="btitle-margin">End Time</th>
              </tr>
            </thead>
            <tbody>
              {trainings?.map((training) => {
                return (
                  <tr
                    className="border-b hover:bg-gray-50 h-20"
                    key={training.reservation_id}
                  >
                    <td className="h-row text-center">{training.pet.name}</td>
                    <td className="h-row text-center">
                      {formatDateTime(training.start_datetime)}
                    </td>
                    <td className="h-row text-center">
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
