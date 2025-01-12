import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './contexts/AuthContext';
import Home from './pages/Home';
import FlightList from './pages/Flights/FlightList';
import Contact from './pages/Contact';
import About from './pages/About';
import Profile from './pages/Profile';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import BookingPage from './pages/Booking/BookingPage';

// Geçici 404 sayfası
const NotFound = () => (
    <div style={{
        padding: '20px',
        textAlign: 'center',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <h2>404 - Sayfa Bulunamadı</h2>
    </div>
);

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<FlightList />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
                path="/booking"
                element={
                    <PrivateRoute>
                        <BookingPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;