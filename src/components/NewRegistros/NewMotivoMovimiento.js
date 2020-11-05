import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SaveMotivoMovimiento from './Rest/SaveMotivoMovimiento.js';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    
}));

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;

const NuevoMotivoMovimiento = () => {
  const classes = useStyles();

  const [valueMotivoMovimiento, setValueMotivoMovimiento] = useState(''); //UseState recupera el valor introducido
  const [valueMotivoMoviminetoTipo, setValueMotivoMovimientoTipo] = useState('');

  //Por cada cambio en el textfield, se va guardando lo que el usuario va introduciendo en las funciones get
  function  getMotivoMovimientoValue(e){
    const MotivoMovimientoValue = e.target.value;
    setValueMotivoMovimiento(MotivoMovimientoValue)
}

function getMotivoMovimientoTipoValue(e){
    const name = e.target.name;
    setState({
      ...state,
      [name]: e.target.value,
    });

    
    const MotivoMovimientoTipoValue = e.target.value;
    setValueMotivoMovimientoTipo(MotivoMovimientoTipoValue)
}

function GetData()
{
    const DataMotivoMovimiento = {
                MotivoMovimientoNombre :  valueMotivoMovimiento,
                MotivoMovimientoTipo : valueMotivoMoviminetoTipo
                }

  // console.log(DataMotivoMovimiento)

   SaveMotivoMovimiento({DataMotivoMovimiento})

}

  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  

  return (
    <div>

<Container>

     
<div className = "row no-margin">
     <div className = "dashboard-title-column">
       <span className = "pull-left dashboard-title">
          Nuevo Motivo de movimiento
       </span>
     </div>
</div>

<div className = "cardNewRegistro">
    <div className = "jss1 jss5 jss2">
    <form className={classes.root} noValidate autoComplete="off">
        <TextField id="MotivoMovimiento" label="MotivoMovimiento" variant="outlined" onChange={getMotivoMovimientoValue}/> 

        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Tipo</InputLabel>
        <Select
          native
          value={state.age}
          onChange={getMotivoMovimientoTipoValue}
          label="Age"
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={'E'}>Entrada</option>
          <option value={'S'}>Salida</option>
        </Select>
      </FormControl>
      
    </form>

    <button type="button" className = "btn btn-green-light btn-pill" onClick = {GetData} >Guardar</button>
    </div>
</div>

</Container>
     
      
  
    </div>
  );
}


export default NuevoMotivoMovimiento;