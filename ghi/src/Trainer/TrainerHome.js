import { HiOutlineUserGroup } from 'react-icons/hi2';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { RiHistoryFill } from 'react-icons/ri';
import { TiMortarBoard } from 'react-icons/ti';
import { MdOutlineInventory2 } from 'react-icons/md';


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
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
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
                <li>
                <a href="#" className="tr-container">
                    <span className="tr-row">
                    <TiMortarBoard size="30"/>
                    </span>
                    <span className="tr-sidebar-text">Training Classes</span>
                </a>
                </li>
                <li>
                <a href="#" className="tr-container">
                    <span className="tr-row">
                    <HiOutlineClipboardDocumentList size="25"/>
                    </span>
                    <span className="tr-sidebar-text">Trainer List</span>
                </a>
                </li>
                <li>
                <a href="#" className="tr-container">
                    <span className="tr-row">
                    <MdOutlineInventory2 size="25"/>
                    </span>
                    <span className="tr-sidebar-text">Inventory</span>
                </a>
                </li>
                <li className="hidden-text">
                <div className="title-container">
                    <div className="tr-sidebar-title">Animal Trail</div>
                </div>
                </li>
                <li>
                <a href="#" className="tr-container">
                    <span className="tr-row">
                    <HiOutlineUserGroup size="30"/>
                    </span>
                    <span className="tr-sidebar-text">Boarding Rooms</span>
                </a>
                </li>
                <li>
                <a href="#" className="tr-container">
                    <span className="tr-row">
                    <RiHistoryFill size="25"/>
                    </span>
                    <span className="tr-sidebar-text">Training/Boarding History</span>
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

export default TrainerHome;
