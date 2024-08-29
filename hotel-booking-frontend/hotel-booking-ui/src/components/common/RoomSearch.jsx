import React, { useState } from 'react'
import moment from 'moment'
import { getAvailableBookings } from '../utils/ApiFunctions'
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import RoomTypeSelector from './RoomTypeSelector'
import LoadingSpinner from './LoadingSpinner'
import RoomSearchResults from './RoomSearchResults'

const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkInDate: "",
        checkOutDate: "",
        roomType: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [availableRooms, setAvailableRooms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault()
        const checkIn = moment(searchQuery.checkInDate)
        const checkOut = moment(searchQuery.checkOutDate)

        if (!checkIn.isValid() || !checkOut.isValid()) {
            setErrorMessage("Please enter valid dates")
            return
        }

        if (!checkOut.isSameOrAfter(checkIn)) {
            setErrorMessage("Check out date must be after check in date")
            return
        }

        getAvailableBookings(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
            .then(response => {
                setAvailableRooms(response.data)
            })
            .catch(error => {
                console.error(error)
                setErrorMessage(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSearchQuery({ ...searchQuery, [name]: value })

        const checkIn = moment(searchQuery.checkInDate)
        const checkOut = moment(searchQuery.checkOutDate)

        if (checkIn.isValid() && checkOut.isValid()) {
            setErrorMessage("")
        }
    }

    const handleClearSearch = () => {
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            roomType: ""
        })
        setAvailableRooms([])
    }
    return (
        <>
            <Container className='mt-5 mb-5 py-5 shadow'>
                <h4 className='text-center mb-5'>Find Available Rooms</h4>
                <Form onSubmit={handleSearch}>
                    <Row className='justify-content-center'>
                        <Col xs={12} md={3}>
                            <FormGroup controlId='checkInDate'>
                                <FormLabel className='hotel-color hotel-label'>
                                    Check In Date
                                </FormLabel>
                                <FormControl
                                    type='date'
                                    name='checkInDate'
                                    value={searchQuery.checkInDate}
                                    min={moment().format("YYYY-MM-DD")}
                                    onChange={handleInputChange} />
                            </FormGroup>
                        </Col>

                        <Col xs={12} md={3}>
                            <FormGroup controlId='checkOutDate'>
                                <FormLabel className='hotel-color hotel-label'>
                                    Check Out Date
                                </FormLabel>
                                <FormControl
                                    type='date'
                                    name='checkOutDate'
                                    value={searchQuery.checkOutDate}
                                    min={moment().format("YYYY-MM-DD")}
                                    onChange={handleInputChange} />
                            </FormGroup>
                        </Col>

                        <Col xs={12} md={3}>
                            <FormGroup>
                                <FormLabel className='hotel-color hotel-label'>
                                    Room Type
                                </FormLabel>
                                <div className='d-flex'>
                                    <RoomTypeSelector handleRoomInputChange={handleInputChange}
                                        newRoom={searchQuery} />
                                    <Button variant='secondary' type='submit' className="hotel-color hotel-label">Search</Button>
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>

                {isLoading ? (
                    <LoadingSpinner />
                ) : availableRooms ? (
                    <RoomSearchResults onClearSearch={handleClearSearch} results={availableRooms} />
                ) : (
                    <p className="mt-4">No rooms available for the selected dates and room type.</p>
                )}
                {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
            </Container >
        </>
    )
}

export default RoomSearch