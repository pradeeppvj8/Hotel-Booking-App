import React, { useEffect, useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import BookingSummary from './BookingSummary'

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [roomPrice, setRoomPrice] = useState(0)
    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: ""
    })

    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    })

    const { roomId } = useParams()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setBooking({ ...booking, [name]: value })
        setErrorMessage("")
    }

    const getRoomPriceByRoomId = async (roomId) => {
        try {
            const room = await getRoomById(roomId)
            setRoomPrice(room.roomPrice)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    useEffect(() => {
        getRoomPriceByRoomId(roomId)
    }, [roomId])

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diff = checkOutDate.diff(checkInDate, "days")
        const price = roomPrice ? roomPrice : 0
        return price * diff
    }

    const isGuestCountValid = () => {
        const numOfChildren = booking.numOfChildren
        const numOfAdults = booking.numOfAdults
        const totalCount = numOfAdults + numOfChildren
        return totalCount >= 1 && numOfAdults >= 1
    }

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(booking.checkInDate)) {
            setErrorMessage("Check out data cannot be before check in data")
            return false
        } else {
            setErrorMessage("")
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget

        if (!form.checkValidity() || !isGuestCountValid() || !isCheckOutDateValid()) {
            if (e.stopPropagation) e.stopPropagation();
            //e.stopPropogation()
        } else {
            setIsSubmitted(true)
        }
        setIsValidated(true)
    }

    const handleBooking = async () => {
        try {
            const confirmationCode = await bookRoom(roomId, booking)
            setIsSubmitted(true)
            navigate("/booking-success", { state: { message: confirmationCode } })
        } catch (error) {
            const errorMessage = error.message
            console.log(errorMessage)
            navigate("/booking-success", { state: { error: errorMessage } })
        }
    }

    return (
        <>
            <div className='container mb-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card card-body mt-5'>
                            <h4 className='card-title text-center'>Reserve Room</h4>
                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <FormGroup>
                                    <FormLabel className="hotel-color hotel-label" htmlFor='guestFullName'>
                                        Full Name :
                                    </FormLabel>
                                    <FormControl required
                                        type='text'
                                        id='guestFullName'
                                        name='guestFullName'
                                        value={booking.guestFullName}
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type='invalid'>
                                        Please enter your full name
                                    </Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel className="hotel-color hotel-label" htmlFor='guestEmail'>
                                        Email :
                                    </FormLabel>
                                    <FormControl required
                                        type='email'
                                        id='guestEmail'
                                        name='guestEmail'
                                        value={booking.guestEmail}
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type='invalid'>
                                        Please enter your email
                                    </Form.Control.Feedback>
                                </FormGroup>

                                <fieldset style={{ border: "2px" }}>
                                    <h5 className='hotel-label mt-3 mb-3'>
                                        Lodging Period
                                    </h5>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <FormGroup>
                                                <FormLabel className="hotel-color hotel-label" htmlFor='checkInDate'>
                                                    Check In Date :
                                                </FormLabel>
                                                <FormControl required
                                                    type='date'
                                                    id='checkInDate'
                                                    name='checkInDate'
                                                    value={booking.checkInDate}
                                                    onChange={handleInputChange} />
                                                <Form.Control.Feedback type='invalid'>
                                                    Please select a check in date
                                                </Form.Control.Feedback>
                                            </FormGroup>
                                        </div>
                                        <div className='col-6'>
                                            <FormGroup>
                                                <FormLabel htmlFor='checkOutDate' className="hotel-color hotel-label">
                                                    Check Out Date :
                                                </FormLabel>
                                                <FormControl required
                                                    type='date'
                                                    id='checkOutDate'
                                                    name='checkOutDate'
                                                    value={booking.checkOutDate}
                                                    onChange={handleInputChange} 
                                                    />
                                                <Form.Control.Feedback type='invalid'>
                                                    Please select a check out date
                                                </Form.Control.Feedback>
                                            </FormGroup>
                                        </div>
                                        {errorMessage && <p className='error-message text-danger'>{errorMessage}</p>}
                                    </div>
                                </fieldset>

                                <fieldset style={{ border: "2px" }}>
                                    <h5 className='hotel-label mt-3 mb-3'>
                                        Number Of Guests
                                    </h5>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="numOfAdults" className="hotel-color hotel-label">
                                                Adults
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfAdults"
                                                name="numOfAdults"
                                                value={booking.numOfAdults}
                                                min={1}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please select at least 1 adult.
                                            </Form.Control.Feedback>
                                        </div>
                                        <div className="col-6">
                                            <Form.Label htmlFor="numOfChildren" className="hotel-color hotel-label">
                                                Children
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfChildren"
                                                name="numOfChildren"
                                                value={booking.numOfChildren}
                                                min={0}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Select 0 if no children
                                            </Form.Control.Feedback>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="form-group mt-2 mb-2">
                                    <button type="submit" className="btn btn-hotel">
                                        Continue
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className="col-md-6">
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatePayment()}
                                onConfirm={handleBooking}
                                isFormValid={isValidated}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingForm