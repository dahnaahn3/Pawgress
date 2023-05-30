import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { RiHistoryFill } from "react-icons/ri";
import { BsHouse } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import { GrLogout } from "react-icons/gr";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
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
      } else {
        navigate("/customers");
      }
    }
  }, [token, navigate, setToken, user]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="cs-container-left">
          <div className="cs-container-right">
            <NavLink to="/" className="cs-header-left">
              <img className="logo-icon" src="/WhitePawIcon.png" alt="Logo" />
              <span className="home-title">Pawgress</span>
            </NavLink>
            <div className="cs-header-right">
              <div className="cs-welcome-container">
                <p>Welcome {user && `${user.first_name} ${user.last_name}`}!</p>
              </div>

              <ul className="nav-right-main">
                <li>
                  {user && (
                    <div className="flex">
                      <NavLink
                        to={`/customers/${user.id}/profile`}
                        className="cs-nav-container"
                      >
                        <span className="cs-nav-format">
                          <HiOutlineUser />
                        </span>
                        Profile
                      </NavLink>
                      <NavLink
                        to="/"
                        onClick={loggingOut}
                        className="cs-nav-container"
                      >
                        <span className="cs-nav-flex">
                          <GrLogout />
                        </span>
                        Sign out
                      </NavLink>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>

          <div className="cs-sidebar-container">
            <div className="cs-sidebar-flex">
              <ul className="cs-sidebar-set">
                <li className="hidden-text">
                  <div className="title-container">
                    <div className="cs-sidebar-title">Upcoming</div>
                  </div>
                </li>

                <NavLink to="./reservations">
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
                  <div className="title-container">
                    <div className="cs-sidebar-title">Animal Trail</div>
                  </div>
                </li>

                <NavLink to="./boarding/history">
                  <li>
                    <p className="cs-container">
                      <span className="cs-row">
                        <HiOutlineClipboardDocumentList size="25" />
                      </span>
                      <span className="cs-sidebar-text">Boarding History</span>
                    </p>
                  </li>
                </NavLink>

                <NavLink to="./training/history">
                  <li>
                    <p className="cs-container">
                      <span className="cs-row">
                        <RiHistoryFill size="25" />
                      </span>
                      <span className="cs-sidebar-text">Training History</span>
                    </p>
                  </li>
                </NavLink>
              </ul>
              <p className="footer-copyright">Copyright @2023 by Pawgress</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CustomerHome;
