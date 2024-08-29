import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    let today = new Date()

    return (
        <footer className='bg-dark text-light py-3 footer mt-lg-5'>
            <Container>
                <Row>
                    <Col>
                        <p>&copy; {today.getFullYear()} Hotel Booking App</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer