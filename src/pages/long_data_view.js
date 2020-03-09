import React, { useState, useEffect} from 'react';
import '../styles/main.scss'
import api from "../api";
import image from '../components/logo.png'
import Calendar from "../components/calendar"
import {Line} from 'react-chartjs-2'
import fileDownload from 'js-file-download'
import Analytic from "../components/Analytic";
function Long_data_view() {
    const [ selectedTable, setSelectedTable ] = useState('--');
    const [ tables, setTables ] = useState([]);
    const [ selectedColumn, setSelectedColumn] = useState('teplota_u_GPS_anteny');
    const [ columns, setColumns] = useState([]);
    const [ groupType, setGroupType ] = useState('--');
    const [startDate, setStartDate] = useState(null);
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
        api.post('/show_data', {
            table_name:"all_table",
            column:"teplota_u_GPS_anteny",
            from_date:"2010-05-01 00:00:00",
            to_date:"2010-05-15 00:01:00",
            group_type: "Průměr",
        })
            .then(response => {
                const values = response.data.map(i => i.sel_value)
                setChartData(values)
                const dates = response.data.map(i => i.date_day)
                setChartLabels(dates)
                console.log("OK")
            })
    },[]);

    useEffect(() => {

        api.post('/show_data', {
            table_name:"all_table",
            column:"teplota_u_GPS_anteny_kontrolni",
            from_date:"2010-05-01 00:00:00",
            to_date:"2010-05-15 00:01:00",
            group_type: "Průměr",


        })

            .then(response => {
                const values2 = response.data.map(i => i.sel_value)
                setChartData2(values2)

                console.log("OK")
            })
    },[]);



    useEffect(() => {
        if (selectedTable === '--') return;
        api.post('/columns', { table_name: selectedTable })
            .then(res => setColumns(res.data.data))
    }, [selectedTable]);// input pouze pri zmene defi hodnoty, bez pri jakoliv zmene, prazdne jen pri prvni*/

    useEffect(() => {
        console.log(selectedTable,selectedColumn,startDate,endDate,groupType)
        if (startDate === null || endDate === null || groupType === '--' ||groupType === undefined|| selectedTable === '--'||selectedColumn === '--') return;
        api.post('/show_data', {
            table_name: selectedTable,
            column: selectedColumn,
            from_date:startDate.format('YYYY-MM-DD HH:mm:ss'),
            to_date:endDate.format('YYYY-MM-DD HH:mm:ss'),
            group_type: groupType
        })
            .then(response => {
                const values = response.data.map(i => i.sel_value)
                setChartData(values)
                const dates = response.data.map(i => i.date_day)
                setChartLabels(dates)
            })

    },[selectedTable,selectedColumn,startDate,endDate,groupType])

    const onTableNameChange = e => setSelectedTable(e.target.value);
    const onColumnNameChange = e => setSelectedColumn(e.target.value);;
    const onGroupTypeChange = e => setGroupType(e.target.value);


    var  downloadTxtFile = () => {
        if (startDate === null || endDate === null || groupType === '--' ||groupType === undefined|| selectedTable === '--'||selectedColumn === '--') return;
        api.post('/download', {
            table_name: selectedTable,
            column: selectedColumn,
            from_date:startDate.format('YYYY-MM-DD HH:mm:ss'),
            to_date:endDate.format('YYYY-MM-DD HH:mm:ss'),
            group_type: groupType
        }).then(response => {
            const dvalues = response.data
            // const ddates = response.data.map(i => i.date_day)
            fileDownload(dvalues, 'Data'+Date.now()+'.csv');
            console.log(dvalues)
        })

    }

    const [ selectedTable2, setSelectedTable2 ] = useState('--');
    const [ tables2, setTables2 ] = useState([]);
    const [ selectedColumn2, setSelectedColumn2] = useState('teplota_u_GPS_anteny_kontrolni');
    const [ columns2, setColumns2] = useState([]);
    const [ groupType2, setGroupType2 ] = useState('--');
    const [chartData2, setChartData2] = useState([]);


    useEffect(() => {
        api.get('/tables2')
            .then(res => {
                setTables2(res.data)
            })

    }, []);
    useEffect(() => {
        if (selectedTable2 === '--') return;
        api.post('/columns2', { table_name: selectedTable2 })
            .then(res => setColumns2(res.data.data))
    }, [selectedTable2]);// input pouze pri zmene defi hodnoty, bez pri jakoliv zmene, prazdne jen pri prvni*/

    useEffect(() => {
        console.log(selectedTable2,selectedColumn2,startDate,endDate,groupType2)
        if (startDate === null || endDate === null || groupType2 === '--' ||groupType2 === undefined|| selectedTable2 === '--'||selectedColumn2 === '--') return;
        api.post('/show_data2', {
            table_name: selectedTable2,
            column: selectedColumn2,
            from_date:startDate.format('YYYY-MM-DD HH:mm:ss'),
            to_date:endDate.format('YYYY-MM-DD HH:mm:ss'),
            group_type: groupType2
        })
            .then(response => {
                const values2 = response.data.map(i => i.sel_value)
                setChartData2(values2)
            })

    },[selectedTable2,selectedColumn2,startDate,endDate,groupType2])

    const onTableNameChange2 = e => setSelectedTable2(e.target.value);
    const onColumnNameChange2 = e => setSelectedColumn2(e.target.value);;
    const onGroupTypeChange2 = e => setGroupType2(e.target.value);


    var  downloadTxtFile2 = () => {
        if (startDate === null || endDate === null || groupType2 === '--' ||groupType2 === undefined|| selectedTable2 === '--'||selectedColumn2 === '--') return;
        api.post('/download2', {
            table_name: selectedTable2,
            column: selectedColumn2,
            from_date:startDate.format('YYYY-MM-DD HH:mm:ss'),
            to_date:endDate.format('YYYY-MM-DD HH:mm:ss'),
            group_type: groupType2

        }).then(response => {
            const dvalues = response.data
            fileDownload(dvalues, 'Data'+Date.now()+'.csv');
            console.log(dvalues)
        })

    }


    return (
        <div className="app h-100">
            <div className="container-preface">
                <p className="text-white"><p className="text-center"> <h1>  Vizualizace meteorologických a environmentálních dat Geodetické observatoře Pecný - dlouhodobá data     <img src={image} alt="Logo" height="95" width="95" align="top"/></h1> </p></p>
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
                        <Calendar onChange={(startDate,endDate) => {
                            setStartDate(startDate);
                            setEndDate(endDate);
                        }}
                        />
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

            <div className="container-selects2">
                <div className="row">

                    <div className="col-2">
                        <label>Výběr tabulky</label>
                        <select onChange={onTableNameChange2}>
                            <option>--</option>
                            { tables2.map(table => <option key={table.name_table} value={table.name_table}>{ table.title }</option>) }
                        </select>
                    </div>

                    <div className="col-3">
                        <label>Výběr zobrazované hodnoty</label>
                        <select onChange={onColumnNameChange2}>
                            <option>--</option>
                            { columns2.map(column => <option key={column} value={column}>{ column }</option>) }
                        </select>

                    </div>
                    <div className="col-3">

                    </div>

                    <div className="col-2">
                        <label>Analytické funkce</label>
                        <select onChange={onGroupTypeChange2} value={groupType2}>
                            <option>--</option>
                            <option>Součet</option>
                            <option>Maximum</option>
                            <option>Minimum</option>
                            <option>Průměr</option>
                            <option>Vše</option>
                        </select>
                    </div>

                    <div className="col-2">
                        <button onClick={downloadTxtFile2}>
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
                            },
                                {   label: selectedColumn2,
                                    data: chartData2,
                                    borderColor: 'blue',
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

export default Long_data_view;
