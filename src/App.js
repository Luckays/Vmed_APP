import React, { useState, useEffect } from 'react';
import './styles/main.scss'
import api from "./api";

function App() {
    const [ selectedTable, setSelectedTable ] = useState('all_table');
    const [ tables, setTables ] = useState([]);
    const [ columns, setColumns ] = useState([]);

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
  const onColumnNameChange = e => {};

  useEffect(() => {
      if (selectedTable) {
          // fetch api data
      }
  }, [selectedTable]);


  return (
    <div className="app h-100">
      <div className="container-selects">
        <div className="row">
          <div className="col-2">
            <label>Jmeno tabulky</label>
            <select onChange={onTableNameChange}>
                { tables.map(table => <option key={table.name_table} value={table.name_table}>{ table.title }</option>) }
            </select>
          </div>
            <div className="col-2">
                <label>Jmeno sloupce</label>
                <select onChange={onColumnNameChange}>
                    { columns.map(column => <option key={column} value={column}>{ column }</option>) }
                </select>
            </div>
        </div>
      </div>

      <div className="container-graph">
        graf {selectedTable}
      </div>
    </div>
  );
}

export default App;
