import "./mainpage.css";
import { NavLink } from "react-router-dom";
import MainPageNav from "./MainPageNav";
import MainPageCover from "./MainPageCover";
import MainPageArticles from "./MainPageArticles";
import MainPageContact from "./MainPageContact";
import './mainpage.css'

function Mainpage() {
  return (
    <>
      <div>

          <MainPageNav />
          <MainPageCover />
          <MainPageArticles />
          <MainPageContact />

        <footer class="bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" class="hover:underline">
              Pawgress
            </a>
            . All Rights Reserved.
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">
                Meet the team
              </a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">
                Footer Stuff
              </a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">
                Footer Stuff
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}

export default Mainpage;
