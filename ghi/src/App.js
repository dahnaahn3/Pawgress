import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import TrainerHome from "./TrainerView/TrainerHome";
import CustomerHome from "./CustomerView/CustomerHome";
import RoomsList from "./TrainerView/RoomsList";
import Mainpage from "./MainPageView/Mainpage";
import PetsList from "./TrainerView/PetsList";
import TrainingClass from "./TrainerView/TrainingClass";
import TrainerList from "./TrainerView/TrainerList";
import TrainingBoardingHistory from "./TrainerView/TrainingBoardingHistory";
import BoardingForm from "./CustomerView/BoardingForm";
import TrainingForm from "./CustomerView/TrainingForm";
import PetDetail from "./TrainerView/PetDetail";
import TrainingHistory from "./CustomerView/TrainingHistory";
import RoomForm from "./TrainerView/RoomForm";
import CustomerProfile from "./CustomerView/CustomerProfile";
import LandingPage from "./CustomerView/LandingPage";
import PetProfile from "./CustomerView/PetProfile";
import EditPet from "./CustomerView/EditPet";
import Trainingservice from "./MainPageView/TrainingInfoSheet";
import Boardingservice from "./MainPageView/BoardingInfoSheet";
import Meettheteam from "./MainPageView/Meettheteam";
import SignupForm from "./MainPageView/SignupForm";
import Auth from "./MainPageView/Auth";
import ClassForm from "./TrainerView/ClassForm";
import PetForm from "./MainPageView/PetForm";
import BoardingHistory from "./CustomerView/BoardingHistory";
import EditCustomer from "./CustomerView/EditCustomer";
import EditPassword from "./CustomerView/EditPassword";
import ContactUs from "./MainPageView/ContactUs";
import Donation from "./MainPageView/Donation";
import BoardingModal from "./Modal";
import FAQ from "./MainPageView/FAQ";

function App() {
  return (
    <div className="flex">
      <Routes>
        <Route path="customers/" element={<CustomerHome />}>
          <Route path="/customers/:user_id/" element={<LandingPage />} />
          <Route path="" element={<CustomerHome />} />
          <Route path=":user_id/profile" element={<CustomerProfile />} />
          <Route path=":user_id/edit" element={<EditCustomer />} />
          <Route path=":user_id/editpw" element={<EditPassword />} />
          <Route path=":user_id/:pet_id/" element={<PetProfile />} />
          <Route path=":user_id/:pet_id/edit" element={<EditPet />} />
          <Route path="training/" element={<TrainingForm />} />
          <Route path="boarding/" element={<BoardingForm />} />
          <Route path="training/history/" element={<TrainingHistory />} />
          <Route path="boarding/history/" element={<BoardingHistory />} />
        </Route>

        <Route path="/" element={<Mainpage />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/donate" element={<Donation />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/modal" element={<BoardingModal />} />
        <Route path="contactus/" element={<ContactUs />} />
        <Route path="faq/" element={<FAQ />} />
        <Route path="/meettheteam" element={<Meettheteam />} />
        <Route path="/trainingservices" element={<Trainingservice />} />
        <Route path="/boardingservices" element={<Boardingservice />} />

        <Route path="trainer/" element={<TrainerHome />}>
          <Route path="rooms/" element={<RoomsList />} />
          <Route path="rooms/form" element={<RoomForm />} />

          <Route path="pets/" element={<PetsList />}>
            <Route path=":pet_id/" element={<PetDetail />} />
          </Route>

          <Route path="pets/form/" element={<PetForm />} />
          <Route path="training/" element={<TrainingClass />} />
          <Route path="training/form/" element={<ClassForm />} />
          <Route path="trainers/" element={<TrainerList />} />
          <Route path="history/" element={<TrainingBoardingHistory />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
