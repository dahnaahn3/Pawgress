import "./mainpage.css";
import MainPageNav from "./MainPageNav";
import MainPageCover from "./MainPageCover";
import MainPageArticles from "./MainPageArticles";
import MainpageFooter from "./MainpageFooter";


function Mainpage() {
  return (
    <>
      <div>

          <MainPageNav />
          <MainPageCover />
          <MainPageArticles />
          <MainpageFooter />


      </div>
    </>
  );
}

export default Mainpage;
