import React, { useState } from "react";
import Calendar from "react-date-picker";
import {DateRangePicker} from "react-dates";

const ReactCalendar = ({onChange}) => {
    const [date, setDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(false);


    return (
        <div>
            <Calendar
                onChange={onChange}
                value={date}
                onDatesChange={({Date}) => {
                    setDate(Date);
                    onChange(Date)
                }}
                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={setFocusedInput} // PropTypes.func.isRequired,
            />
            {console.log(date)}

        </div>
    );
};
export default ReactCalendar