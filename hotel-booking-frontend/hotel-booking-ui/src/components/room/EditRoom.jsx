import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { FaBackward } from 'react-icons/fa'

const EditRoom = () => {
    const [room, setRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    })

    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const { roomId } = useParams()

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setRoom({ ...room, photo: selectedImage })
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        setRoom({ ...room, [name]: value })
    }

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId)
                setRoom(roomData)
                setImagePreview(roomData.photo)
            } catch (error) {
                console.error(error.message)
            }
        }
        fetchRoom()
    }, [roomId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await updateRoom(roomId, room)

            if (response.status === 200) {
                setSuccessMessage("Room was updated successfully!!!")
                const updatedRoom = await getRoomById(roomId)
                setRoom(updatedRoom)
                setImagePreview(updatedRoom.photo)
                setErrorMessage("")
            } else {
                setErrorMessage("Could not update the room")
                setSuccessMessage("")
            }
        } catch (error) {
            setErrorMessage(error.message)
            setSuccessMessage("")
        }
    }

    return (
        <div className="container mt-5 mb-5">
            <h3 className="text-center mb-5 mt-5">Edit Room</h3>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        {/* Room Type */}
                        <div className="mb-3">
                            <label htmlFor="roomType" className="form-label hotel-color hotel-label">
                                Room Type
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="roomType"
                                name="roomType"
                                value={room.roomType}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/* Room Price */}
                        <div className="mb-3">
                            <label htmlFor="roomPrice" className="form-label hotel-color hotel-label">
                                Room Price
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="roomPrice"
                                name="roomPrice"
                                value={room.roomPrice}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Room Photo */}
                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label hotel-color hotel-label">
                                Photo
                            </label>
                            <input
                                required
                                type="file"
                                className="form-control"
                                id="photo"
                                name="photo"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <img
                                    src={`data:image/jpeg;base64,${imagePreview}`} alt='Room Photo Preview'
                                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                                    className="mt-3 mb-3"
                                />
                            )}
                        </div>
                        <div className="d-grid gap-2 d-md-flex mt-2">
                            <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5 hotel-label">
                                <FaBackward /> Back
                            </Link>
                            <button type="submit" className="btn btn-outline-warning hotel-label">
                                Edit Room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditRoom