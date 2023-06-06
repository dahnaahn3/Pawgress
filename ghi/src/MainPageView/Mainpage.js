import "./mainpage.css";
import { NavLink } from "react-router-dom";
import MainPageNav from "./MainPageNav";
import MainPageCover from "./MainPageCover";
import MainPageArticles from "./MainPageArticles";
import MainPageContact from "./MainPageContact";
import MainpageFooter from "./MainpageFooter";


function Mainpage() {
  return (
    <>
      <div>

          <MainPageNav />
          <MainPageCover />
          <MainPageArticles />
          <MainPageContact />
          <MainpageFooter />


      </div>
    </>
  );
}

export default Mainpage;
