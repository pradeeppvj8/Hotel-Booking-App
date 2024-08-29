import React from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RoomCard = ({ room }) => {
    return (
        <Col key={room.id} className='mb-4' xs={12}>
            <Card>
                <CardBody className='d-flex flex-wrap align-items-center'>
                    <div className='flex-shrink-0 mr-3 mb-3 mb-md-0'>
                        <Link to={`/book-room/${room.id}`} className='btn hotel-color hotel-label btn-sm'>
                            <CardImg
                                variant='top'
                                src={`data:image/png;base64, ${room.photo}`}
                                alt='Room Photo'
                                style={{ width: "100%", maxWidth: "200px", height: "auto" }} />
                        </Link>
                    </div>
                    <div className='flex-grow-1 ml-3 px-5'>
                        <CardTitle className='hotel-color'>{room.roomType}</CardTitle>
                        <CardTitle className='room-price'>{room.roomPrice} ₹ / night</CardTitle>
                    </div>
                    <div className='flex-shrink-0 mt-3'>
                        <Link to={`/book-room/${room.id}`} className='btn btn-hotel hotel-color hotel-label btn-sm'>
                            Book Now
                        </Link>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
}

export default RoomCard