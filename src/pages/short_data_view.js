import React, { Component,useState, useEffect} from 'react';
import '../styles/main.scss'
import api from "../api";
import image from '../components/logo.png'
import Calendar from "../components/calendar"
import {Line} from 'react-chartjs-2'
import fileDownload from 'js-file-download'
import ReactCalendar from "../components/calendar_2";
function Short_data_view() {
    const [ selectedTable, setSelectedTable ] = useState('--');
    const [ tables, setTables ] = useState([]);
    const [ selectedColumn, setSelectedColumn] = useState('--');
    const [ columns, setColumns] = useState([]);
    const [ groupType, setGroupType ] = useState('--');
    const [Date, setDate] = useState(null);
    const [ selectedDate, setSelectedDate] = useState(null);

    const [endDate, setEndDate] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);
    useEffect(() => {
        api.get('/tables')
            .then(res => {
                setTables(res.data)
            })

    }, []);

    useEffect(() => {

        api.post('/show_data_day', {
            table_name:"mol_table",
            column:"teplota_GPS_anteny",
            from_date:"2005-09-09 00:00:00",
            to_date:"2005-09-10 00:01:00",
            group_type: "Vše"
        })
            .then(response => {
                const values = response.data.map(i => i.sel_value)
                setChartData(values)
                const dates = response.data.map(i => i.day_time)
                setChartLabels(dates)
            })
    },[]);




    useEffect(() => {
        if (selectedTable === '--') return;
        api.post('/columns', { table_name: selectedTable })
            .then(res => setColumns(res.data.data))
    }, [selectedTable]);// input pouze pri zmene defi hodnoty, bez pri jakoliv zmene, prazdne jen pri prvni*/

    useEffect(() => {
        console.log(selectedTable,selectedColumn,Date,endDate,groupType)
        if (Date === null || endDate === null || groupType === '--' ||groupType === undefined|| selectedTable === '--'||selectedColumn === '--') return;
        api.post('/show_data', {
            table_name: selectedTable,
            column: selectedColumn,
            from_date:Date.format('YYYY-MM-DD HH:mm:ss'),
            to_date:endDate.format('YYYY-MM-DD HH:mm:ss'),
            group_type: groupType
        })
            .then(response => {
                const values = response.data.map(i => i.sel_value)
                setChartData(values)
                const dates = response.data.map(i => i.day_time)
                setChartLabels(dates)
            })

    },[selectedTable,selectedColumn,Date,endDate,groupType])

    const onTableNameChange = e => setSelectedTable(e.target.value);
    const onColumnNameChange = e => setSelectedColumn(e.target.value);
    const onGroupTypeChange = e => setGroupType(e.target.value);
    //const onDateChange = e => setSelectedDate(e.target.value);

    var  downloadTxtFile = () => {
        if (Date === null || endDate === null || groupType === '--' ||groupType === undefined|| selectedTable === '--'||selectedColumn === '--') return;
        api.post('/download', {
            table_name: selectedTable,
            column: selectedColumn,
            from_date:Date.format('YYYY-MM-DD HH:mm:ss'),
            to_date:endDate.format('YYYY-MM-DD HH:mm:ss'),
            group_type: groupType
        }).then(response => {
            const dvalues = response.data
            // const ddates = response.data.map(i => i.date_day)
            fileDownload(dvalues, 'Data'+Date.now()+'.csv');
            console.log(dvalues)
        })

    }



    return (
        <div className="app h-100">
            <div className="container-preface">
                <p className="text-white"><p className="text-center"> <h1>  Vizualizace meteorologických a environmentálních dat Geodetické observatoře Pecný - denní data     <img src={image} alt="Logo" height="95" width="95" align="top"/></h1> </p></p>
            </div>


            <div className="container-selects">
                <div className="row">

                    <div className="col-2">
                        <label>Výběr tabulky</label>
                        <select onChange={onTableNameChange}>
                            <option>--</option>
                            { tables.map(table => <option key={table.name_table} value={table.name_table}>{ table.title }</option>) }
                        </select>
                    </div>

                    <div className="col-3">
                        <label>Výběr zobrazované hodnoty</label>
                        <select onChange={onColumnNameChange}>
                            <option>--</option>
                            { columns.map(column => <option key={column} value={column}>{ column }</option>) }
                        </select>

                    </div>

                    <div className="col-3">
                        <label>Výběr data</label>
                        <div>
                            <ReactCalendar
                                onChange={(Date) => {
                                    setDate(Date);
                                }}

                            />

                        </div>
                    </div>

                    <div className="col-2">
                        <label>Analytické funkce</label>
                        <select onChange={onGroupTypeChange} value={groupType}>
                            <option>--</option>
                            <option>Součet</option>
                            <option>Maximum</option>
                            <option>Minimum</option>
                            <option>Průměr</option>
                            <option>Vše</option>
                        </select>
                    </div>

                    <div className="col-2">
                        <button onClick={downloadTxtFile}>
                            Uložit
                        </button>
                    </div>

                </div>
            </div>

            <div className="container-graph">
                <div className="col-md-4"
                >
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


                        width='2150' redraw
                        height='600' redraw
                        options={{ maintainAspectRatio: false,responsive:false}}

                    />
                </div>
            </div>





        </div>
    );
}

export default Short_data_view
