import React from 'react'
import { useAuth } from './AuthProvider'
import { Link, useNavigate } from 'react-router-dom'

export const Logout = ({ handleAccountClick }) => {
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.handleLogout()
        handleAccountClick()
        navigate("/", { state: { message: "You have been logged out" } })
    }

    const isLoggedIn = auth.user !== null
    const currentUser = localStorage.getItem("userId")
    let currentUserName = currentUser.split("@")[0]
    let profileUserName = currentUserName[0].toUpperCase() + currentUserName.slice(1)

    return isLoggedIn ? (
        <>
            <li>
                <Link className='dropdown-item' to={"/profile"} onClick={() => handleAccountClick()}>
                    {profileUserName}
                </Link>
            </li>
            <li>
                <hr className='dropdown-divider' />
            </li>
            <button className='dropdown-item' onClick={handleLogout}>
                Logout
            </button>
        </>
    ) : null
}
