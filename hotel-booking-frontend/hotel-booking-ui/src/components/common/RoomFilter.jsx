import React, { useState } from 'react'

const RoomFilter = ({ data, setFilteredData }) => {
    const [filter, setFilter] = useState("")

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value
        setFilter(selectedRoomType)
        const filteredRooms = data.filter((room) =>
            room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()))
        setFilteredData(filteredRooms)
    }

    const clearFilter = () => {
        setFilter("")
        setFilteredData(data)
    }

    const roomTypes = [...new Set(data.map((room) => room.roomType))]

    return (
        <div className='input-group mb-3'>
            <span className='input-group-text hotel-label' id='room-type-filter'>
                Filter Room By Room Type
            </span>
            <select className='form-select' value={filter} onChange={handleSelectChange}>
                <option value={""}>Select</option>
                {roomTypes.map((roomType, index) => (
                    <option key={index} value={roomType}>
                        {roomType}
                    </option>
                ))}
            </select>
            <button className='btn btn-hotel' type='button' onClick={clearFilter}>
                Clear
            </button>
        </div>
    )
}

export default RoomFilter