import React from 'react'
import MainHeader from '../layout/MainHeader'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'
import RoomCarousel from '../common/RoomCarousel'
import RoomSearch from '../common/RoomSearch'

const Home = () => {
    return (
        <section>
            <MainHeader />
            <section className='container'>
                <RoomSearch />
                <RoomCarousel />
                <Parallax />
                <HotelService />
            </section>
        </section>
    )
}

export default Home