import { Routes, Route, NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Auth from "./Auth";
import "./App.css";
import useUser from "./useUser";

import TrainerHome from "./Trainer/TrainerHome.js";
import CustomerHome from "./Customer/CustomerHome.js";

function App() {
  const { token, logout } = useToken();
  const { user } = useUser(token);
  return (
    <div className="flex">
      {/* <TrainerHome /> */}

      {user ? (
        <>
          hi {user.first_name}
          <button onClick={logout}>sign out</button>
        </>
      ) : (
        <>
          <NavLink to="/signin">sign in</NavLink>
          <NavLink to="/signup">sign up</NavLink>
        </>
      )}
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/customers" element={<CustomerHome />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/signin" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
