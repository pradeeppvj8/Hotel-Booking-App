import React, { useEffect, useState } from 'react'
import { cancelBooking, getAllBookings } from '../utils/ApiFunctions'
import Header from '../common/Header'
import LoadingSpinner from '../common/LoadingSpinner'
import BookingsTable from './BookingsTable'

const Bookings = () => {
    const [bookingInfo, setBookingInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        setTimeout(() => {
            getAllBookings()
                .then(data => {
                    setBookingInfo(data)
                    setIsLoading(false)
                })
                .catch(error => {
                    setError(error.message)
                    setIsLoading(false)
                })
        }, 1000)
    }, [])

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingId)
            const data = await getAllBookings()
            setBookingInfo(data)
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <section className='' style={{ background: "whitesmoke" }}>
            <Header title={"Bookings"} />
            {error && <div className='text-danger'>{error}</div>}
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <BookingsTable bookingInfo={bookingInfo} handleBookingCancellation={handleBookingCancellation} />
            )}
        </section>
    )
}

export default Bookings