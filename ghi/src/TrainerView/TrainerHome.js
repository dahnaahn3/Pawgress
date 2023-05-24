import { HiListBullet, HiOutlineUserGroup } from 'react-icons/hi2';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { RiHistoryFill } from 'react-icons/ri';
import { TiMortarBoard } from 'react-icons/ti';
import { MdOutlineInventory2 } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';
import { GrLogout } from 'react-icons/gr';


const TrainerHome = () => {
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
                  <p>Welcome Trainer!</p>
                </div>
                <ul className="nav-right-main">
                  <li>
                    <a href="#" className="tr-nav-container">
                      <span className="tr-nav-flex">
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
