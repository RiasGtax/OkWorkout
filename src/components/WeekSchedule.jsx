import { useState } from 'react';
import './WeekSchedule.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00'
];

const WeekSchedule = () => {
    // State to track selected slots
    const [selectedSlots, setSelectedSlots] = useState({});

    // Toggle slot selection
    const toggleSlot = (day, time) => {
        const key = `${day}-${time}`;
        setSelectedSlots(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // Check if a slot is selected
    const isSelected = (day, time) => {
        return selectedSlots[`${day}-${time}`] || false;
    };

    return (
        <div className="week-schedule">
            <div className="schedule-container">
                <div className="schedule-grid">
                    {/* Day headers */}
                    <div className="day-headers">
                        <div className="time-column-header">Time</div>
                        {DAYS.map(day => (
                            <div key={day} className="day-header">
                                <span className="day-name">{day}</span>
                                <span className="day-abbr">{day.slice(0, 3)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Time slots grid */}
                    <div className="time-slots-container">
                        {TIME_SLOTS.map(time => (
                            <div key={time} className="time-row">
                                <div className="time-label">{time}</div>
                                {DAYS.map(day => (
                                    <button
                                        key={`${day}-${time}`}
                                        className={`time-slot ${isSelected(day, time) ? 'selected' : ''}`}
                                        onClick={() => toggleSlot(day, time)}
                                        aria-label={`${day} at ${time}`}
                                    >
                                        {isSelected(day, time) && (
                                            <span className="workout-indicator">Workout day</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeekSchedule;
