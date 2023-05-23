import { HiOutlineUserGroup } from 'react-icons/hi2';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { RiHistoryFill } from 'react-icons/ri';
import { BsHouse } from 'react-icons/bs';
import { HiOutlineUser } from 'react-icons/hi';
import { GrLogout } from 'react-icons/gr';


const CustomerHome = () => {
    return (
        <>

<div x-data="setup()">
    <div className="cs-container-left">
        <div className="cs-container-right">
            <div className="cs-header-left">
                <img className="logo-icon" src="/WhitePawIcon.png" />
                <span className="home-title">Pawgress</span>
            </div>
            <div className="cs-header-right">
            <div className="cs-welcome-container">
                <p>Welcome Customer_name!</p>
            </div>
            <ul className="nav-right-main">
            <li>
                <a href="#" className="cs-nav-container">
                    <span className="cs-nav-format">
                    <HiOutlineUser />
                    </span>
                    Profile
                </a>
                </li>
                <li>
                <a href="#" className="cs-nav-container">
                    <span className="cs-nav-flex">
                    <GrLogout />
                    </span>
                    Logout
                </a>
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
                <li>
                <a href="#" className="cs-container">
                    <span className="cs-row">
                    <BsHouse size="30"/>
                    </span>
                    <span className="cs-sidebar-text">Make Boarding Reservation</span>
                </a>
                </li>
                <li>
                <a href="#" className="cs-container">
                    <span className="cs-row">
                    <HiOutlineUserGroup size="30"/>
                    </span>
                    <span className="cs-sidebar-text">Upcoming Classes Signup</span>
                </a>
                </li>
                <li className="hidden-text">
                <div className="title-container">
                    <div className="cs-sidebar-title">Animal Trail</div>
                </div>
                </li>
                <li>
                <a href="#" className="cs-container">
                    <span className="cs-row">
                    <HiOutlineClipboardDocumentList size="25"/>
                    </span>
                    <span className="cs-sidebar-text">Boarding History</span>
                </a>
                </li>
                <li>
                <a href="#" className="cs-container">
                    <span className="cs-row">
                    <RiHistoryFill size="25"/>
                    </span>
                    <span className="cs-sidebar-text">Training History</span>
                </a>
                </li>
            </ul>
            <p className="footer-copyright">Copyright @2023 by Pawgress</p>
            </div>
        </div>

        <div>
            {/* Create Data Card/Table Card/displays here */}
        </div>
    </div>
</div>
</>
)
};

export default CustomerHome;
