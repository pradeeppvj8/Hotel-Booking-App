import React from 'react'
import { Card, CardBody, CardText, CardTitle, Container, Row, Col } from 'react-bootstrap'
import Header from './Header'
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from 'react-icons/fa'

const HotelService = () => {
    return (
        <Container className='mb-2'>
            <Header title={"Our Services"} />
            <Row>
                <h4 className='text-center mt-4'>
                    Services in <span className='hotel-color'>Hotel Booking App  </span>
                    <span>
                        <FaClock /> - 24 Hour Front Desk
                    </span>
                </h4>
            </Row>
            <hr />
            <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle className='hotel-color'>
                                <FaWifi /> Wifi
                            </CardTitle>
                            <CardText>
                                Stay connected withour highspeed internet
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle className='hotel-color'>
                                <FaUtensils /> Breakfast
                            </CardTitle>
                            <CardText>
                                Start your day with a healthy Breakfast
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle className='hotel-color'>
                                <FaTshirt /> Laundry
                            </CardTitle>
                            <CardText>
                                Use our best in class laundry service
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle className='hotel-color'>
                                <FaCocktail /> Mini-Bar
                            </CardTitle>
                            <CardText>
                                Enjoy a drink or two in our mini bar
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle className='hotel-color'>
                                <FaParking /> Parking
                            </CardTitle>
                            <CardText>
                                Park comfortably in our spacious parking lot
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle className='hotel-color'>
                                <FaSnowflake /> Air Conditioning
                            </CardTitle>
                            <CardText>
                                Stay cool and calm with our AC system
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default HotelService