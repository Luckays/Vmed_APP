import React from 'react';
import {Line} from "react-chartjs-2";
import HeadTitle from "../components/Head_title";
import api from "../api";
import { useState, useEffect} from 'react';
require('dotenv').config();
function Home() {
   const [ selectedColumn, setSelectedColumn] = useState('Venkovní teplota');

    const [chartData, setChartData] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);
    const [ selectedColumn2, setSelectedColumn2] = useState('Minimum');
    const [ selectedColumn2_1, setSelectedColumn2_1] = useState('Maximum');
    const [chartData2, setChartData2] = useState([]);
    const [chartLabels2, setChartLabels2] = useState([]);
    const [chartData2_1, setChartData2_1] = useState([]);
    const [chartLabels2_1, setChartLabels2_1] = useState([]);
    var date = new Date();
    var date2 = new Date();
    useEffect(() => {
        api.post(process.env.REACT_APP_DATA_ANALYSIS, {
            table_name:process.env.REACT_APP_FIRST_TABLE,
            column:process.env.REACT_APP_FIRST_COLUMN,
            from_date: date.setDate(date.getDate() - 7),
            to_date:Date.now(),
            group_type: "Minimum",
        })
            .then(response => {
                const values = response.data.map(i => i.sel_value)
                setChartData2(values)
                const dates = response.data.map(i => i.date_day)
                setChartLabels2(dates)
                console.log("OK")
            })
    },[]);

    useEffect(() => {
        api.post(process.env.REACT_APP_DATA_ANALYSIS, {
            table_name:process.env.REACT_APP_FIRST_TABLE,
            column:process.env.REACT_APP_FIRST_COLUMN,
            from_date: date2.setDate(date2.getDate() - 7),
            to_date:Date.now(),
            group_type: "Maximum",
        })
            .then(response => {
                const values = response.data.map(i => i.sel_value)
                setChartData2_1(values)
                const dates = response.data.map(i => i.date_day)
                setChartLabels2_1(dates)
                console.log("OK")
            })
    },[]);


    useEffect(() => {

        api.post(process.env.REACT_APP_DATA_DAY, {
            table_name:process.env.REACT_APP_FIRST_TABLE,
            column:process.env.REACT_APP_FIRST_COLUMN,
            date:Date.now()
        })
            .then(response => {
                const values = response.data.map(i => i.sel_value)
                setChartData(values)
                const dates = response.data.map(i => i.day_time)
                setChartLabels(dates)
            })
    },[]);

    return (
        <div className="app h-100">

           <HeadTitle/>
            <div className="container-page">
                <div className="text-white"><div className="text-center"> <h1>  Domovská stránka   </h1> </div></div>
            </div>

            <p>Vítejte na stránkách projektu</p>





            <div className="container-homeGraph">
                <div className="row"
                >
                    <div className="cal-6">
                        <Line



                        data={{


                                labels: chartLabels2,

                                datasets: [{
                                    label: selectedColumn2,
                                    borderColor: 'blue',
                                    data:chartData2,
                                    fill: false,
                                    pointBackgroundColor: '#fff',

                                },{   label: selectedColumn2_1,
                                    data: chartData2_1,
                                    borderColor: 'red',
                                    fill: false,
                                    pointBackgroundColor: '#fff',


                                }]


                            }}





                            options={{ maintainAspectRatio: true,responsive:true,

                                title: {
                                    display: true,
                                    text:'Zobrazení minimální a maximální venkovní teploty za poslední týden',
                                    fontSize:20,
                                }
                            }}

                        />
                    </div>

<div className="cal-6">
    <Line
        data={{
            labels: chartLabels,

            datasets: [{
                label: selectedColumn,
                borderColor: 'blue',
                data:chartData,
                fill: false,
                pointBackgroundColor: '#fff',
            }]


        }}


        options={{ maintainAspectRatio: true,responsive:true,
            title: {
                display: true,
                text:'Zobrazení dnešní venkovní teploty',
                fontSize:20,
            }
        }}

    />
</div>
                </div>
            </div>




        </div>
    );
}

export default Home;
