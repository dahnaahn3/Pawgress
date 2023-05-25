import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import useUser from "./useUser";

function LandingPage() {
  const [pet, setPets] = useState([]);
  const [reservations, setReservations] = useState([]);

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
      setReservations(reservationsData);
      setPets(petsData);
    } else {
      console.log("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p> WHEREEE </p>
    </div>
  );
}

export default LandingPage;
