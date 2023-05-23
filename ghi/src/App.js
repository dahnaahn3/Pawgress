import { Routes, Route, NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Auth from "./Auth";
import "./App.css";

import TrainerHome from "./Trainer/TrainerHome.js";
import CustomerHome from "./Customer/CustomerHome.js";

function App() {
  const { token, logout } = useToken();
  const { user } = useUser(token);
  return (
    <div className="flex">
      {/* <TrainerHome /> */}
      <CustomerHome />
      {/* <NavLink to="/create-todo">new todo</NavLink>
      <NavLink to="my-list/">my list</NavLink> */}
      {user ? (
        <>
          hi {user.username}
          <button onClick={logout}>sign out</button>
        </>
      ) : (
        <>
          <NavLink to="/signin">sign in</NavLink>
          <NavLink to="/signup">sign up</NavLink>
        </>
      )}
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/signin" element={<Auth />} />
        {/* <Route path="/create-todo" element={<TodoForm />} />
        <Route path="/my-list" element={<TodoList />} /> */}
      </Routes>
    </div>
  );
}

export default App;
