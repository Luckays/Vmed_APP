import React, { useState } from 'react'

const Mnau = ({ sloupec }) => {
    const [ groupType, setGroupType ] = useState('zadna');

    const onGroupTypeChange = e => {
        setGroupType(e.target.value)
    };

    return (
        <div>
            <select onChange={onGroupTypeChange}>
                <option>sum</option>
                <option>max</option>
                <option>min</option>
                <option>avg</option>
            </select>

            <div>
                { groupType } <br />
                { sloupec }
            </div>
        </div>
    )
};

export default Mnau
