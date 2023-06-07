import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

import SignupForm from "./SignupForm";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";


function MainPageNav() {
  const { token, logout } = useToken();
  const { user } = useUser(token);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="flex mx-auto p-4 w-full">
        <Link to="/" className="flex">
          <img
            src={
              "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/853274/dog-paw-prints-clipart-xl.png"
            }
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Pawgress
          </span>
        </Link>

        <div className="flex-grow items-center">
          <ul className="flex items-center justify-center">
            <li className="mr-4">
              <Link
                to="/trainingservices"
                className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
              >
                <button> Training Services</button>
              </Link>
            </li>
            <li className="mr-4">
              <Link
                to="/boardingservices"
                className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
              >
                Boarding Service
              </Link>
            </li>
            <li style={{ marginRight: "15rem" }}>
              <Link
                to="/donate"
                className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
              >
                Donate
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex justify-end">
          {user ? (
            <>
              <div className="flex items-center">
                <span className="mr-2">
                  Hello {user.first_name} {user.last_name}!
                </span>
                <Link to={`/customers/${user.id}`}>
                  <button className="flex items-center ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Home
                  </button>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/signin">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign In
                </button>
              </Link>

              <Popup
                trigger={
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800
                  focus:ring-4 focus:outline-none focus:ring-blue-300
                  font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0
                  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3"
                  >
                    Sign Up
                  </button>
                }
                modal
                nested
              >
                {(close) => (
                  <div>
                    <div>
                      <SignupForm />
                    </div>
                    <div>
                      <button onClick={() => close()}>Close modal</button>
                    </div>
                  </div>
                )}
              </Popup>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MainPageNav;
