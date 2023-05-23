
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import TrainerHome from './TrainerView/TrainerHome';
import CustomerHome from './CustomerView/CustomerHome';
import RoomsList from "./TrainerView/RoomsList";
import Mainpage from "./MainPageView/Mainpage";
import PetsList from "./TrainerView/PetsList";
import TrainingClass from "./TrainerView/TrainingClass";
import TrainerList from "./TrainerView/TrainerList";
import TrainingBoardingHistory from "./TrainerView/TrainingBoardingHistory";

function App() {
  return (
    <>
    <div className="flex">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="trainer/" element={<TrainerHome />}>
            <Route path="rooms/" element={<RoomsList />} />
            <Route path="pets/" element={<PetsList />} />
            <Route path="training/" element={<TrainingClass />} />
            <Route path="trainers/" element={<TrainerList />} />
            <Route path="history/" element={<TrainingBoardingHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>

    </div>
    </>
  );
}


export default App;
