import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { RiHistoryFill } from "react-icons/ri";
import { BsPersonCircle } from "react-icons/bs";
import { BsHouse } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { NavLink, useNavigate, Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";

const CustomerHome = () => {
  const { token, setToken } = useAuthContext();
  const { logout } = useToken();
  const { user } = useUser(token);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
    if (user) {
      setLoading(false);
      if (!token) {
        navigate("/");
      } else if (token && user && user.role === "trainer") {
        navigate("/trainer");
      }
    }
  }, [token, navigate, setToken, user]);

    return (
      <>
        <div>
          <div className="cs-container-left">
            <div className="cs-container-right shadow-inner">
              <NavLink to="/" className="cs-header-left">
                <img
                  src={
                    "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/853274/dog-paw-prints-clipart-xl.png"
                  }
                  className="h-8 mr-3"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-700">
                  Pawgress
                </span>
              </NavLink>
              <div className="cs-header-right">
                <div className="cs-welcome-container">
                  <p className="text-slate-900">
                    Welcome {user && `${user.first_name} ${user.last_name}`}!
                  </p>
                </div>

                <ul className="nav-right-main">
                  <li>
                    <div
                      className="h-10 w-10 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover bg-center mr-5"
                      onClick={handleProfileClick}
                    >
                      <BsPersonCircle
                        className="h-10 w-10"
                        style={{ color: "rgb(51 65 85)" }}
                      />
                      {showDropdown && (
                        <div>
                          <div
                            className="drop-down  w-48 overflow-hidden bg-white rounded-md shadow absolute top-12 right-3"
                            onMouseLeave={handleMouseLeave}
                          >
                            <ul>
                              <li>
                                <Link
                                  to={`/customers/${user.id}/profile`}
                                  className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400"
                                >
                                  <HiOutlineUser className="h-6 w-6 mr-2" />
                                  Profile
                                </Link>
                              </li>
                              <li>
                                <a
                                  onClick={loggingOut}
                                  className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400"
                                >
                                  <MdLogout className="h-6 w-6 mr-2" />
                                  Sign Out
                                </a>
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

            <div>
              <div className="cs-sidebar-container rounded-lg mt-3 ml-3">
                <div className="cs-sidebar-flex">
                  <ul className="cs-sidebar-set">
                    <li className="hidden-text">
                      <div className="title-container mt-3">
                        <div className="cs-sidebar-title">
                          MAKE A RESERVATION
                        </div>
                      </div>
                    </li>

                    <NavLink to="./boarding">
                      <li>
                        <p className="cs-container">
                          <span className="cs-row">
                            <BsHouse size="30" />
                          </span>
                          <span className="cs-sidebar-text">
                            Make Boarding Reservation
                          </span>
                        </p>
                      </li>
                    </NavLink>

                    <NavLink to="./training">
                      <li>
                        <p className="cs-container">
                          <span className="cs-row">
                            <HiOutlineUserGroup size="30" />
                          </span>
                          <span className="cs-sidebar-text">
                            Upcoming Classes Signup
                          </span>
                        </p>
                      </li>
                    </NavLink>

                    <li className="hidden-text">
                      <div className="title-container mt-10">
                        <div className="cs-sidebar-title">
                          PAST RESERVATIONS
                        </div>
                      </div>
                    </li>

                    <Link to={{ pathname: "boarding/history" }}>
                      <li>
                        <p className="cs-container">
                          <span className="cs-row">
                            <HiOutlineClipboardDocumentList size="25" />
                          </span>
                          <span className="cs-sidebar-text">
                            Boarding History
                          </span>
                        </p>
                      </li>
                    </Link>

                    <Link to="./training/history">
                      <li>
                        <p className="cs-container">
                          <span className="cs-row">
                            <RiHistoryFill size="25" />
                          </span>
                          <span className="cs-sidebar-text">
                            Training History
                          </span>
                        </p>
                      </li>
                    </Link>
                  </ul>
                  <p className="footer-copyright">
                    Copyright @2023 by Pawgress
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </>
    );
  
};

export default CustomerHome;
