import React, { useState } from 'react'
import { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions'
import LoadingSpinner from '../common/LoadingSpinner'
import moment from 'moment'

const FindBookings = () => {
    const emptyBookingInfo = {
        id: "",
        bookingConfirmationCode: "",
        room: { id: "", roomType: "" },
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuests: ""
    }

    const [confirmationCode, setConfirmationCode] = useState("")
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [bookingInfo, setBookingInfo] = useState(emptyBookingInfo)
    const [isDeleted, setIsDeleted] = useState(false)

    const handleInputChange = (event) => {
        setConfirmationCode(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)
            setError(null)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setBookingInfo(emptyBookingInfo)
            if (error.response && error.response.status === 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }
    }

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingId)
            setIsDeleted(true)
            setSuccessMessage("Booking has been cancelled successfully !!!")
            setBookingInfo(emptyBookingInfo)
            setConfirmationCode("")
            setError(null)
        } catch (error) {
            setError(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setIsDeleted(false)
        }, 2000)
    }


    return (
        <>
            <div className='container mt-5 d-flex flex-column justify-content-center align-items-center'>
                <h2 className="text-center mb-4">Find My Booking</h2>
                <form onSubmit={handleFormSubmit} className='col-md-4'>
                    <div className='input-group mb-3'>
                        <input type='form-control' id='confirmationCode' name='confirmationCode'
                            value={confirmationCode} onChange={handleInputChange} required/>
                        <button type='submit' className='btn btn-hotel input-group-text'>Find My Bookings</button>
                    </div>
                </form>

                {isLoading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <div className='text-danger'>
                        {error}
                    </div>
                ) : bookingInfo.bookingConfirmationCode ? (
                    <div className='col-md-4 mt-4 mb-5 card'>
                        <h4 className='text-center mt-2'>Booking Information</h4>
                        <div className='card-body'>
                            <p className="text-success"><strong>Confirmation Code: </strong>{bookingInfo.bookingConfirmationCode}</p>
                            <p><strong>Room Number: </strong> {bookingInfo.room.id}</p>
                            <p><strong>Room Type: </strong> {bookingInfo.room.roomType}</p>
                            <p>
                                <strong> Check-in Date: </strong>{" "}
                                {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                            </p>
                            <p>
                                <strong>Check-out Date: </strong> {" "}
                                {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                            </p>
                            <p><strong>Full Name: </strong>  {bookingInfo.guestName}</p>
                            <p><strong>Email Address: </strong>  {bookingInfo.guestEmail}</p>
                            <p><strong>Adults: </strong>  {bookingInfo.numOfAdults}</p>
                            <p><strong>Children: </strong>  {bookingInfo.numOfChildren}</p>
                            <p><strong>Total Guest: </strong>  {bookingInfo.totalNumOfGuests}</p>

                            {!isDeleted && (
                                <button className='btn btn-danger' onClick={() => handleBookingCancellation(bookingInfo.id)}>
                                    Cancel Booking
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <>

                    </>
                )}

                {isDeleted && (
                    <div className='alert alert-success mt-3 fade show' role='alert'>
                        {successMessage}
                    </div>
                )}
            </div >
        </>
    )
}

export default FindBookings