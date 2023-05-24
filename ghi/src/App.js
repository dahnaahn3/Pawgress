import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Auth from "./Auth";
import "./App.css";
import useUser from "./useUser";

import TrainerHome from "./TrainerView/TrainerHome";
import CustomerHome from "./CustomerView/CustomerHome";
import RoomsList from "./TrainerView/RoomsList";
import Mainpage from "./MainPageView/Mainpage";
import PetsList from "./TrainerView/PetsList";
import TrainingClass from "./TrainerView/TrainingClass";
import TrainerList from "./TrainerView/TrainerList";
import TrainingBoardingHistory from "./TrainerView/TrainingBoardingHistory";
import BoardingForm from "./CustomerView/BoardingForm";

import PetDetail from "./TrainerView/PetDetail";

function App() {
  const { token, logout } = useToken();
  const { user } = useUser(token);
  return (
    <div className="flex">
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
        <Route path="/customers" element={<CustomerHome />} />
        <Route path="reservation/" element={<BoardingForm />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/" element={<Mainpage />} />
        <Route path="trainer/" element={<TrainerHome />}>
          <Route path="rooms/" element={<RoomsList />} />
          <Route path="pets/" element={<PetsList />} />
          <Route path="pets/:pet_id/" element={<PetDetail />} />
          <Route path="training/" element={<TrainingClass />} />
          <Route path="trainers/" element={<TrainerList />} />
          <Route path="history/" element={<TrainingBoardingHistory />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
