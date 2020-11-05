import React,  { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import UpdateAlmacen from './../Rest/UpdateAlmacen'
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import ipInfoLab from './../../../containers/Functions/GetIpInfolab';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


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

const DetailAlmacen = ({ AlmacenId, AlmacenNombre, AlmacenDireccion, AlmacenDefault}) => {

  const classes = useStyles();

  const [valueAlmacenId, setValueAlmacenId] = useState(AlmacenId);
  const [valueAlmacen, setValueAlmacen] = useState(AlmacenNombre); //UseState recupera el valor introducido
  const [ValueDireccion, setValueDireccion] = useState(AlmacenDireccion);
  const [ValueAlmacenDefault, setValueAlmacenDefault] = useState(AlmacenDefault);
  const [ValueMensajeRest, setMensajeRest] = useState('');
  const [ValueExisteError, setExisteError] = useState(0);
  const [open, setOpen] = React.useState(false);

  //Variables para definir si se  muestran los mensajes
  const [openSucces, setOpenSucces] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  //Habilita o deshabilita el boton
  const [disablesButtonSave, setDisableButtonSave] = React.useState(false);


  function  getAlmacenValue(e){
    const AlmacenValue = e.target.value;
    setValueAlmacen(AlmacenValue)
}

function  getDireccionValue(e){
    const DireccionValue = e.target.value;
    setValueDireccion(DireccionValue)
}

function getAlmacenDaultValue(e){
  const AlmacenDefaultValue = e.target.checked;
  setValueAlmacenDefault(AlmacenDefaultValue)
}

  function Guardar()
  {
 
    const DataAlmacen = {
      AlmacenId : valueAlmacenId,
      AlmacenNombre :  valueAlmacen,
      AlmacenDireccion: ValueDireccion,
      AlmacenDefault : ValueAlmacenDefault,

      }

      const GuardarAlmacen = new Promise((resolve, reject) => {

        const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/ActualizarAlmacen'
        

        axios.post(urlRest, DataAlmacen).then(response => {
          const MensajeRest = response.data.Mensaje
          const ExisteError = response.data.ExisteError
          console.log(response)
          setExisteError(ExisteError)
          setMensajeRest(MensajeRest)
          
          if(ExisteError == 0)
          {
            setOpenSucces(true);
            setDisableButtonSave(true)
            setTimeout(function(){
               window.history.back(); 
              }, 6000);

          }else
          {
            setOpenError(true);
            setTimeout(function(){
              setOpen(false);
              setOpenError(false);
            }, 9000);
          }
            
        }).catch(reason => {
            console.log("la razon de error: " + reason);
        })
    });

    setOpen(true);

  //UpdateAlmacen({DataAlmacen})

  }


  return (
  
     
  <div>

        <form className={classes.root} noValidate autoComplete="off">
    
            <div>

                <TextField
              
                id="Almacen"
                label="Almacen"
                defaultValue={AlmacenNombre}
                variant="outlined"
                type="search"
                onChange={getAlmacenValue}
                />

                <TextField
              
                id="Direccion"
                label="Dirección"
                defaultValue={AlmacenDireccion}
                variant="outlined"
                type="search"
                onChange={getDireccionValue}
                />

                <FormControlLabel className="makeStyles-field"
                  control={
                  <Checkbox
                    defaultChecked={AlmacenDefault}
                    onChange={getAlmacenDaultValue}
                    name="AlmacenDefault"
                    color="primary"
                  />
                  }
                  label="Seleccionar como default"
                  />
               

            </div>
        </form>

        <div className = "AlertDiv">
    
          {/* seccion de alertas */}
          <div className={classes.root}>
            <div className = "AlertDiv">



          {/* Alerta de succes  */}

          <Collapse in={openSucces}>
            <Alert severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                    setOpenSucces(false);
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

          {/* Alerta de error  */}

          <Collapse in={openError}>
            <Alert severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenError(false);
                    }
                  }
                >
                <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >

                <AlertTitle><b> Error </b></AlertTitle>
              {ValueMensajeRest}
                </Alert>
      
           </Collapse>
        </div>
      </div>

        </div>

        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={Guardar}//{newEntrada}
            disabled = {disablesButtonSave}
            >Guardar</Button>
  </div>
     

 
  
    );
  };
  export default DetailAlmacen;