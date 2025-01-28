import { signInAnonymously } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from '../firebase';


export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [mode, setMode] = useState('ride');
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [timeOptions, setTimeOptions] = useState([]);
    const [pickupCoordinates, setPickupCoordinates] = useState(null);
    const [dropoffCoordinates, setDropoffCoordinates] = useState(null);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        if (storedAuth) {
            setIsAuthenticated(JSON.parse(storedAuth));
        }
    }, []);

    function showPasswordToggle() {
        setShowPassword(prev => !prev);
    }


    const guestLogin = async () => {
        try {
            const result = await signInAnonymously(auth);
            localStorage.setItem('user', JSON.stringify(result.user));
            setCurrentUser(result.user);

            localStorage.setItem('isAuthenticated', true);
            setIsAuthenticated(true);
        }
        catch (error) {
            console.log("err" + error);
        }
    }

    return (
        <StateContext.Provider value={{
            mode, setMode,
            pickup, setPickup,
            dropoff, setDropoff,
            selectedDate, setSelectedDate,
            timeOptions, setTimeOptions,
            pickupCoordinates, setPickupCoordinates,
            dropoffCoordinates, setDropoffCoordinates,
            distance, setDistance,
            duration, setDuration,
            showPassword, setShowPassword, showPasswordToggle,
            selectedTime, setSelectedTime,
            currentUser, setCurrentUser, guestLogin,
            isAuthenticated, setIsAuthenticated,
        }}>
            {children}
        </StateContext.Provider>
    )
}
