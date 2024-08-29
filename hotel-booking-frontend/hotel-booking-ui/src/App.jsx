import { useState } from 'react'
import './App.css'
import AddRoom from './components/room/AddRoom'
import ExistingRooms from './components/room/ExistingRooms'
import EditRoom from './components/room/EditRoom'
import Home from './components/home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import RoomListing from './components/room/RoomListing'
import Admin from './components/admin/Admin'
import Checkout from './components/bookings/Checkout'
import BookingSuccess from './components/bookings/BookingSuccess'
import Bookings from './components/bookings/Bookings'
import FindBookings from './components/bookings/FindBookings'
import Login from './components/auth/Login'
import { Registration } from './components/auth/Registration'
import Profile from './components/auth/Profile'
import { Logout } from './components/auth/Logout'
import { AuthProvider } from './components/auth/AuthProvider'
import { RequireAuth } from './components/auth/RequireAuth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <main>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/edit-room/:roomId' element={<EditRoom />} />
            <Route path='/existing-rooms' element={<ExistingRooms />} />
            <Route path='/add-room' element={<AddRoom />} />
            <Route path='/book-room/:roomId' element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            } />
            <Route path='/browse-all-rooms' element={<RoomListing />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/booking-success' element={<BookingSuccess />} />
            <Route path='/existing-bookings' element={<Bookings />} />
            <Route path='/find-bookings' element={<FindBookings />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </main>
    </AuthProvider>
  )
}

export default App
