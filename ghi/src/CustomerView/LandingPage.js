import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import useUser from "./useUser";

function formatDateTime(dateTime) {
  return new Date(dateTime).toLocaleString([], {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function LandingPage() {
  const [pet, setPets] = useState([]);
  const [boardings, setBoardings] = useState([]);
  const [trainings, setTrainings] = useState([]);

  // put this in the NAV
  // const { token, logout } = useToken();
  // const { user } = useUser(token);

  const { user_id } = useParams();
  const fetchData = async () => {
    const reservationsURL = "http://localhost:8000/reservation";
    const petsURL = "http://localhost:8000/api/pets";

    const [reservationsResponse, petsResponse] = await Promise.all([
      fetch(reservationsURL),
      fetch(petsURL),
    ]);

    if (reservationsResponse.ok && petsResponse.ok) {
      const reservationsData = await reservationsResponse.json();
      const petsData = await petsResponse.json();
      console.log(petsData, reservationsData);
      console.log(user_id);

      const filteredPets = petsData.filter(
        (pet) => pet.owner_id === parseInt(user_id)
      );
      const filteredBoardings = reservationsData.filter(
        (reservation) =>
          reservation.customer_id === parseInt(user_id) &&
          reservation.category === "Boarding"
      );
      const filteredTrainings = reservationsData.filter(
        (reservation) =>
          reservation.customer_id === parseInt(user_id) &&
          reservation.category === "Training"
      );

      console.log("Pets:::::", filteredPets);
      console.log("Boards:::::", filteredBoardings);
      console.log("Trainings:::::", filteredTrainings);
      setPets(filteredPets);
      setBoardings(filteredBoardings);
      setTrainings(filteredTrainings);
    } else {
      console.log("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div class="w-full">
        <div class="border-t">
          <h4 class="mb-2 mt-0 text-2xl font-medium leading-tight text-primary">
            Upcoming Boardings
          </h4>
          <table class="table-auto w-full border-x">
            <thead class="border-b">
              <tr class="bg-gray-100">
                <th class="text-left p-4 font-medium">Name</th>
                <th class="text-left p-4 font-medium">Start Time</th>
                <th class="text-left p-4 font-medium">End Time</th>
              </tr>
            </thead>
            <tbody>
              {boardings?.map((boarding) => {
                return (
                  <tr
                    class="border-b hover:bg-gray-50"
                    key={boarding.reservation_id}
                  >
                    <td class="p-4">{boarding.pet_id}</td>
                    <td class="p-4">
                      {formatDateTime(boarding.start_datetime)}
                    </td>
                    <td class="p-4">{formatDateTime(boarding.end_datetime)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="my-8" />

          <h4 class="mb-2 mt-0 text-2xl font-medium leading-tight text-primary">
            Upcoming Trainings
          </h4>

          <table class="table-auto w-full border-x">
            <thead class="border-b">
              <tr class="bg-gray-100">
                <th class="text-left p-4 font-medium">Name</th>
                <th class="text-left p-4 font-medium">Start Time</th>
                <th class="text-left p-4 font-medium">End Time</th>
              </tr>
            </thead>
            <tbody>
              {trainings?.map((training) => {
                return (
                  <tr
                    class="border-b hover:bg-gray-50"
                    key={training.reservation_id}
                  >
                    <td class="p-4">{training.pet_id}</td>
                    <td class="p-4">
                      {formatDateTime(training.start_datetime)}
                    </td>
                    <td class="p-4">{formatDateTime(training.end_datetime)}</td>
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
