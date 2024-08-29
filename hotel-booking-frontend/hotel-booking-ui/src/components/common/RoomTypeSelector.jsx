import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    const [roomTypes, setRoomTypes] = useState([""])
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("")

    useEffect(() => {
        getRoomTypes().then(data => {
            setRoomTypes(data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value)
        handleRoomInputChange(e)
    }

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType])
            setShowNewRoomTypeInput(false)
            setNewRoomType("")
        }
    }

    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select id='roomType' name='roomType'
                        className='form-select'
                        value={newRoom.roomType}
                        onChange={(e) => {
                            if (e.target.value === 'Add New') {
                                setShowNewRoomTypeInput(true)
                            } else {
                                handleNewRoomTypeInputChange(e)
                            }
                        }}>

                        <option value={""}>Select</option>
                        <option value={"Add New"}>Add New</option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>

                    {showNewRoomTypeInput && (
                        <div className='input-group mt-3'>
                            <input className='form-control' type='text' placeholder='Enter new room type'
                                onChange={handleNewRoomTypeInputChange} />
                            <button type='button' className='btn btn-hotel' onClick={handleAddNewRoomType}>
                                Add
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default RoomTypeSelector