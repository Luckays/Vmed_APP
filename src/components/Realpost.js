import api from "../api";

const Realpost = (selectedTable,selectedColumn,Date_day,setChartData,setChartLabels) => {
    api.post('/show_data_day_real', {
        table_name: selectedTable,
        column: selectedColumn,
        date: Date_day
    })

        .then(response => {
            const values = response.data.map(i => i.sel_value)
            setChartData(values)
            const dates = response.data.map(i => i.day_time)
            setChartLabels(dates)
        })
}
export default Realpost
