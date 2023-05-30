import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'
import SignupForm from './SignupForm';
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";


function MainPageNav(){
  const { token, logout } = useToken();
  const { user } = useUser(token);


    return (
      <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div class="max-w-screen-xl flex mx-auto p-4">
          <a href="https://flowbite.com/" class="flex">
            <img
              src="https://media3.giphy.com/media/QyPl5qEQnBIu2ZQwTx/200w.gif?cid=82a1493be5by8dn25s3qsj5ewo6ocb1w82ixzgw0td68lei2&ep=v1_gifs_related&rid=200w.gif&ct=g"
              class="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Pawgress
            </span>
          </a>

          <div class="flex-grow"></div>

          <div
            class="flex items-center justify-center"
            style={{ marginRight: "25rem" }}
          >
            <ul class="flex">
              <li class="mr-4">
                <a
                  href="/trainingservices"
                  style={{ marginRight: "5rem" }}
                  class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                >
                  Training Services
                </a>
              </li>
              <li>
                <a
                  href="/boardingservices"
                  class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                >
                  Boarding Service
                </a>
              </li>
            </ul>
          </div>
          <div class="flex justify-end">
            {user ? (
              <>
                <div className="flex items-center">
                  <span className="mr-2">Hello {user.first_name} {user.last_name}!</span>
                  <Link to="/customers">
                  <button
                    className="flex items-center ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
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
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sign In
                  </button>
                </Link>

                <Popup
                  trigger={
                    <button
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800
                  focus:ring-4 focus:outline-none focus:ring-blue-300
                  font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0
                  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

export default MainPageNav
