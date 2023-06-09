import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { HiListBullet, HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { RiHistoryFill } from "react-icons/ri";
import { TiMortarBoard } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";
import { MdLogout } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";


const TrainerHome = () => {
  const { token, setToken } = useAuthContext();
  const { logout } = useToken();
  const { user } = useUser(token);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

    const handleProfileClick = () => {
      setShowDropdown(true);
    };

    const handleMouseLeave = () => {
      setShowDropdown(false);
    };

  const loggingOut = () => {
    localStorage.removeItem("token");
    logout();
  };

  if (token) {
    localStorage.setItem("token", token);
  }

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (!token && !savedToken) {
      navigate("/");
    } else {
      const currentToken = token || savedToken;

      if (!token) {
        setToken(currentToken);
      }
    }
  }, [token, navigate, setToken]);

  return (
    <>
      <div>
        <div className="tr-container-left">
          <div className="tr-container-right">
            <NavLink to="/" className="tr-header-left">
              <img
                src={
                  "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/853274/dog-paw-prints-clipart-xl.png"
                }
                className="h-8 mr-3"
                alt="Flowbite Logo"
              />
              <span
                style={{ color: "white" }}
                className="self-center text-2xl font-semibold whitespace-nowrap text-slate-700"
              >
                Pawgress
              </span>
            </NavLink>
            <div className="tr-header-right">
              <div className="tr-welcome-container">
                <p>Welcome {user && `${user.first_name} ${user.last_name}`}!</p>
              </div>

              <ul className="nav-right-main">
                <li>
                  <div
                    className="h-10 w-10 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover bg-center mr-5"
                    onClick={handleProfileClick}
                  >
                    <BsPersonCircle
                      className="h-10 w-10"
                      style={{ color: "#FFFFFF" }}
                    />
                    {showDropdown && (
                      <div>
                        <div
                          className="drop-down w-48 overflow-hidden bg-grey rounded-md shadow absolute top-12 right-3"
                          onMouseLeave={handleMouseLeave}
                        >
                          <ul>
                            <li>
                              <NavLink
                                to="/"
                                onClick={loggingOut}
                                className="px-3 py-3 text-sm font-medium flex items-center space-x-2 bg-gray-700 hover:bg-grey-400"
                              >
                                <MdLogout className="h-6 w-6 mr-2" />
                                Sign Out
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="tr-sidebar-container">
            <div className="tr-sidebar-flex">
              <ul className="tr-sidebar-set">
                <li className="hidden-text">
                  <div className="title-container">
                    <div className="tr-sidebar-title">Trainer</div>
                  </div>
                </li>

                <NavLink to="./training">
                  <li>
                    <p className="tr-container">
                      <span className="tr-row">
                        <TiMortarBoard size="30" />
                      </span>
                      <span className="tr-sidebar-text">Training Classes</span>
                    </p>
                  </li>
                </NavLink>

                <NavLink to="./trainers">
                  <li>
                    <p className="tr-container">
                      <span className="tr-row">
                        <HiOutlineClipboardDocumentList size="25" />
                      </span>
                      <span className="tr-sidebar-text">Trainer List</span>
                    </p>
                  </li>
                </NavLink>

                <NavLink to="./rooms">
                  <li>
                    <p className="tr-container">
                      <span className="tr-row">
                        <HiOutlineUserGroup size="30" />
                      </span>
                      <span className="tr-sidebar-text">Boarding Rooms</span>
                    </p>
                  </li>
                </NavLink>

                <NavLink to="./pets">
                  <li>
                    <p className="tr-container">
                      <span className="tr-row">
                        <HiListBullet size="30" />
                      </span>
                      <span className="tr-sidebar-text">Pet List</span>
                    </p>
                  </li>
                </NavLink>

                <NavLink to="./history">
                  <li>
                    <p className="tr-container">
                      <span className="tr-row">
                        <RiHistoryFill size="25" />
                      </span>
                      <span className="tr-sidebar-text">
                        Training/Boarding History
                      </span>
                    </p>
                  </li>
                </NavLink>
              </ul>

              <p className="footer-copyright">Copyright @2023 by Pawgress</p>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default TrainerHome;
