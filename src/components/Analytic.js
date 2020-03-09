import React, { useState, useEffect,Component} from 'react';
const Analytic = ({onChange}) => {
    const [ groupType, setGroupType ] = useState('--');
    const onGroupTypeChange = e => setGroupType(e.target.value);
    return (

                <select onChange={onGroupTypeChange} value={groupType}>
                    <option>--</option>
                    <option>Součet</option>
                    <option>Maximum</option>
                    <option>Minimum</option>
                    <option>Průměr</option>
                    <option>Vše</option>
                </select>

    )
}

export default Analytic;