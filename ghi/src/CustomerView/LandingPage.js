import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import useUser from "./useUser";

function LandingPage() {
  const [pet, setPets] = useState([]);
  const [reservations, setReservations] = useState([]);
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
      <div class="bg-white">
        <div class="overflow-x-auto border-x border-t">
          <table class="table-auto w-full">
            <thead class="border-b">
              <tr class="bg-gray-100">
                <th class="text-left p-4 font-medium">Name</th>
                <th class="text-left p-4 font-medium">Email</th>
                <th class="text-left p-4 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b hover:bg-gray-50">
                <td class="p-4">Prof. Lucie Waters</td>
                <td class="p-4">basic@example.com</td>
                <td class="p-4">Administrator</td>
              </tr>
              <tr class="border-b hover:bg-gray-50">
                <td class="p-4">Anahi Bashirian (You)</td>
                <td class="p-4">admin@example.com</td>
                <td class="p-4">Super Administrator</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
