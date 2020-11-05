import React, { useState } from 'react'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Modal from 'react-awesome-modal';
import MaterialTable from 'material-table';


function ModalHistoricoMovimientos (valueDataDetail){

    const [statePopUp, setStatePopUp] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const handleDateChangeFrom = (date) => {
      setSelectedDate(date);
    };
  
    const [selectedDateTo, setSelectedDateTo] = React.useState(new Date('2014-08-18T21:11:54'));
    const handleDateChangeTo = (date) => {
      setSelectedDateTo(date);
    };
   

    function closeModal() {
        setStatePopUp(false);
        
      }

    return(



    <div>
    <MuiPickersUtilsProvider utils={DateFnsUtils} position="fixed">

    <div id = "FiltersKardex">

      

    <KeyboardDatePicker
    margin="normal"
    id="date-picker-dialog-from"
    label="Desde"
    format="dd/MM/yyyy"
    value={selectedDate}
    onChange={handleDateChangeFrom}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
    
   
    
  />

    <KeyboardDatePicker
    margin="normal"
    id="date-picker-dialog-to"
    label="Hasta"
    format="dd/MM/yyyy"
    value={selectedDateTo}
    onChange={handleDateChangeTo}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
    />
  </div>

  </MuiPickersUtilsProvider>


    <MaterialTable
    columns={[
              { title: 'Fecha', field: 'KardexFechaMovimiento'},
              { title: 'Movimiento', field: 'MotivoMovimientoNombre' },
              { title: 'Cantidad', field: 'ProductoKardexCantidad' },
              { title: 'Ubicación', field: 'ProductoKardexUbicacion' },
              { title: 'Caducidad', field: 'ProductoKardexFechaCaducidad' },
              
                       
    ]}
    data = {valueDataDetail}
    options= {{
    toolbar: false,
    
    }}
    >
    </MaterialTable>
    </div>
    )
}

export default ModalHistoricoMovimientos;