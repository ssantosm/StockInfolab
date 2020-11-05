import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SaveProveedor from './Rest/SaveProveedor';
import styled from 'styled-components';
import ipInfoLab from './../../containers/Functions/GetIpInfolab';
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';
//import Alert from '@material-ui/lab/Alert';
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


const NuevoProveedor = () => {

   
    const classes = useStyles();
    const [valueProveedor, setValueProveedor] = useState(''); //UseState recupera el valor introducido
    const [ValueRazonSocial, setValueRazonSocial] = useState('');
    const [ValueDireccion, setValueDireccion] = useState('');
    const [ValueTelefono, setValueTelefono] = useState('');
    const [ValueRepresentanteLegal, setValueRepresentanteLegal] = useState('');
    const [ValueMensajeRest, setMensajeRest] = useState('');
    const [ValueExisteError, setExisteError] = useState(0);
    const [open, setOpen] = React.useState(false);
    

    //Por cada cambio en el textfield, se va guardando lo que el usuario va introduciendo en las funciones get
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

    function GetData()
    {


        const DataProveedor = {
                    ProveedorNombre :  valueProveedor,
                    ProveedorDireccion: ValueDireccion,
                    ProveedorTelefono: ValueTelefono,
                    ProveedorRazonSocial: ValueRazonSocial, 
                    ProveedorRepresentanteLegal: ValueRepresentanteLegal,
                    }

                    const GuardarProveedor = new Promise((resolve, reject) => {

                      const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/GuardarProveedor'
              
                      axios.post(urlRest, DataProveedor).then(response => {
                          const MensajeRest = response.data.Mensaje
                          const ExisteError = response.data.ExisteError
                          setExisteError(ExisteError)
                          setMensajeRest(MensajeRest)
                          
                       

                          if(ExisteError == 0)
                          {
                           
                            //setTimeout(function(){window.history.back(), 3000});
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
                  

      // console.log(DataProveedor)

      // SaveProveedor({DataProveedor})
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
                      Nuevo proveedor
                   </span>
                 </div>
            </div>

            <div className = "cardNewRegistro">
                <div className = "jss1 jss5 jss2">
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="Proveedor" label="Proveedor" variant="outlined" onChange={getProveedorValue}/> 
                    <TextField id="RazonSocial" label="Razón Social" variant="outlined" onChange = {getRazonSocialValue} />
                    <TextField id="Direccion" label="Dirección" variant="outlined" onChange = {getDireccionValue} />
                    <TextField id="Telefono" label="Teléfono" variant="outlined" onChange = {getTelefonoValue}/>
                </form>

                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="RepresentanteLegal" label="Representante Legal" variant="outlined" onChange = {getRepresentanteLegalValue}/>
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


export default NuevoProveedor;
