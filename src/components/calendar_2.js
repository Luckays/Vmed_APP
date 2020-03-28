import React, { useState } from "react";
import Calendar from "react-date-picker";
import {DateRangePicker} from "react-dates";

const ReactCalendar = ({onChange}) => {
    const [date, setDate] = useState(null);



    return (
        <div>
            <Calendar
                value={date}
                onChange={(date) => {
                    setDate(date);
                    onChange(date);
                }}

            />

        </div>
    );
};
export default ReactCalendar