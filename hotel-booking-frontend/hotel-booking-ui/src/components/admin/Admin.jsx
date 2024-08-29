import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
    return (
        <section className='container mt-3'>
            <h4>Admin Panel</h4>
            <hr />
            <Link to={"/existing-rooms"} className='btn btn-success btn-sm hotel-label'>Manage Rooms</Link>
            <br />
            <Link to={"/existing-bookings"} className='btn btn-success btn-sm hotel-label mt-3'>Manage Bookings</Link>
        </section>
    )
}

export default Admin