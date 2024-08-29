import React, { useState } from 'react'
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRangePicker } from 'react-date-range'
import { Col, Row } from 'react-bootstrap'

const DateSlider = ({ onDateChange, onFilterChange }) => {
    const [dateRange, setDateRange] = useState({
        startDate: undefined,
        endDate: undefined,
        key: "selection"
    })

    const handleDateRange = (ranges) => {
        setDateRange(ranges.selection)
        onDateChange(ranges.selection.startDate, ranges.selection.endDate)
        onFilterChange(ranges.selection.startDate, ranges.selection.endDate)
    }

    const handleClearFilter = () => {
        setDateRange({
            startDate: undefined,
            endDate: undefined,
            key: "selection"
        })
        onDateChange(null, null)
        onFilterChange(null, null)
    }

    return (
        <>

            <h5 className='text-center'>Filter bookings by date</h5>
            <Row>
                <Col md={2}>

                </Col>

                <Col md={8} className='justify-content-center'>
                    <DateRangePicker ranges={[dateRange]} onChange={handleDateRange} className="mb-4" />
                    <button className="btn btn-secondary" onClick={handleClearFilter}>
                        Clear Filter
                    </button>
                </Col>
            </Row>
        </>

    )
}

export default DateSlider