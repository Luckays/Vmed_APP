import React, { useState, useEffect} from 'react';
import './styles/main.scss'
import api from "./api";
import image from './logo.png'
import Calendar from "./calendar"
import {Line} from 'react-chartjs-2'


function App() {

    const [ selectedTable, setSelectedTable ] = useState('--');
    const [ tables, setTables ] = useState([]);
    const [ selectedColumn, setSelectedColumn] = useState('--');
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
        if (selectedTable === '--') return;
        api.post('/columns', { tableName: selectedTable })
            .then(res => setColumns(res.data.data))
    }, [selectedTable]);


  /*  useEffect(() => {
        if (groupType === '--') return;
        api.post('/fce', { group_type: groupType})
            .then(res => setGroupType(res.data.data))

    }, [groupType]);// input pouze pri zmene defi hodnoty, bez pri jakoliv zmene, prazdne jen pri prvni*/

    useEffect(() => {
        console.log(selectedTable,selectedColumn,startDate,endDate,groupType)
        if (startDate === null || endDate === null || groupType === '--' ||groupType === undefined|| selectedTable === '--'||selectedColumn === '--') return;
        api.post('/fce', {
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
  useEffect(() => {
      if (selectedTable) {
          // fetch api data
      }
  }, [selectedTable]);

   var  downloadTxtFile = () => {
       api.post('/download', {
           table_name: selectedTable,
           column: selectedColumn,
           from_date:startDate.format('YYYY-MM-DD HH:mm:ss'),
           to_date:endDate.format('YYYY-MM-DD HH:mm:ss'),
           group_type: groupType
       })
    }


  return (
    <div className="app h-100">
        <div className="container-preface">
            <p className="text-white"><p className="text-center"> <h1>  Vizualizace meteorologických a environmentálních dat Geodetické observatoře Pecný       <img src={image} alt="Logo" height="95" width="95" align="top"/></h1> </p></p>
        </div>


      <div className="container-selects">
        <div className="row">

          <div className="col-2">
            <label>Jmeno tabulky</label>
            <select onChange={onTableNameChange}>
                <option>--</option>
                { tables.map(table => <option key={table.name_table} value={table.name_table}>{ table.title }</option>) }
            </select>
          </div>

            <div className="col-2">
                <label>Jmeno sloupce</label>
                <select onChange={onColumnNameChange}>
                    <option>--</option>
                    { columns.map(column => <option key={column} value={column}>{ column }</option>) }
                </select>

            </div>
            <div className="col-4">
                <label>Kalendar</label>
              <Calendar onChange={(startDate,endDate) => {
                setStartDate(startDate);
                    setEndDate(endDate);
              }}
              />
            </div>

            <div className="col-2">
                <label>Statistika</label>
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

      <div className="container-graph">
<Line
    data={{
        labels: chartLabels,
        datasets: [{
            label: selectedColumn,
            backgroundColor: 'red',
            borderColor: 'red',
            data: chartData,
            fill: false,
        }]
    }}
/>
      </div>
    </div>
  );
}

export default App;
