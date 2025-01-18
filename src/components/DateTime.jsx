import { useContext, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { StateContext } from '../context/StateContext';

export default function DateTime() {
    const [timeOptions, setTimeOptions] = useState([]);

    const { selectedDate, setSelectedDate } = useContext(StateContext);

    const generateTimeOptions = (startHour, endHour, interval) => {
        const times = [];
        const now = new Date();

        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += interval) {
                const time = new Date();
                time.setHours(hour, minute, 0, 0);

                if (selectedDate || time >= now) {
                    times.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                }
            }
        }
        return times;
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if(date) {
            setTimeOptions(generateTimeOptions(6,12,15));
        }
        else {
            const now = new Date();
            const startHour = now.getHours();
            const startMinute = now.getMinutes();
            const options = [];

            for (let i=0; i<8; i++) {
                const time = new Date(now.getTime() + i * 15 * 60 * 1000);
                options.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            }
            setTimeOptions(options);
        }
    };
    
    return (
        <div className="date-time flex justify-between">
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
                    onChange={(date) => handleDateChange(date)} // Handle date change
                    placeholderText="Today"
                    className="cursor-pointer w-100"
                    minDate={new Date()} // Disable previous dates
                    dateFormat="MMM dd" // Optional: format the date display
                    todayButton="Today" // Optional: add a "Today" button
                />
                {selectedDate !== null && (
                    <i className='bx bxs-x-circle mt-1' onClick={() => setSelectedDate(null)}></i>
                )}
            </div>

            <div className="time w-[49%] cursor-pointer">
                <i className='bx bxs-time mr-5 ml-2 text-[20px]'></i>
                <ul>
                    <input type="text" disabled placeholder='Now' className='bg-transparent cursor-pointer' />
                </ul>
                <i className='bx bxs-chevron-down mt-1'></i>
            </div>
        </div>

    )
}
