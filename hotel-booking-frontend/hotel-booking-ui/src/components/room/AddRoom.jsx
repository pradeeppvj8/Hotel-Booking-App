import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunctions'
import RoomTypeSelector from '../common/RoomTypeSelector'
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    })

    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleRoomInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value

        if (name === 'roomPrice') {
            if (!isNaN(value)) {
                Number.parseInt(value)
            } else {
                value = ""
            }
        }
        setNewRoom({ ...newRoom, [name]: value })
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewRoom({ ...newRoom, photo: selectedImage })
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)

            if (success !== undefined) {
                setSuccessMessage("New Room was added successfully!!!")
                setNewRoom({ photo: null, roomType: "", roomPrice: "" })
                setImagePreview("")
                setErrorMessage("")
            } else {
                setErrorMessage("Could not add new room")
                setSuccessMessage("")
            }
        } catch (error) {
            setErrorMessage(error.message)
            setSuccessMessage("")
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    return (
        <>
            <section className='container mt-5 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <h3 className='mt-2 mb-2 text-center'>Add a new room</h3>
                        {successMessage && (
                            <div className='alert alert-success fade show'>
                                {successMessage}
                            </div>
                        )}
                        {errorMessage && (
                            <div className='alert alert-danger fade show'>
                                {errorMessage}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className='p-3 mt-2'>
                            {/* Room Type */}
                            <div className='mb-3'>
                                <label htmlFor='roomType' className='form-label hotel-color hotel-label'>Room Type</label>
                                <div>
                                    <RoomTypeSelector
                                        handleRoomInputChange={handleRoomInputChange} newRoom={newRoom} />
                                </div>
                            </div>
                            {/* Room Price */}
                            <div className='mb-3'>
                                <label htmlFor='roomPrice' className='form-label hotel-color hotel-label'>Room Price</label>
                                <input className='form-control' required id="roomPrice" name='roomPrice'
                                    value={newRoom.roomPrice} onChange={handleRoomInputChange} type='number' />
                            </div>
                            {/* Room Photo */}
                            <div className='mb-3'>
                                <label htmlFor='photo' className='form-label hotel-color hotel-label'>Room Photo</label>
                                <input id='photo' name='photo' type='file' className='form-control'
                                    onChange={handleImageChange} />
                                {/* Image Preview */}
                                {imagePreview && (
                                    <img src={imagePreview} alt='Room Photo Preview'
                                        style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        className='mt-3 mb-3' />
                                )}
                            </div>

                            <div className='d-grid gap-2 d-md-flex mt-2'>
                                {/* Back */}
                                <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5 hotel-label">
                                    <FaBackward /> Back
                                </Link>
                                {/* Save Room */}
                                <button className='btn btn-outline-primary ml-5 hotel-label'>Save Room</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddRoom