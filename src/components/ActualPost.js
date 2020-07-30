import api from "../api";

const ActualPost = (selectedTable,selectedColumn,Date_day,setChartData,setChartLabels) => {
    api.post('/show_data_day_actual', {
        table_name: selectedTable,
        column: selectedColumn,
        date: Date_day
    })

        .then(response => {
            const values = response.data.map(i => i.sel_value);
            setChartData(values);
            const dates = response.data.map(i => i.day_time);
            setChartLabels(dates)
        })
};
export default ActualPost
