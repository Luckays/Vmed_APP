import api from "../api";

const VariablePost = (selectedTable,selectedTeplota,selectedTlak,selectedVlhkost,datum,setTeplota,setTlak,setVlhkost,setDateOstrava) => {
    api.post('/show_data_day_var', {
        table_name: selectedTable,
        column_teplota: selectedTeplota,
        column_tlak: selectedTlak,
        column_vlhkost: selectedVlhkost,
    })

        .then(response => {
            const v_teplota = response.data.map(i => i.teplota);
            setTeplota(v_teplota);
            const v_tlak = response.data.map(i => i.tlak);
            setTlak(v_tlak);
            const v_vlhkost = response.data.map(i => i.vlhkost);
            setVlhkost(v_vlhkost);
            const date = response.data.map(i => i.datum);

            setDatePlzen(date)
        })
};
export default VariablePost
