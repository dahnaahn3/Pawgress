import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import useUser from "./useUser";

function CustomerProfile() {
  const [customer, setCustomer] = useState([]);

  // put this in the NAV
  // const { token, logout } = useToken();
  // const { user } = useUser(token);

  const { user_id } = useParams();
  const fetchData = async () => {
    const url = `http://localhost:8000/api/accounts/${user_id}/`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setCustomer(data);
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

export default CustomerProfile;
