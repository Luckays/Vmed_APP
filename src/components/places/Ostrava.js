import ActualPost from "../ActualPost";
import {Line} from "react-chartjs-2";
import React, { Component,useState, useEffect} from 'react';
import VariablePost from "../VariablePost";

const Ostrava=() => {

    const [date, setDate] = useState('--');

    const [teplota, setTeplota] = useState('--');
    const [tlak, setTlak] = useState('--');
    const [vlhkost, setVlhkost] = useState('--');

    const [chartTeplotaData, setchartTeplotaData] = useState([]);
    const [chartTeplotaLabels, setchartTeplotaLabels] = useState([]);
    const [chartTlakData, setchartTlakData] = useState([]);
    const [chartTlakLabels, setchartTlakLabels] = useState([]);
    const [chartVlhkostData, setchartVlhkostData] = useState([]);
    const [chartVlhkostLabels, setchartVlhkostLabels] = useState([]);

    useEffect(() => {
        ActualPost("ostrava_rinex_table",'teplota',Date.now(),setchartTeplotaData,setchartTeplotaLabels);
        ActualPost("ostrava_rinex_table",'tlak',Date.now(),setchartTlakData,setchartTlakLabels);
        ActualPost("ostrava_rinex_table",'vlhkost',Date.now(),setchartVlhkostData,setchartVlhkostLabels);
        VariablePost("ostrava_rinex_table","teplota","tlak","vlhkost",Date.now(),setTeplota,setTlak,setVlhkost,setDate);

    },[]);

    return (
        <div className="box">
            <div className="actual_place">
                <h2>OSTRAVA {date}</h2>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="actual_text">
                        <h2>Teplota: {teplota} °C</h2>
                    </div>
                </div>

                <div className="col-4">
                    <div className="actual_text">
                        <h2>Tlak: {tlak} hPa</h2>
                    </div>
                </div>

                <div className="col-4">
                    <div className="actual_text">
                        <h2>Vlhkost: {vlhkost} %</h2>
                    </div>
                </div>


            </div>
            <div className="container-actualGraph1">
                <Line
                    data={{
                        labels: chartTeplotaLabels,
                        datasets: [{
                            borderColor: 'red',
                            data:chartTeplotaData,
                            fill: false,
                            pointBackgroundColor: '#fff',
                        }]
                    }}
                    options={{ maintainAspectRatio: false,
                        legend: {display: false}}
                    }
                />
            </div>

            <div className="container-actualGraph2">
                <Line
                    data={{
                        labels: chartTlakLabels,
                        datasets: [{
                            borderColor: 'green',
                            data:chartTlakData,
                            fill: false,
                            pointBackgroundColor: '#fff',
                        }]
                    }}
                    options={{ maintainAspectRatio: false,
                        legend: {display: false}}
                    }
                />
            </div>


            <div className="container-actualGraph3">
                <Line
                    data={{
                        labels: chartVlhkostLabels,
                        datasets: [{
                            borderColor: 'blue',
                            data:chartVlhkostData,
                            fill: false,
                            pointBackgroundColor: '#fff',
                        }]
                    }}
                    options={{ maintainAspectRatio: false,
                        legend: {display: false}}
                    }
                />
            </div>

        </div>

    )
};

export default Ostrava;