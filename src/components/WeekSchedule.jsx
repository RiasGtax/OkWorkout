import { useState } from 'react';
import './WeekSchedule.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00'
];

const WORKOUT_TYPES = [
    { id: 'cardio', name: 'Cardio', color: 'var(--workout-cardio)' },
    { id: 'strength', name: 'Strength', color: 'var(--workout-strength)' },
    { id: 'yoga', name: 'Yoga', color: 'var(--workout-yoga)' },
    { id: 'hiit', name: 'HIIT', color: 'var(--workout-hiit)' },
    { id: 'stretching', name: 'Stretching', color: 'var(--workout-stretching)' },
    { id: 'rest', name: 'Rest', color: 'var(--workout-rest)' }
];

const WeekSchedule = () => {
    // State to track selected workout type
    const [selectedWorkoutType, setSelectedWorkoutType] = useState('cardio');

    // State to track scheduled workouts: { "Monday-06:00": { type: "cardio", name: "Cardio" }, ... }
    const [scheduledWorkouts, setScheduledWorkouts] = useState({});

    // Add or remove workout from a time slot
    const handleSlotClick = (day, time) => {
        const key = `${day}-${time}`;

        if (scheduledWorkouts[key]) {
            // If clicking a rest day slot, remove all rest slots for that day
            if (scheduledWorkouts[key].type === 'rest') {
                setScheduledWorkouts(prev => {
                    const newSchedule = { ...prev };
                    // Remove all time slots for this day
                    TIME_SLOTS.forEach(timeSlot => {
                        const slotKey = `${day}-${timeSlot}`;
                        if (newSchedule[slotKey]?.type === 'rest') {
                            delete newSchedule[slotKey];
                        }
                    });
                    return newSchedule;
                });
            } else {
                // Remove single workout if slot already has one
                setScheduledWorkouts(prev => {
                    const newSchedule = { ...prev };
                    delete newSchedule[key];
                    return newSchedule;
                });
            }
        } else {
            // Add selected workout type to slot
            const selectedType = WORKOUT_TYPES.find(type => type.id === selectedWorkoutType);

            if (selectedWorkoutType === 'rest') {
                // For rest, block the entire day
                setScheduledWorkouts(prev => {
                    const newSchedule = { ...prev };
                    // Add rest to all time slots for this day
                    TIME_SLOTS.forEach(timeSlot => {
                        const slotKey = `${day}-${timeSlot}`;
                        newSchedule[slotKey] = {
                            type: 'rest',
                            name: selectedType.name,
                        };
                    });
                    return newSchedule;
                });
            } else {
                // Add single workout for non-rest types
                setScheduledWorkouts(prev => ({
                    ...prev,
                    [key]: {
                        type: selectedWorkoutType,
                        name: selectedType.name,
                    }
                }));
            }
        }
    };

    // Check if a slot has a scheduled workout
    const getScheduledWorkout = (day, time) => {
        return scheduledWorkouts[`${day}-${time}`];
    };

    // Check if an entire day is marked as rest
    const isDayRest = (day) => {
        return TIME_SLOTS.every(time => {
            const workout = scheduledWorkouts[`${day}-${time}`];
            return workout && workout.type === 'rest';
        });
    };

    // Clear all scheduled workouts
    const clearAllWorkouts = () => {
        setScheduledWorkouts({});
    };

    return (
        <div className="week-schedule">
            <div className="schedule-container">
                <div className="schedule-grid">
                    {/* Day headers */}
                    <div className="day-headers">
                        {/* Currently not displaying the time label */}
                        {/* <div className="time-column-header"></div> */}
                        {DAYS.map(day => (
                            <div key={day} className="day-header">
                                <span className="day-name">{day}</span>
                                <span className="day-abbr">{day.slice(0, 3)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Time slots grid */}
                    <div className="time-slots-container">
                        {/* Rest day overlay cells - absolutely positioned */}
                        {DAYS.map((day, dayIndex) => {
                            if (isDayRest(day)) {
                                // Calculate position: skip time column (80px) + previous day columns
                                const columnWidth = `calc((100% - 80px) / 7)`;
                                const leftPosition = `calc(80px + ${columnWidth} * ${dayIndex})`;

                                return (
                                    <div
                                        key={`rest-${day}`}
                                        className="rest-day-cell"
                                        style={{
                                            left: leftPosition,
                                            width: columnWidth
                                        }}
                                        onClick={() => handleSlotClick(day, TIME_SLOTS[0])}
                                    >
                                        <div className="rest-day-content">
                                            <span className="rest-day-name">Rest Day</span>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}

                        {/* Regular time slots */}
                        {TIME_SLOTS.map(time => (
                            <div key={time} className="time-row">
                                {/* Currently not displaying the time label */}
                                {/* <div className="time-label">{time}</div> */}
                                {DAYS.map(day => {
                                    const workout = getScheduledWorkout(day, time);
                                    const isRestDay = isDayRest(day);

                                    return (
                                        <button
                                            key={`${day}-${time}`}
                                            className={`time-slot ${workout && !isRestDay ? `has-workout workout-${workout.type}` : ''} ${isRestDay ? 'hidden-rest' : ''}`}
                                            onClick={() => handleSlotClick(day, time)}
                                            aria-label={`${day} at${time}`}
                                        >
                                            {workout && !isRestDay && (
                                                <div className="workout-content">
                                                    <span className="workout-name">{workout.name}</span>
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Workout Selector Panel */}
            <div className="selector-container">
                <div className="selector-panel">
                    <h2 className="selector-title">Workout Types</h2>
                    <p className="selector-subtitle">Select a workout type, then click on the schedule to add it</p>

                    <div className="workout-types">
                        {WORKOUT_TYPES.map(workout => (
                            <button
                                key={workout.id}
                                className={`workout-type-btn ${selectedWorkoutType === workout.id ? 'active' : ''}`}
                                onClick={() => setSelectedWorkoutType(workout.id)}
                                data-workout-type={workout.id}
                            >
                                <span className="workout-type-icon">{workout.icon}</span>
                                <span className="workout-type-name">{workout.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Clear All Button */}
                    <div className="selector-clear">
                        <button className="clear-all-btn" onClick={clearAllWorkouts}>
                            Clear Everything
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeekSchedule;
