import React, { useState, useEffect,Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {DateRangePicker} from 'react-dates';


const Calendar = ({onChange}) => {
    const [focusedInput, setFocusedInput] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

 return (
        <DateRangePicker
            startDate={startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={endDate} // momentPropTypes.momentObj or null,
            endDateId='endDate'// PropTypes.string.isRequired,
            isOutsideRange={date => date.isAfter(Date.now()) }
            onDatesChange={({startDate, endDate}) => {
                setStartDate(startDate);
                setEndDate(endDate)
                onChange(startDate,endDate)
            }} // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={setFocusedInput} // PropTypes.func.isRequired,
            timeFormat="HH:mm"
            numberOfMonths={1}
        />
    )
};

export default Calendar