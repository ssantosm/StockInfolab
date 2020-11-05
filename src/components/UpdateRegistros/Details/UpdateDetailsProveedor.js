import React,  { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import UpdateProveedor from './../Rest/UpdateProveedor'
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

const DetailProveedor = ({ ProveedorId, ProveedorNombre, ProveedorDireccion, ProveedorRazonSocial, ProveedorTelefono, ProveedorRepresentanteLegal}) => {

  const classes = useStyles();

  const [valueProveedorId, setValueProveedorId] = useState(ProveedorId);
  const [valueProveedor, setValueProveedor] = useState(ProveedorNombre); //UseState recupera el valor introducido
  const [ValueRazonSocial, setValueRazonSocial] = useState(ProveedorRazonSocial);
  const [ValueDireccion, setValueDireccion] = useState(ProveedorDireccion);
  const [ValueTelefono, setValueTelefono] = useState(ProveedorTelefono);
  const [ValueRepresentanteLegal, setValueRepresentanteLegal] = useState(ProveedorRepresentanteLegal);
  const [ValueMensajeRest, setMensajeRest] = useState('');
  const [ValueExisteError, setExisteError] = useState(0);
  const [open, setOpen] = React.useState(false);
  
  function  getProveedorValue(e){
    const ProveedorValue = e.target.value;
    setValueProveedor(ProveedorValue)
}

function  getRazonSocialValue(e){
    const RazonSocialValue = e.target.value;
    setValueRazonSocial(RazonSocialValue)
}

function  getDireccionValue(e){
    const DireccionValue = e.target.value;
    setValueDireccion(DireccionValue)
}

function  getTelefonoValue(e){
    const TelefonoValue = e.target.value;
    setValueTelefono(TelefonoValue)
}

function getRepresentanteLegalValue(e){
    const RepresentanteLegalValue = e.target.value;
    setValueRepresentanteLegal(RepresentanteLegalValue)
}


  function Guardar()
  {
    const DataProveedor = {
      ProveedorId : valueProveedorId,
      ProveedorNombre :  valueProveedor,
      ProveedorDireccion: ValueDireccion,
      ProveedorTelefono: ValueTelefono,
      ProveedorRazonSocial: ValueRazonSocial, 
      ProveedorRepresentanteLegal: ValueRepresentanteLegal,
  
      }


      const GuardarProveedor = new Promise((resolve, reject) => {

        const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/ActualizarProveedor'
        

        axios.post(urlRest, DataProveedor).then(response => {
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

  //UpdateProveedor({DataProveedor})
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
              
                id="Proveedor"
                label="Proveedor"
                defaultValue={ProveedorNombre}
                variant="outlined"
                type="search"
                onChange={getProveedorValue}
                />

                <TextField
              
                id="Direccion"
                label="Dirección"
                defaultValue={ProveedorDireccion}
                variant="outlined"
                type="search"
                onChange={getDireccionValue}
                />

                <TextField
              
                id="RazonSocial"
                label="Razón Social"
                defaultValue={ProveedorRazonSocial}
                variant="outlined"
                type="search"
                onChange={getRazonSocialValue}
                />

                <TextField
              
                id="Telefono"
                label="Teléfono"
                defaultValue={ProveedorTelefono}
                variant="outlined"
                type="search"
                onChange={getTelefonoValue}
                />

                <TextField
            
                id="RepresentanteLegal"
                label="Representante Legal"
                defaultValue={ProveedorRepresentanteLegal}
                variant="outlined"
                type="search"
                onChange={getRepresentanteLegalValue}
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
  export default DetailProveedor;