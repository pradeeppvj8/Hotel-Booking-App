import React from 'react'

const MainHeader = () => {
    return (
        <header className='header-banner'>
            <div className='overlay'></div>
            <div className='animated-texts overlay-content'>
                <h1>Welcome To <span>Hotel Booking App</span></h1>
                <h4>Find The Best Rooms In The City</h4>
            </div>
        </header>
    )
}

export default MainHeader