import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from '../useUser';
import { HiListBullet, HiOutlineUserGroup } from 'react-icons/hi2';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { RiHistoryFill } from 'react-icons/ri';
import { TiMortarBoard } from 'react-icons/ti';
import { NavLink, Outlet } from 'react-router-dom';
import { GrLogout } from 'react-icons/gr';


const TrainerHome = () => {

  const { token, logout } = useToken();
  const { user } = useUser(token);

    return (
      <>
        <div x-data="setup()">
          <div className="tr-container-left">
            <div className="tr-container-right">
              <div className="tr-header-left">
                <img className="logo-icon" src="/WhitePawIcon.png" />
                <span className="home-title">Pawgress</span>
              </div>
              <div className="tr-header-right">
                <div className="tr-welcome-container">
                  <p>Welcome Trainer !</p>
                </div>
                <ul className="nav-right-main">
                  <li style={{marginRight:"10rem"}}>
                    <a href="#" className="tr-nav-container">
                      <span className="tr-nav-flex">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          ></path>
                        <GrLogout />
                      </span>
                      Logout
                    </a>
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
                        <span className="tr-sidebar-text">
                          Training Classes
                        </span>
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
                        <span className="tr-sidebar-text">Training/Boarding History</span>
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
