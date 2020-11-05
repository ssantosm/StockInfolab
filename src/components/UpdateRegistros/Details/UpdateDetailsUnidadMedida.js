import React,  { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import UpdateUnidadMedida from './../Rest/UpdateUnidadMedida'
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import ipInfoLab from './../../../containers/Functions/GetIpInfolab';
import axios from 'axios';


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

const DetailUnidadMedida = ({ UnidadMedidaId, UnidadMedidaNombre}) => {

  const classes = useStyles();

  const [valueUnidadMedidaId, setValueUnidadMedidaId] = useState(UnidadMedidaId);
  const [valueUnidadMedida, setValueUnidadMedida] = useState(UnidadMedidaNombre); //UseState recupera el valor introducido
  const [ValueMensajeRest, setMensajeRest] = useState('');
  const [ValueExisteError, setExisteError] = useState(0);
  const [open, setOpen] = React.useState(false);

  function  getUnidadMedidaValue(e){
    const UnidadMedidaValue = e.target.value;
    setValueUnidadMedida(UnidadMedidaValue)
}


  function Guardar()
  {
    const DataUnidadMedida = {
      UnidadMedidaId : valueUnidadMedidaId,
      UnidadMedidaNombre :  valueUnidadMedida,
      }

      const GuardarUnidadMedida = new Promise((resolve, reject) => {

      const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/ActualizarUnidadMedida'
        

        axios.post(urlRest, DataUnidadMedida).then(response => {
          const MensajeRest = response.data.Mensaje
          const ExisteError = response.data.ExisteError
          
          setExisteError(ExisteError)
          setMensajeRest(MensajeRest)

          if(ExisteError == 0)
          {
            setTimeout(function(){ window.history.back(); }, 6000);
          }else
          {
            setTimeout(function(){setOpen(false);; }, 9000);
          }
            
        }).catch(reason => {
            console.log("la razon de error: " + reason);
        })
    });

    setOpen(true);
    
  //UpdateUnidadMedida({DataUnidadMedida})
  }

  
  //Muestra los mensajes de error que regresa el servicio rest
  function ShowMessage()
  {
    if(ValueExisteError == 1)
    {

      return(
      <Collapse in={open}>
      <Alert severity="error"
      action={
        <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => {
        setOpen(false);
        }}
      >
      <CloseIcon fontSize="inherit" />
      </IconButton>
      }
    >
       <AlertTitle><b> Error </b></AlertTitle>
        {ValueMensajeRest}
    </Alert>
    
    </Collapse>


    )

  }else
  {
    
    return(
      <Collapse in={open}>
      <Alert severity="success"
      action={
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => {
        setOpen(false);
        }}
        >
      <CloseIcon fontSize="inherit" />
      </IconButton>
      }
      >
         <AlertTitle><b> Aviso </b></AlertTitle>
        {ValueMensajeRest}
      </Alert>
      
      </Collapse>
    )
  }
  }
  
  return (
  
     
  <div>
    <form className={classes.root} noValidate autoComplete="off">
    
            <div>

                <TextField
              
                id="UnidadMedida"
                label="Unidad Medida"
                defaultValue={UnidadMedidaNombre}
                variant="outlined"
                type="search"
                onChange={getUnidadMedidaValue}
                />
               

            </div>
    </form>

    <div className = "AlertDiv">
    
      <ShowMessage/>

    </div>

        <button type="button" className = "btn btn-green-light btn-pill" onClick = {Guardar}>Guardar</button>

  </div>
     

 
  
    );
  };
  export default DetailUnidadMedida;