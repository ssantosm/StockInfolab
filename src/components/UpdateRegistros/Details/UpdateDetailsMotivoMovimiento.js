import React,  { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import UpdateMotivoMovimiento from './../Rest/UpdateMotivoMovimiento'
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const DetailMotivoMovimiento = ({ MotivoMovimientoId, MotivoMovimientoNombre, MotivoMovimientoTipo}) => {

  const classes = useStyles();

  const [valueMotivoMovimientoId, setValueMotivoMovimientoId] = useState(MotivoMovimientoId);
  const [valueMotivoMovimiento, setValueMotivoMovimiento] = useState(MotivoMovimientoNombre); //UseState recupera el valor introducido
  const [valueMotivoMovimientoTipo, setValueMotivoMovimientoTipo] = useState(MotivoMovimientoTipo);

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

  function Guardar()
  {
    const DataMotivoMovimiento = {
      MotivoMovimientoId : valueMotivoMovimientoId,
      MotivoMovimientoNombre :  valueMotivoMovimiento,
      MotivoMovimientoTipo: valueMotivoMovimientoTipo,
      }



  UpdateMotivoMovimiento({DataMotivoMovimiento})
  }

  const [state, setState] = React.useState({
      //Tipo: MotivoMovimientoTipo,
    //age: '',
    //name: 'hai',
  });

    return (
  
     
  <div>
      <Container>

     

      <div className = "jss1 jss5 jss2">

        <form className={classes.root} noValidate autoComplete="off">
    
                <TextField
              
                id="MotivoMovimiento"
                label="Motivo"
                defaultValue={MotivoMovimientoNombre}
                variant="outlined"
                type="search"
                onChange={getMotivoMovimientoValue}
                />
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Tipo</InputLabel>
        <Select
          native
          value={state.Tipo}
          defaultValue = {MotivoMovimientoTipo}
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

        <button type="button" className = "btn btn-green-light btn-pill" onClick = {Guardar}>Guardar</button>

    </div>
    
    </Container>

  </div>
     

 
  
    );
  };
  export default DetailMotivoMovimiento;