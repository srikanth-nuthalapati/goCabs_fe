import { Children, createContext, useState } from "react";


export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [mode, setMode] = useState('ride');
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeOptions, setTimeOptions] = useState([]);
    

    return (
        <StateContext.Provider value={{
            mode, setMode, 
            pickup, setPickup, 
            dropoff, setDropoff, 
            selectedDate, setSelectedDate, 
            timeOptions, setTimeOptions
            }}>
            { children }
        </StateContext.Provider>
    )
}
