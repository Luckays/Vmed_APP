import React, { Component,useState, useEffect} from 'react';
import '../styles/main.scss'
import api from "../api";
import Calendar from "../components/calendar"
import {Line} from 'react-chartjs-2'
import fileDownload from 'js-file-download'
import ReactCalendar from "../components/calendar_2";
import Realpost from "../components/Realpost";
import HeadTitle from "../components/Head_title";
import moment from "moment";
require('dotenv').config();
function Short_data_view() {


    const [ selectedTable, setSelectedTable ] = useState('--');
    const [ tables, setTables ] = useState([]);
    const [ selectedColumn, setSelectedColumn] = useState('--');
    const [ columns, setColumns] = useState([]);
    const [ groupType, setGroupType ] = useState('--');
    const [Date_day, setDate_day] = useState(null);
    const [ selectedDate_day, setSelectedDate_day] = useState(null);
    const [text, setText] = useState("Off");
    const [endDate_day, setEndDate_day] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);
    useEffect(() => {
        api.get(process.env.REACT_APP_DATA_TABLES)
            .then(res => {
                setTables(res.data)
            })

    }, []);

    useEffect(() => {

console.log(moment(Date.now()).format('YYYY-MM-DD'));
        api.post(process.env.REACT_APP_DATA_DAY, {
            table_name:process.env.REACT_APP_FIRST_TABLE,
            column:process.env.REACT_APP_FIRST_COLUMN,
            date:moment(Date.now()).format('YYYY-MM-DD')
        })
            .then(response => {
                const values = response.data.map(i => i.sel_value);
                setChartData(values);
                const dates = response.data.map(i => i.day_time);
                setChartLabels(dates)
            })
    },[]);




    useEffect(() => {
        if (selectedTable === '--') return;
        api.post(process.env.REACT_APP_DATA_COLUMNS, { table_name: selectedTable })
            .then(res => setColumns(res.data.data))
    }, [selectedTable]);// input pouze pri zmene defi hodnoty, bez pri jakoliv zmene, prazdne jen pri prvni*/

        useEffect(() => {
console.log(text);
            if (text === 'On') return;
            console.log(selectedTable, selectedColumn, Date_day);
            if (Date_day === null || selectedTable === '--' || selectedColumn === '--') return;
                console.log('inside');
            api.post(process.env.REACT_APP_DATA_DAY, {
                table_name: selectedTable,
                column: selectedColumn,
                date: Date_day
            })

                .then(response => {
                    const values = response.data.map(i => i.sel_value);
                    setChartData(values);
                    const dates = response.data.map(i => i.day_time);
                    setChartLabels(dates)
                })}
        , [selectedTable, selectedColumn, Date_day, text]);


    useEffect(() => {

        if(text === 'Off') {return;}

        console.log(selectedTable,selectedColumn,Date_day);
            if (selectedTable === '--'||selectedColumn === '--'||Date_day===null) return;
        console.log('inside on');
        let today = Date.now();
        console.log(selectedTable,selectedColumn,today);
        Realpost(selectedTable,selectedColumn,today,setChartData,setChartLabels);
        var minutes = 1, the_interval = minutes * 60 * 1000;
        setInterval(function () {
       Realpost(selectedTable,selectedColumn,today,setChartData,setChartLabels);
        }, the_interval)
    },[selectedTable,selectedColumn,text]);





    const onTableNameChange = e => setSelectedTable(e.target.value);
    const onColumnNameChange = e => setSelectedColumn(e.target.value);
    const onGroupTypeChange = e => setGroupType(e.target.value);

    var  downloadTxtFile = () => {
        if (Date_day === null ||  selectedTable === '--'||selectedColumn === '--') return;
        api.post(process.env.REACT_APP_DATA_DOWNLOAD_DAY , {
            table_name: selectedTable,
            column: selectedColumn,
            date:Date_day
        }).then(response => {
            const dvalues = response.data;
            fileDownload(dvalues, 'Data'+Date.now()+'.csv');
            console.log(dvalues)
        })


    };

    var showRealtime = (text) => {
        if (text=== 'On'){



        }
    };
   var changeText = (text) => {
        if (text === 'Off'){
        text = 'On'}
        else {text = 'Off'}
       setText(text);
       setDate_day(Date_day)

   };

    return (
        <div className="app h-100">
            <HeadTitle/>

            <div className="container-page">
                <div className="text-white"><div className="text-center"> <h1>  Denní data    </h1> </div></div>
            </div>



            <div className="container-selects_short">
                <div className="row">

                    <div className="col-2">
                        <h2>Výběr tabulky</h2>
                    </div>

                    <div className="col-3">
                        <h2>Výběr hodnoty</h2>
                    </div>

                    <div className="col-3">
                        <h2>Výběr dne</h2>
                    </div>

                    <div className="col-4">
                        {/*   <h2>Zobrazení v reálném čase</h2> */}
                    </div>


                </div>
            </div>

            <div className="container-selects_short2">
                <div className="row">

                    <div className="col-2">
                        <select onChange={onTableNameChange}>
                            <option>--</option>
                            { tables.map(table => <option key={table.name_table} value={table.name_table}>{ table.title }</option>) }
                        </select>
                    </div>

                    <div className="col-3">
                        <select onChange={onColumnNameChange}>
                            <option>--</option>
                            { columns.map(column => <option key={column} value={column}>{ column }</option>) }
                        </select>

                    </div>

                    <div className="col-3">
                        <div>
                            <ReactCalendar
                                onChange={(Date_day) => {
                                    setDate_day(Date_day);
                                }}

                            />

                        </div>
                    </div>

                      <div className="col-2">
                          {/*
                        <button onClick={showRealtime}
                                onClick = {()=> {changeText(text)}}>{text}
                        </button>
*/}
                    </div>

                    <div className="col-2">
                        <button onClick={downloadTxtFile}>
                            Uložit
                        </button>
                    </div>

                </div>

            </div>

            <div className="container-graph_short ">

                    <Line
                        data={{
                            labels: chartLabels,
                            datasets: [{
                                label: selectedColumn,
                                borderColor: 'red',
                                data:chartData,
                                fill: false,
                                pointBackgroundColor: '#fff',
                            }]


                        }}



                        options={{ maintainAspectRatio: false}}

                    />
            </div>





        </div>
    );
}

export default Short_data_view
