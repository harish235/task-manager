import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import { CgNametag } from 'react-icons/cg';
import './navbar.css';
import { IconContext } from 'react-icons';
import { BiLogOut } from 'react-icons/bi';


export default function Navbar({ handleLogout }) {
    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    }

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <Link to='#' className='menu-bars'>
                        <FaBars onClick={toggleSidebar} />
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={toggleSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiFillCloseCircle />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                        <li className='nav-text'>
                            <Link to='#' onClick={handleLogout}>
                                <BiLogOut />
                                <span>Logout</span>
                            </Link>

                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}
