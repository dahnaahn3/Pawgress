import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import useUser from "./useUser";

function EditPet() {
  const [user, setUser] = useState([]);
  const [pet, setPets] = useState([]);

  // put this in the NAV
  // const { token, logout } = useToken();
  // const { user } = useUser(token);

  const { user_id } = useParams();
  const fetchData = async () => {
    const userURL = `http://localhost:8000/api/accounts/${user_id}/`;
    const petsURL = "http://localhost:8000/api/pets";

    const [userResponse, petsResponse] = await Promise.all([
      fetch(userURL),
      fetch(petsURL),
    ]);

    if (userResponse.ok && petsResponse.ok) {
      const userData = await userResponse.json();
      const petsData = await petsResponse.json();
      console.log(userData, petsData);
      setUser(userData);
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
      <p> We are editing a pet</p>
    </div>
  );
}

export default EditPet;
