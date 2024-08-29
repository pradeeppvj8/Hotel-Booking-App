import { React, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { Logout } from '../auth/Logout'
import { useAuth } from '../auth/AuthProvider'

const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false)

    const { user } = useAuth()

    const isLoggedIn = user !== null
    const userRole = localStorage.getItem("userRole")

    const handleAccountClick = () => {
        setShowAccount(!showAccount)
    }

    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-2 sticky-top'>
            <div className='container-fluid'>
                <Link to={"/"} className="navbar-brand">
                    <span className='hotel-color hotel-label'>
                        <FaHome /> Hotel Booking App
                    </span>
                </Link>
                <button className='navbar-toggler' type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarScroll'
                    aria-controls='navbarScroll'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarScroll'>
                    <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                        <li className='nav-item'>
                            <NavLink className="nav-link hotel-label" aria-current="page" to={"/browse-all-rooms"}>
                                Browse All Rooms
                            </NavLink>
                        </li>
                        {isLoggedIn && userRole === "ROLE_ADMIN" && (
                            <li className='nav-item'>
                                <NavLink className="nav-link hotel-label" aria-current="page" to={"/admin"}>
                                    Admin
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <ul className='d-flex navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className="nav-link hotel-label" aria-current="page" to={"/find-bookings"}>
                                Find My Bookings
                            </NavLink>
                        </li>
                        <li className='nav-item dropdown'>
                            <a className={`nav-link hotel-label dropdown-toggle ${showAccount ? "show" : ""}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleAccountClick}>
                                Account
                            </a>
                            <ul className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby="navbarDropdown">
                                {isLoggedIn ? (
                                    <li>
                                        <Logout handleAccountClick={handleAccountClick} />
                                    </li>
                                ) : (
                                    <li>
                                        <Link className="dropdown-item" to={"/login"} onClick={handleAccountClick}>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar