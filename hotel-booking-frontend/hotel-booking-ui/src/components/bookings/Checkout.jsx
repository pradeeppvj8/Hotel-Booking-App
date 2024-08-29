import React, { useEffect, useState } from "react"
import BookingForm from './BookingForm'
import { getRoomById } from '../utils/ApiFunctions'
import LoadingSpinner from '../common/LoadingSpinner'
import { useParams } from "react-router-dom"
import {
    FaUtensils,
    FaWifi,
    FaTv,
    FaWineGlassAlt,
    FaParking,
    FaCar,
    FaTshirt
} from "react-icons/fa"

const Checkout = () => {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    })

    const { roomId } = useParams()

    useEffect(() => {
        setTimeout(() => {
            getRoomById(roomId)
                .then(response => {
                    setRoomInfo(response)
                    setIsLoading(false)
                })
                .catch(error => {
                    setError(error.message)
                    setIsLoading(false)
                })
        }, 2000)
    }, [roomId])

    return (
        <div>
            <section className='container'>
                <div className='row flex-column flex-md-row align-contents-center'>
                    <div className='col-md-4 mt-5 mb-5'>
                        {isLoading ? (
                            <LoadingSpinner />
                        ) : error ? (
                            <p className='text-danger'>{error}</p>
                        ) : (
                            <div className='room-info'>
                                <img src={`data:image/png;base64,${roomInfo.photo}`}
                                    alt='Room Photo'
                                    style={{ width: "100%", height: "200px" }} />
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th>Room Type :</th>
                                            <td>{roomInfo.roomType}</td>
                                        </tr>
                                        <tr>
                                            <th>Room Price :</th>
                                            <td>₹ {roomInfo.roomPrice}</td>
                                        </tr>
                                        <tr>
                                            <th>Room Service : </th>
                                            <td>
                                                <ul className="list-unstyled">
                                                    <li>
                                                        <FaWifi /> Wifi
                                                    </li>
                                                    <li>
                                                        <FaTv /> Netflix Premium
                                                    </li>
                                                    <li>
                                                        <FaUtensils /> Breakfast
                                                    </li>
                                                    <li>
                                                        <FaWineGlassAlt /> Mini bar refreshment
                                                    </li>
                                                    <li>
                                                        <FaCar /> Car Service
                                                    </li>
                                                    <li>
                                                        <FaParking /> Parking Space
                                                    </li>
                                                    <li>
                                                        <FaTshirt /> Laundry
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className='col-md-8'>
                        <BookingForm />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Checkout