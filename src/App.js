import React, { useState, useEffect} from 'react';
import './styles/main.scss'
import api from "./api";
import image from './logo.png'
import calendar from "./calendar"
function App() {

    const [ selectedTable, setSelectedTable ] = useState('--');
    const [ tables, setTables ] = useState([]);
    const [ selectedColumn, setSelectedColumn] = useState('--');
    const [ columns, setColumns] = useState([]);
    const [ groupType, setGroupType ] = useState('--');
    useEffect(() => {
        api.get('/tables')
            .then(res => {
                setTables(res.data)
            })

    }, []);

    useEffect(() => {
        if (selectedTable === null) return;
        api.post('/columns', { tableName: selectedTable })
            .then(res => setColumns(res.data.data))
    }, [selectedTable]);


  const onTableNameChange = e => setSelectedTable(e.target.value);
  const onColumnNameChange = e => setSelectedColumn(e.target.value);;
  const onGroupTypeChange = e => setGroupType(e.target.value);
  useEffect(() => {
      if (selectedTable) {
          // fetch api data
      }
  }, [selectedTable]);

   var  downloadTxtFile = () => {

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
              <calendar
              />
            </div>

            <div className="col-2">
                <label>Statistika</label>
                <select onChange={onGroupTypeChange}>
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

        <div className="container-vypis">

        <p>Tabulka {selectedTable}</p>
            <p>Sloupec {selectedColumn}</p>
        <p> Typ {groupType}</p>

    </div>

      <div className="container-graph">
graph
      </div>
    </div>
  );
}

export default calendar;
