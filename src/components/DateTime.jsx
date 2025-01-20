import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { StateContext } from '../context/StateContext';

export default function DateTime() {

    const [isDropDowmVisible, setIsDropDowmVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState("");
    const { selectedDate, setSelectedDate, timeOptions, setTimeOptions } = useContext(StateContext);

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    // console.log(selectedDate  === Date());
    

    const generateTimeOptions = useMemo(() => {
        const times = [];
        const endHour = 23; // 11 PM
        const now = new Date();
        if (selectedDate === null || selectedDate.toDateString() === now.toDateString()) {
            let hour = now.getHours();
            let minute = now.getMinutes();

            minute = Math.ceil(minute / 5) * 5;
            if (minute === 60) {
                minute = 0;
                hour += 1;
            }

            while (hour < endHour || (hour === endHour && minute === 0)) {
                // Format time in 12-hour format with AM/PM
                const period = hour >= 12 ? "PM" : "AM";
                const formattedHour = hour % 12 || 12;
                const formattedMinute = minute.toString().padStart(2, "0");
                times.push(`${formattedHour}:${formattedMinute} ${period}`);

                // Increment by 15 minutes
                minute += 15;
                if (minute >= 60) {
                    minute = 0;
                    hour += 1;
                }
            }
        }
        else {
            let hour = 6;
            let minute = 0;
    
            while (hour < endHour || (hour === endHour && minute === 0)) {
                // Format time in 12-hour format with AM/PM
                const period = hour >= 12 ? "PM" : "AM";
                const formattedHour = hour % 12 || 12;
                const formattedMinute = minute.toString().padStart(2, "0");
    
                if (minute % 5 === 0) { // Only include multiples of 5
                    times.push(`${formattedHour}:${formattedMinute} ${period}`);
                }
    
                // Increment by 15 minutes
                minute += 15;
                if (minute >= 60) {
                    minute = 0;
                    hour += 1;
                }
            }
        }
        return times;
        // return [];
    }, [selectedDate]);

    useEffect(() => {
        setTimeOptions(generateTimeOptions)
    }, [generateTimeOptions])

    function toggleDropdown() {
        setIsDropDowmVisible(prev => !prev);
    }
    

    const handleSelection = (time) => {
        if(selectedDate === null){
            const today = new Date();
            setSelectedDate(today)
        }
        setSelectedTime(time);
        setIsDropDowmVisible(false);
    }

    return (
        <div className="date-time w-[350px] mb-5 flex justify-between ">
            <div className="date w-[49%] cursor-pointer">
                <span className='mr-3'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#000"
                    >
                        <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
                    </svg>
                </span>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => handleDateChange(date)}
                    placeholderText="Today"
                    className="cursor-pointer w-100"
                    minDate={new Date()}
                    dateFormat="MMM dd"
                    todayButton="Today"
                />
                {selectedDate !== null && (
                    <i className='bx bxs-x-circle mt-1' onClick={() => setSelectedDate(null)}></i>
                )}
            </div>

            <div className="time w-[49%] active:border cursor-pointer relative">
                {isDropDowmVisible && (
                    <ul className='absolute w-[100%] h-[150px] top-11 left-0 overflow-y-scroll shadow-lg bg-white border rounded-md'>
                        {timeOptions.map((time, index) => (
                            <li onClick={() => handleSelection(time)} key={index} className="cursor-pointer pl-5 py-1 hover:bg-slate-200 font-light">{time}</li>
                        ))}
                    </ul>
                )}
                <i className='bx bxs-time mr-5 ml-2 text-[20px]'></i>
                <div onClick={toggleDropdown} className="input-box flex">
                    <input
                        readOnly
                        type="text"
                        value={selectedTime}
                        placeholder='Now'
                        className='bg-transparent cursor-pointer' />
                    <i className='bx bxs-chevron-down mt-1'></i>
                </div>
            </div>
        </div>
    )
}
