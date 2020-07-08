import React, { useState, useEffect} from 'react';
import '../styles/main.scss'
import api from "../api";
import Calendar from "../components/calendar"
import {Line} from 'react-chartjs-2'
import fileDownload from 'js-file-download'
import HeadTitle from "../components/Head_title";
require('dotenv').config();

function Long_data_view() {
    const [ selectedTable, setSelectedTable ] = useState('--');
    const [ tables, setTables ] = useState([]);
    const [ selectedColumn, setSelectedColumn] = useState('Venkovní teplota - průměr');
    const [ columns, setColumns] = useState([]);
    const [ groupType, setGroupType ] = useState('--');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);
    let date = new Date();
    useEffect(() => {
        api.get(process.env.REACT_APP_DATA_TABLES)
            .then(res => {
                setTables(res.data)
            })

    }, []);

    useEffect(() => {
        api.post(process.env.REACT_APP_DATA_ANALYSIS, {
            table_name:process.env.REACT_APP_FIRST_TABLE,
            column:process.env.REACT_APP_FIRST_COLUMN,
            from_date: date.setDate(date.getDate() - 7),
            to_date:Date.now(),
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

        api.post(process.env.REACT_APP_DATA_ANALYSIS, {
            table_name:process.env.REACT_APP_FIRST_TABLE,
            column:process.env.REACT_APP_FIRST_COLUMN,
            from_date: date,
            to_date:Date.now(),
            group_type: "Maximum",


        })

            .then(response => {
                const values2 = response.data.map(i => i.sel_value)
                setChartData2(values2)

                console.log("OK")
            })
    },[]);

    useEffect(() => {

        api.post(process.env.REACT_APP_DATA_ANALYSIS, {
            table_name:process.env.REACT_APP_FIRST_TABLE,
            column:process.env.REACT_APP_FIRST_COLUMN,
            from_date: date,
            to_date:Date.now(),
            group_type: "Minimum",


        })

            .then(response => {
                const values3 = response.data.map(i => i.sel_value)
                setChartData3(values3)

                console.log("OK")
            })
    },[]);



    useEffect(() => {
        if (selectedTable === '--') return;
        api.post(process.env.REACT_APP_DATA_COLUMNS, { table_name: selectedTable })
            .then(res => setColumns(res.data.data))
    }, [selectedTable]);// input pouze pri zmene defi hodnoty, bez pri jakoliv zmene, prazdne jen pri prvni*/

    useEffect(() => {
        console.log(selectedTable,selectedColumn,startDate,endDate,groupType)
        if (startDate === null || endDate === null || groupType === '--' ||groupType === undefined|| selectedTable === '--'||selectedColumn === '--') return;
        api.post(process.env.REACT_APP_DATA_ANALYSIS, {
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
        api.post(process.env.REACT_APP_DATA_DOWNLOAD,{
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
    const [ selectedColumn2, setSelectedColumn2] = useState('Venkovní teplota - maximum');
    const [ columns2, setColumns2] = useState([]);
    const [ groupType2, setGroupType2 ] = useState('--');
    const [chartData2, setChartData2] = useState([]);


    useEffect(() => {
        api.get(process.env.REACT_APP_DATA_TABLES)
            .then(res => {
                setTables2(res.data)
            })

    }, []);
    useEffect(() => {
        if (selectedTable2 === '--') return;
        api.post(process.env.REACT_APP_DATA_COLUMNS, { table_name: selectedTable2 })
            .then(res => setColumns2(res.data.data))
    }, [selectedTable2]);// input pouze pri zmene defi hodnoty, bez pri jakoliv zmene, prazdne jen pri prvni*/

    useEffect(() => {
        console.log(selectedTable2,selectedColumn2,startDate,endDate,groupType2)
        if (startDate === null || endDate === null || groupType2 === '--' ||groupType2 === undefined|| selectedTable2 === '--'||selectedColumn2 === '--') return;
        api.post(process.env.REACT_APP_DATA_ANALYSIS, {
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
        api.post(process.env.REACT_APP_DATA_DOWNLOAD, {
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

    const [ selectedTable3, setSelectedTable3 ] = useState('--');
    const [ tables3, setTables3 ] = useState([]);
    const [ selectedColumn3, setSelectedColumn3] = useState('Venkovní teplota - minimum');
    const [ columns3, setColumns3] = useState([]);
    const [ groupType3, setGroupType3 ] = useState('--');
    const [chartData3, setChartData3] = useState([]);


    useEffect(() => {
        api.get(process.env.REACT_APP_DATA_TABLES)
            .then(res => {
                setTables3(res.data)
            })

    }, []);
    useEffect(() => {
        if (selectedTable3 === '--') return;
        api.post(process.env.REACT_APP_DATA_COLUMNS, { table_name: selectedTable3 })
            .then(res => setColumns3(res.data.data))
    }, [selectedTable3]);// input pouze pri zmene defi hodnoty, bez pri jakoliv zmene, prazdne jen pri prvni*/

    useEffect(() => {
        console.log(selectedTable3,selectedColumn3,startDate,endDate,groupType3)
        if (startDate === null || endDate === null || groupType3 === '--' ||groupType3 === undefined|| selectedTable3 === '--'||selectedColumn3 === '--') return;
        api.post(process.env.REACT_APP_DATA_ANALYSIS, {
            table_name: selectedTable3,
            column: selectedColumn3,
            from_date:startDate.format('YYYY-MM-DD HH:mm:ss'),
            to_date:endDate.format('YYYY-MM-DD HH:mm:ss'),
            group_type: groupType3
        })
            .then(response => {
                const values3 = response.data.map(i => i.sel_value)
                setChartData3(values3)
            })

    },[selectedTable3,selectedColumn3,startDate,endDate,groupType3])

    const onTableNameChange3 = e => setSelectedTable3(e.target.value);
    const onColumnNameChange3 = e => setSelectedColumn3(e.target.value);;
    const onGroupTypeChange3 = e => setGroupType3(e.target.value);


    var  downloadTxtFile3 = () => {
        if (startDate === null || endDate === null || groupType3 === '--' ||groupType3 === undefined|| selectedTable3 === '--'||selectedColumn3 === '--') return;
        api.post(process.env.REACT_APP_DATA_DOWNLOAD, {
            table_name: selectedTable3,
            column: selectedColumn3,
            from_date:startDate.format('YYYY-MM-DD HH:mm:ss'),
            to_date:endDate.format('YYYY-MM-DD HH:mm:ss'),
            group_type: groupType3

        }).then(response => {
            const dvalues = response.data
            fileDownload(dvalues, 'Data'+Date.now()+'.csv');
            console.log(dvalues)
        })

    }


    return (
        <div className="app h-100">
            <HeadTitle/>
            <div className="container-page">
                <div className="text-white"><div className="text-center"> <h1>  Dlouhodobá data</h1> </div></div>
            </div>




            <div className="container-calendar">
                <div className="row p-2">
                <div className="col-2">
                    <h2>Výběr data</h2>
                </div>
                <div className="col-2">
                <Calendar onChange={(startDate,endDate) => {
                    setStartDate(startDate);
                    setEndDate(endDate);
                }}
                />
                </div>
                <div className="col-8">
                </div>
            </div>
            </div>
            <div className="container-header">
                <div className="row p-2">

                    <div className="col-2">
                        <h2>Výběr tabulky</h2>

                    </div>
                    <div className="col-3">
                        <h2>Výběr zobrazované hodnoty</h2>

                    </div>
                    <div className="col-3">



                    </div>

                    <div className="col-2">
                        <h2>Analytické funkce</h2>k

                    </div>


                    <div className="col-2">

                    </div>

                </div>
            </div>
            <div className="container-selects">
                <div className="row p-2">


                    <div className="col-3 p-1">
                        <select onChange={onTableNameChange}>
                            <option>--</option>
                            { tables.map(table => <option key={table.name_table} value={table.name_table}>{ table.title }</option>) }
                        </select>
                    </div>

                    <div className="col-2">

                        <select onChange={onColumnNameChange}>
                            <option>--</option>
                            { columns.map(column => <option key={column} value={column}>{ column }</option>) }
                        </select>

                    </div>
                    <div className="col-3">

                    </div>

                    <div className="col-2">

                        <select onChange={onGroupTypeChange} value={groupType}>
                            <option>--</option>
                            <option>Součet</option>
                            <option>Maximum</option>
                            <option>Minimum</option>
                            <option>Průměr</option>
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
                <div className="row p-2">


                        <div className="col-3 p-1">
                        <select onChange={onTableNameChange2}>
                            <option>--</option>
                            { tables2.map(table => <option key={table.name_table} value={table.name_table}>{ table.title }</option>) }
                        </select>
                    </div>

                    <div className="col-2">
                        <select onChange={onColumnNameChange2}>
                            <option>--</option>
                            { columns2.map(column => <option key={column} value={column}>{ column }</option>) }
                        </select>

                    </div>
                    <div className="col-3">

                    </div>

                    <div className="col-2">
                        <select onChange={onGroupTypeChange2} value={groupType2}>
                            <option>--</option>
                            <option>Součet</option>
                            <option>Maximum</option>
                            <option>Minimum</option>
                            <option>Průměr</option>
                        </select>
                    </div>

                    <div className="col-2">
                        <button onClick={downloadTxtFile2}>
                            Uložit
                        </button>
                    </div>

                </div>
            </div>

            <div className="container-selects3">
                <div className="row p-2">

                    <div className="col-3 p-1">
                        <select onChange={onTableNameChange3}>
                            <option>--</option>
                            { tables3.map(table => <option key={table.name_table} value={table.name_table}>{ table.title }</option>) }
                        </select>
                    </div>

                    <div className="col-3">
                        <select onChange={onColumnNameChange3}>
                            <option>--</option>
                            { columns3.map(column => <option key={column} value={column}>{ column }</option>) }
                        </select>

                    </div>
                    <div className="col-2">

                    </div>

                    <div className="col-2">
                        <select onChange={onGroupTypeChange3} value={groupType3}>
                            <option>--</option>
                            <option>Součet</option>
                            <option>Maximum</option>
                            <option>Minimum</option>
                            <option>Průměr</option>
                        </select>
                    </div>

                    <div className="col-2">
                        <button onClick={downloadTxtFile3}>
                            Uložit
                        </button>
                    </div>

                </div>
            </div>


            <div className="container-graph">


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
                                    borderColor: 'green',
                                    fill: false,
                                    pointBackgroundColor: '#fff',


                                },
                                {   label: selectedColumn3,
                                    data: chartData3,
                                    borderColor: 'blue',
                                    fill: false,
                                    pointBackgroundColor: '#fff',


                                }]


                        }}


                        options={{ maintainAspectRatio:false}}

                    />
                </div>






        </div>
    );
}

export default Long_data_view;
