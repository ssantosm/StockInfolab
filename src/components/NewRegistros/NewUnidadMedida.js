import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SaveUnidadMedida from './Rest/SaveUnidadMedida.js';
import styled from 'styled-components';
import ipInfoLab from './../../containers/Functions/GetIpInfolab';
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => (
  {
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


const NuevoUnidadMedida = () => {

   
    const classes = useStyles();
    const [valueUnidadMedida, setValueUnidadMedida] = useState(''); //UseState recupera el valor introducido
    const [ValueMensajeRest, setMensajeRest] = useState('');
    const [ValueExisteError, setExisteError] = useState(0);
    const [open, setOpen] = React.useState(false);
    

    //Por cada cambio en el textfield, se va guardando lo que el usuario va introduciendo en las funciones get
    function  getUnidadMedidaValue(e){
        const UnidadMedidaValue = e.target.value;
        setValueUnidadMedida(UnidadMedidaValue)
    }

    function GetData()
    {
        const DataUnidadMedida = {
                    UnidadMedidaNombre :  valueUnidadMedida,
                    }

        const GuardarUnidadMedida = new Promise((resolve, reject) => {

          const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/GuardarUnidadMedida'
              
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

       //SaveUnidadMedida({DataUnidadMedida})

    }

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

      }
      else
      {
      
        return(
          <Collapse in={open}>
            <Alert severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => 
                    {
                      setOpen(false);
                    }
                  }
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
     <Container>

     
            <div className = "row no-margin">
                 <div className = "dashboard-title-column">
                   <span className = "pull-left dashboard-title">
                      Nuevo UnidadMedida
                   </span>
                 </div>
            </div>

            <div className = "cardNewRegistro">
                <div className = "jss1 jss5 jss2">
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="UnidadMedida" label="UnidadMedida" variant="outlined" onChange={getUnidadMedidaValue}/> 
                </form>

                <button type="button" className = "btn btn-green-light btn-pill" onClick = {GetData} >Guardar</button>
                
                <div className = "AlertDiv">

                  <ShowMessage/>
                </div>
                
                </div>
            </div>
        
    </Container>
    </div>
    );
}


export default NuevoUnidadMedida;
