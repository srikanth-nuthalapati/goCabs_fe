import { Children, createContext, useState } from "react";


export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [mode, setMode] = useState('ride');
    const [location, setLocation] = useState(null);
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <StateContext.Provider value={{mode, setMode, pickup, setPickup, dropoff, setDropoff, selectedDate, setSelectedDate}}>
            { children }
        </StateContext.Provider>
    )
}
