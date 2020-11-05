import React, { useState, useEffect } from "react";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import ComboBoxAlmacenLine from './../../containers/ComboBox-Data/ComboBoxAlmacenLine'
import ComboBoxProveedorLine from './../../containers/ComboBox-Data/ComboBoxProveedorLine'
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ComboBoxGrupo from './../../containers/ComboBox-Data/ComboBoxGrupo'
import ComboBoxUnidadMedidaCompra from './../../containers/ComboBox-Data/ComboBoxUnidadMedidaCompra'
import ComboBoxUnidadMedidaConsumo from './../../containers/ComboBox-Data/ComboBoxUnidadMedidaConsumo'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ComboBoxModoEtiqueta from './../../containers/ComboBox-Data/ComboBoxModoEtiqueta'
import ComboBoxSeccion from '../../containers/ComboBox-Data/ComboBoxSeccion';
import ComboBoxClasificacionUno from '../../containers/ComboBox-Data/ComboBoxClasificacionUno';
import ComboBoxClasificacionDos from '../../containers/ComboBox-Data/ComboBoxClasificacionDos';
import ComboBoxClasificacionTres from '../../containers/ComboBox-Data/ComboBoxClasificacionTres';
import ComboBoxClasificacionCuatro from '../../containers/ComboBox-Data/ComboClasificacionCuatro';
import ComboBoxClasificacionCinco from '../../containers/ComboBox-Data/ComboBoxClasificacionCinco';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ipInfoLab from './../../containers/Functions/GetIpInfolab';
import axios from 'axios';
import Collapse from '@material-ui/core/Collapse';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { getPosts } from './../../utils/RestProducto';

const ColorButton = withStyles((theme) => ({
  root: {
   
    color: "white",
    backgroundColor: "#15b765",
    '&:hover': {
      backgroundColor: "#0a86d4",
    },
    borderRadius:100,
    // padding:"10px",
    height:60,
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
    bottom:10,
    right:10,
    position:"fixed",
    zIndex:100
  },
}))(Button);

/*Styles Accordion [INICIO] */

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

/*Styles Accordion [FIN] */



const styles = {
  StyleTextField: {
    fontweight: "bold",
    width: '95%',
    fontfamily: "Arial, Helvetica, sans-serif",
  },
  input: {
    color: "white",
    fontweight:"bold",
    
  },

  HeaderProducto:
  {
    backgroundColor:"#949494",
    width : "100%",
    paddingLeft:10,
    paddingBottom:15,
    paddingTop:10,
    paddingright:50,
  },

  DetailProducto:
  {
    backgroundColor:"#bcbcbc",
    width : "100%",
    paddingLeft:10,
    paddingBottom:15,
    paddingTop:10,

  },

};

const Container = styled.div`
max-width: 80%;
margin-left: 13%;
margin-top: 25px;
`;


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

function CustomizedInputs(props) {
  

  const [ProductoCodigoBarraValue, setProductoCodigoBarraValue] = useState('');
  const [ProductoNombreValue, setProductoNombreValue] = useState('');
  const [ProductoCodigoProveedorValue, setProductoCodigoProveedorValue] = useState('')
  const [ProductoTipoValue, setProductoTipoValue] = useState('');
  const [ProveedorIdValue, setProveedorIdValue] = useState(0);
  const [AlmacenIdValue, setAlmacenIdValue] = useState(0);
  const [GrupoIdValue, setGrupoIdValue] = useState(0);
  const [ProductoPrecioCompraValue, setProductoPrecioCompraValue] = useState(0);
  const [ProductoIvaValue, setProductoIvaValue] =  useState(0);
  const [ProductoStockMinimoValue, setProductoStockMinimoValue] = useState(0);
  const [ProductoStockMaximoValue, setProductoStockMaximoValue] = useState(0);
  const [ProductoPuntoPedidoValue, setProductoPuntoPedidoValue] = useState(0);
  const [ProductoPuntoRellenoValue, setProductoPuntoRellenoValue] = useState(0);
  const [ProductoUnidadMedidaIdCompraValue, setProductoUnidadMedidaIdCompraValue] = useState(0);
  const [ProductoUnidadMedidaIdConsumoValue, setProductoUnidadMedidaIdConsumoValue] = useState(0);
  const [ProductoRatioValue, setProductoRatioValue] = useState(0);
  const [ProductoDiasCaducidadMinimaValue, setProductoDiasCaducidadMinimaValue] = useState(0);
  const [ProductoMascaraValue, setProductoMascaraValue] = useState(0);
  const [ProductoCaducidadObligatoriaValue, setProductoCaducidadObligatoriaValue] = useState(false);
  const [ProductoControlCuarentenaValue, setProductoControlCuarentenaValue] = useState(0);
  const [ProductoConservacionValue, setProductoConservacionValue] = useState(0);
  const [ProductoUbicacionValue, setProductoUbicacionValue] = useState('');
  const [ModoEtiquetaIdValue, setModoEtiquetaIdValue] = useState(0);
  const [SeccionIdValue, setSeccionIdValue] = useState(0);
  const [ProductoObservacionesValue, setProductoObservacionesValue] = useState('');
  const [ProductoCodigoAlternoUnoValue, setProductoCodigoAlternoUnoValue] = useState('')
  const [ProductoCodigoAlternoDosValue, setProductoCodigoAlternoDosValue] = useState('')
  const [ProductoCodigoAlternoTresValue, setProductoCodigoAlternoTresValue] = useState('')
  const [ProductoCodigoAlternoCuatroValue, setProductoCodigoAlternoCuatroValue] = useState('')
  const [ProductoCodigoAlternoCincoValue, setProductoCodigoAlternoCincoValue] = useState('')
  const [ProductoClasificacionUnoValue, setProductoClasificacionUnoValue] = useState(0);
  const [ProductoClasificacionDosValue, setProductoClasificacionDosValue] = useState(0);
  const [ProductoClasificacionTresValue, setProductoClasificacionTresValue] = useState(0);
  const [ProductoClasificacionCuatroValue, setProductoClasificacionCuatroValue] = useState(0);
  const [ProductoClasificacionCincoValue, setProductoClasificacionCincoValue] = useState(0);
  const [ValueMensajeRest, setMensajeRest] = useState('');
  const [ValueExisteError, setExisteError] = useState(0);
  const [openSucces, setOpenSucces] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [disablesButtonSave, setDisableButtonSave] = React.useState(false);

  /*Parametros en url [INICIO] */
  const params = new URLSearchParams(props.location.search);
  const tokenMode = params.get('Mode')
  const tokenProductoId = params.get('ProductoId')
  /*Parametros en url [FIN] */
  
 

  useEffect(() => {
  if(tokenMode == 'upd')
  {
    console.log("es actualizacion")

    const ProductoFilters = {
      ProductoId : tokenProductoId,
      ProductoNombre : ""
    }

    getPosts(ProductoFilters)
    .then((res) => {
        console.log(res)
        const data = res.data
        
        data.map(post => {
          const {ProductoCodigoBarra, ProductoNombre, ProductoCodigoProveedor, ProveedorId, AlmacenId, ProductoObservaciones,
          ProductoControlCuarentena, ProductoUnidadMedidaIdCompra, ProductoUnidadMedidaIdConsumo, ProductoRatio,
          ProductoTipo, GrupoId, ProductoPrecioCompra, ProductoIva, ProductoMascara, ProductoConservacion, 
          ModoEtiquetaId, SeccionId, ProductoCodigoAlterno1, ProductoCodigoAlterno2, ProductoCodigoAlterno3, 
          ProductoCaducidadObligatoria, ProductoCodigoAlterno4, ProductoCodigoAlterno5, 
          ProductoClasificacionId1, ProductoClasificacionId2, ProductoClasificacionId3,ProductoClasificacionId4,ProductoClasificacionId5,
          ProductoStockMinimo, ProductoStockMaximo, ProductoPuntoPedido, ProductoPuntoRelleno, ProductoUbicacion} = post
       
          setProductoCodigoBarraValue(ProductoCodigoBarra)
          setProductoNombreValue(ProductoNombre)
          setProductoCodigoProveedorValue(ProductoCodigoProveedor)
          setProductoObservacionesValue(ProductoObservaciones)
          setProductoCaducidadObligatoriaValue(ProductoCaducidadObligatoria)
          setProductoControlCuarentenaValue(ProductoControlCuarentena)
          setProductoUnidadMedidaIdCompraValue(ProductoUnidadMedidaIdCompra)
          setProductoUnidadMedidaIdConsumoValue(ProductoUnidadMedidaIdConsumo)
          setProductoRatioValue(ProductoRatio)
          setProductoTipoValue(ProductoTipo)
          setProveedorIdValue(ProveedorId)
          setAlmacenIdValue(AlmacenId)
          setGrupoIdValue(GrupoId)
          setProductoPrecioCompraValue(ProductoPrecioCompra)
          setProductoIvaValue(ProductoIva)
          setProductoMascaraValue(ProductoMascara)
          setProductoConservacionValue(ProductoConservacion)
          setModoEtiquetaIdValue(ModoEtiquetaId)
          setSeccionIdValue(SeccionId)
          setProductoUnidadMedidaIdConsumoValue(ProductoUnidadMedidaIdConsumo)
          setProductoCodigoAlternoUnoValue(ProductoCodigoAlterno1)
          setProductoCodigoAlternoDosValue(ProductoCodigoAlterno2)
          setProductoCodigoAlternoTresValue(ProductoCodigoAlterno3)
          setProductoCodigoAlternoCuatroValue(ProductoCodigoAlterno4)
          setProductoCodigoAlternoCincoValue(ProductoCodigoAlterno5)
          setProductoClasificacionUnoValue(ProductoClasificacionId1)
          setProductoClasificacionDosValue(ProductoClasificacionId2)
          setProductoClasificacionTresValue(ProductoClasificacionId3)
          setProductoClasificacionCuatroValue(ProductoClasificacionId4)
          setProductoClasificacionCincoValue(ProductoClasificacionId5)
          setProductoStockMinimoValue(ProductoStockMinimo)
          setProductoStockMaximoValue(ProductoStockMaximo)
          setProductoPuntoPedidoValue(ProductoPuntoPedido)
          setProductoPuntoRellenoValue(ProductoPuntoRelleno)
          setProductoUbicacionValue(ProductoUbicacion)


        })
        //setProductoCodigoBarraValue(ProductoCodigoBarra)
    });

   
  }
},[false])
        


  const { classes } = props;

  function getProductoCodigoBarraValue(e){
    const ProductoCodigoBarra = e.target.value
    setProductoCodigoBarraValue(ProductoCodigoBarra)
  }

  function getProductoNombreValue(e){
    const ProductoNombre = e.target.value
    setProductoNombreValue(ProductoNombre)
  }

  function getProductoCodigoProveedorValue(e){
    const ProductoCodigoProveedor = e.target.value
    setProductoCodigoProveedorValue(ProductoCodigoProveedor)
  }

  function getProductoTipoValue(e){
    const ProductoTipo = e.target.value;
    setProductoTipoValue(ProductoTipo)
   
    }

  function callbackProveedorFunction(ProveedorData){
    setProveedorIdValue(ProveedorData)
  }

  function callbackAlmacenFunction(AlmacenData){
    setAlmacenIdValue(AlmacenData)
  }

  function callbackGrupoFunction(GrupoData){
    setGrupoIdValue(GrupoData)
  }

  function getPrecioCompraValue(e){
    const PrecioCompravalue = e.target.value;
    setProductoPrecioCompraValue(PrecioCompravalue)
}

function getIVAValue(e){
  const IVAValue = e.target.value;
  setProductoIvaValue(IVAValue)
}

function getStockMinimoValue(e){
  const StockMinimoValue = e.target.value;
  setProductoStockMinimoValue(StockMinimoValue)
}

function getStockMaximoValue(e){
  const StockMaximoValue = e.target.value;
  setProductoStockMaximoValue(StockMaximoValue)
  
}

function getPuntoPedidoValue(e){
  const PuntoPedidoValue = e.target.value;
  setProductoPuntoPedidoValue(PuntoPedidoValue)
  
}

function getPuntoRellenoValue(e){
  const PuntoRellenoValue = e.target.value;
  setProductoPuntoRellenoValue(PuntoRellenoValue)
 
}

function callbackUnidadMedidaCompraFunction(UnidadMedidaCompraData){
  console.log(UnidadMedidaCompraData)
  setProductoUnidadMedidaIdCompraValue(UnidadMedidaCompraData)
}

function callbackUnidadMedidaConsumoFunction(UnidadMedidaConsumoData){
  setProductoUnidadMedidaIdConsumoValue(UnidadMedidaConsumoData)
}

function getRatioValue(e){
  const RatioValue = e.target.value;
  setProductoRatioValue(RatioValue)
 }

 function getProductoDiasCaducidadMinimaValue(e){
  const ProductoDiasCaducidadMinima = e.target.value;
  setProductoDiasCaducidadMinimaValue(ProductoDiasCaducidadMinima)
}

function getMascaraValue(e){
  const MascaraValue = e.target.value;
  setProductoMascaraValue(MascaraValue)
}

function getCaducidadObligatoriaValue(e){
  const CaducidadObligatoriaValue = e.target.checked;
  setProductoCaducidadObligatoriaValue(CaducidadObligatoriaValue)
}

function getControlCuarentenaValue(e){
  const ControlCuarentenaValue = e.target.checked;
  setProductoControlCuarentenaValue(ControlCuarentenaValue)
}

function getConservacionValue(e){
  const ConservacionValue = e.target.value;
  setProductoConservacionValue(ConservacionValue)
}

function getUbicacionValue(e){
  const UbicacionValue = e.target.value;
  setProductoUbicacionValue(UbicacionValue)
}

function callbackModoEtiquetaFunction(ModoEtiquetaData){
  setModoEtiquetaIdValue(ModoEtiquetaData);
}

function callbackSeccionFunction(SeccionData){
  setSeccionIdValue(SeccionData)
}

function getObservacionesValue(e){
  const ObservacionesValue = e.target.value;
  setProductoObservacionesValue(ObservacionesValue)
}

function getProductoCodigoAlternoUnoValue(e){
  const ProductoCodigoAlternoUno = e.target.value;
  setProductoCodigoAlternoUnoValue(ProductoCodigoAlternoUno)
}

function getProductoCodigoAlternoDosValue(e){
  const ProductoCodigoAlternoDos = e.target.value;
  setProductoCodigoAlternoDosValue(ProductoCodigoAlternoDos)
}

function getProductoCodigoAlternoTresValue(e){
  const ProductoCodigoAlternoTres = e.target.value;
  setProductoCodigoAlternoTresValue(ProductoCodigoAlternoTres)
}

function getProductoCodigoAlternoCuatroValue(e){
  const ProductoCodigoAlternoCuatro = e.target.value;
  setProductoCodigoAlternoCuatroValue(ProductoCodigoAlternoCuatro)
}

function getProductoCodigoAlternoCincoValue(e){
  const ProductoCodigoAlternoCinco = e.target.value;
  setProductoCodigoAlternoCincoValue(ProductoCodigoAlternoCinco)
}



/* Funciones para el tab de clasificaciones [INIIO] */

function callbackClasificacionUnoFunction(ClasificacionUnoData){
  setProductoClasificacionUnoValue(ClasificacionUnoData)
}

function callbackClasificacionDosFunction(ClasificacionDosData){
  setProductoClasificacionDosValue(ClasificacionDosData)
}


function callbackClasificacionTresFunction(ClasificacionTresData){
  setProductoClasificacionTresValue(ClasificacionTresData)
}


function callbackClasificacionCuatroFunction(ClasificacionCuatroData){
  setProductoClasificacionCuatroValue(ClasificacionCuatroData)
}


function callbackClasificacionCincoFunction(ClasificacionCincoData){
  setProductoClasificacionCincoValue(ClasificacionCincoData)
}

function saveProducto(){
  
  const DataProducto = {
  Modo                                    :       tokenMode,
  ProductoId                              :       tokenProductoId,
  ProductoCodigoBarra 			              :       ProductoCodigoBarraValue,
  ProductoNombre	                        :       ProductoNombreValue	,							
  ProductoTipo	                          :       ProductoTipoValue,				
  AlmacenId 	                            :       AlmacenIdValue,					
  ProveedorId 					                  :       ProveedorIdValue,
  GrupoId 						                    :       GrupoIdValue,
  ProductoCodigoProveedor 		            :       ProductoCodigoProveedorValue,
  ProductoPrecioCompra 			              :       ProductoPrecioCompraValue,
  ProductoIva 					                  :       ProductoIvaValue,
  ProductoStockMinimo 			              :       ProductoStockMinimoValue,
  ProductoStockMaximo 			              :       ProductoStockMaximoValue,
  ProductoPuntoPedido 			              :       ProductoPuntoPedidoValue,
  ProductoPuntoRelleno 			              :       ProductoPuntoRellenoValue,
  ProductoUnidadMedidaIdCompra 	          :       ProductoUnidadMedidaIdCompraValue,
  ProductoUnidadMedidaIdConsumo 	        :       ProductoUnidadMedidaIdConsumoValue,
  ProductoRatio 					                :       ProductoRatioValue,
  ProductoDiasCaducidadMinima 	          :       ProductoDiasCaducidadMinimaValue,
  ProductoMascara 				                :       ProductoMascaraValue,
  ProductoCaducidadObligatoria 	          :       ProductoCaducidadObligatoriaValue,
  ProductoControlCuarentena 		          :       ProductoControlCuarentenaValue,
  ProductoConservacion 			              :       ProductoConservacionValue,
  ProductoUbicacion 				              :       ProductoUbicacionValue,
  ModoEtiquetaId					                :       ModoEtiquetaIdValue,
  SeccionId						                    :       SeccionIdValue,
  ProductoObservaciones			              :       ProductoObservacionesValue,
  ProductoCodigoAlterno1                  :       ProductoCodigoAlternoUnoValue,
  ProductoCodigoAlterno2                  :       ProductoCodigoAlternoDosValue,
  ProductoCodigoAlterno3                  :       ProductoCodigoAlternoTresValue,
  ProductoCodigoAlterno4                  :       ProductoCodigoAlternoCuatroValue,
  ProductoCodigoAlterno5                  :       ProductoCodigoAlternoCincoValue,
  ProductoClasificacionId1		            :       ProductoClasificacionUnoValue,
  ProductoClasificacionId2		            :       ProductoClasificacionDosValue,
  ProductoClasificacionId3		            :       ProductoClasificacionTresValue,
  ProductoClasificacionId4		            :       ProductoClasificacionCuatroValue,
  ProductoClasificacionId5	              :       ProductoClasificacionCincoValue,	

 }

 const GuardarProducto = new Promise((resolve, reject) => {

  const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/GuardarProducto'

  axios.post(urlRest, DataProducto).then(response => {
    const MensajeRest = response.data.Mensaje
    const ExisteError = response.data.ExisteError
    
    setExisteError(ExisteError)
    setMensajeRest(MensajeRest)

    if(ExisteError == 0)
    {
      setOpenSucces(true)
      setDisableButtonSave(true)
      setTimeout(
        function()
        {
          setOpenSucces(false)
          window.history.back();
        }, 3000
      );
      
    }

    else
    {
      
      setTimeout(
        function()
        {
          setOpenSucces(false);; 
          setOpenError(false);
          
        }, 9000
      );

      setOpenError(true);
      setOpenSucces(false);
    }
    
     
  }).catch(reason => {
      console.log("la razon de error: " + reason);
  })
});
}


/* Funciones para el tab de clasificaciones [FIN] */


  /*Funciones para las tabs [INICIO] */

  //const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  /*Funciones para las tabs [FIN] */


  /*Variables para el accordion [INICIO] */
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChangeAccordion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
   /*Variables para el accordion [FIN] */
  
  return (
    <Container>

    <div id = "DivContainer"
    style={{
        width : "100%",
      }}>
      
    
    <div
      style={{
        width : "25%",
        position: "absolute",
      }}
      >

      <div className = {classes.HeaderProducto}>
      
        <TextField
        className={classes.StyleTextField}

        InputProps={{
          className: classes.input,
          // notchedOutline: classes.notchedOutline
          classes: {
            notchedOutline: classes.notchedOutline,
            }
        }}

        label="Producto" 
        InputLabelProps={{ 
          className: classes.input
        }}
        onChange = {getProductoCodigoBarraValue }
        helperText="Código de barra del producto"
        value = {ProductoCodigoBarraValue}
        />

      </div>
      
      <div className = {classes.DetailProducto}>
      

      <TextField
       className={classes.StyleTextField}
        InputProps={{
          className: classes.input
        }}
        label="Descripción" 
        InputLabelProps={{ 
          className: classes.input
        }}
        fullWidth = {true}
        onChange = {getProductoNombreValue}
        value = {ProductoNombreValue}
        />


      <TextField
       className={classes.StyleTextField}
        InputProps={{
          className: classes.input
        }}
        label="Código Alterno" 
        InputLabelProps={{ 
          className: classes.input
        }}
        fullWidth = {true}
        onChange = {getProductoCodigoProveedorValue}
        value = {ProductoCodigoProveedorValue}
        />

        <FormControl variant="outlined" className= {classes.StyleTextField} >
                    
            <ComboBoxProveedorLine
            parentCallback = {callbackProveedorFunction} 
            FProveedorId = {ProveedorIdValue}
            />
    
        </FormControl>
        
        <FormControl  variant="outlined" className= {classes.StyleTextField} >
                    
            <ComboBoxAlmacenLine 
            parentCallback = {callbackAlmacenFunction}
            FAlmacenId = {AlmacenIdValue}
            />
            
        </FormControl>

        
        <TextField 
        id="Observaciones" 
        className={classes.StyleTextField}
        InputProps={{
          className: classes.input
        }}
        label="Observaciones" 
        onChange={getObservacionesValue} 
        fullWidth = {true}
        InputLabelProps={{ 
          className: classes.input
        }}
        value = {ProductoObservacionesValue}
        /> 



      </div>

    {/* Div accoriodn [INICIO] */}

    <Accordion square expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')} style = {{marginTop:20}}>

    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <p style = {{fontWeight:"bold", color: "rgb(79, 195, 161)"}}> Obligatorio </p> 
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel className="makeStyles-field" style= {{width: '100%'}}
            control={
              <Checkbox
              //checked={state.checkedB}
              onChange={getCaducidadObligatoriaValue}
              name="CaducidadObligatoria"
              color="primary"
              checked = {ProductoCaducidadObligatoriaValue}
              />
              }
              label="¿Caducidad Obligatoria?"
              
          />

          <FormControlLabel className="makeStyles-field" style= {{width: '100%'}}
            control={
            <Checkbox
            //checked={state.checkedB}
            onChange={getControlCuarentenaValue}
            name="ControlCuarentena"
            color="primary"
            checked = {ProductoControlCuarentenaValue}
            />
            }
            label="¿Control Cuarentena?"
          />
        </AccordionDetails>

    </Accordion>
    
    <Accordion square expanded={expanded === 'panel2'} onChange={handleChangeAccordion('panel2')} style = {{marginTop:10}}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
        <p style = {{fontWeight:"bold", color: "rgb(79, 195, 161)"}}> Unidad Medida </p> 
        </AccordionSummary>
        <AccordionDetails>

        <div style = {{width:"100%"}}>

          <div style = {{width:"100%"}}> 
            <ComboBoxUnidadMedidaCompra  
            parentCallback = {callbackUnidadMedidaCompraFunction}
            FProductoUnidadMedidaIdCompra = {ProductoUnidadMedidaIdCompraValue}
            />
          </div>
   
          <TextField 
          id="Ratio" 
          type="number"
          label="Ratio" 
          fullWidth
          onChange={getRatioValue} 
          className="makeStyles-field"
          value = {ProductoRatioValue}/> 
         
          <div style = {{width:"100%"}}>
            <ComboBoxUnidadMedidaConsumo 
            parentCallback = {callbackUnidadMedidaConsumoFunction} 
            FProductoUnidadMedidaIdConsumo = {ProductoUnidadMedidaIdConsumoValue}
            />
          </div>
 
        </div>

          {/* <FormControl variant="outlined" className="makeStyles-field">*/}
                        
           
                        
         {/*</FormControl> */}
            
          {/* <FormControl variant="outlined" className="makeStyles-field"  fullWidth = {true}> */}
                                    
                        
          {/* </FormControl> */}

        </AccordionDetails>
      </Accordion>

      <ColorButton disabled = {false} variant="contained" color="primary" className={classes.margin} onClick = {saveProducto}>
        <SaveIcon></SaveIcon>
      </ColorButton>

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


    <div style = {{    
      width: "58%",
      right: "1%",
      position: "absolute"
    }}>
      
      <AppBar position="static" color="default">
        <Tabs
          
          value={value}
          onChange={handleChange}
          // indicatorColor="primary"
          TabIndicatorProps={{style: {
            background:'rgb(79, 195, 161)', 
            
          }
          }
          }
          textColor="primary"
          
          variant="fullWidth"
          aria-label="full width tabs example"
          

        >
          <Tab label="Control en almacén" {...a11yProps(0)}  style = {{fontWeight:"bold", color: "rgb(79, 195, 161)"}}/>
          <Tab label="Datos Generales" {...a11yProps(1)}  style = {{fontWeight:"bold", color: "rgb(79, 195, 161)"}}/>
          <Tab label="Códigos alternos" {...a11yProps(2)}  style = {{fontWeight:"bold", color: "rgb(79, 195, 161)"}}/>
          <Tab label="Clasificaciones" {...a11yProps(3)}  style = {{fontWeight:"bold", color: "rgb(79, 195, 161)"}}/>
          
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{backgroundColor:"white"}}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>

        <div id="TabControlAlmacen">
          <TextField 
          id="StockMinimo" 
          type="number"
          label="Cantidad Mínima" 
          variant="outlined" 
          onChange={getStockMinimoValue} 
          className="makeStyles-field"
          fullWidth = {true}
          value = {ProductoStockMinimoValue}
          /> 

          <TextField 
          id="StockMaximo" 
          type="number"
          label="Cantidad Máxima" 
          variant="outlined" 
          onChange={getStockMaximoValue} 
          className="makeStyles-field"
          fullWidth = {true}
          value = {ProductoStockMaximoValue}
          /> 

          <TextField 
          id="PuntoPedido" 
          type="number"
          label="Punto de Pedido" 
          variant="outlined" 
          onChange={getPuntoPedidoValue} 
          className="makeStyles-field"
          fullWidth = {true}
          value = {ProductoPuntoPedidoValue}
          />

          <TextField 
          id="PuntoRelleno" 
          type="number"
          label="Punto de Relleno" 
          variant="outlined" 
          onChange={getPuntoRellenoValue} 
          className="makeStyles-field"
          fullWidth = {true}
          value = {ProductoPuntoRellenoValue}
          /> 



          <TextField 
          id="ProductoDiasCaducidadMinima" 
          type="number"
          label="días de anticipación para notificar que el producto caducará." 
          variant="outlined" 
          onChange={getProductoDiasCaducidadMinimaValue} 
          className="makeStyles-field"
          fullWidth = {true}
          value = {ProductoDiasCaducidadMinimaValue}
          /> 

          <TextField 
          id="Ubicacion" 
          label="Ubicación en el que debe guardarse" 
          variant="outlined" 
          onChange={getUbicacionValue} 
          className="makeStyles-field"
          fullWidth = {true}
          value = {ProductoUbicacionValue}
          /> 
          
          </div>
          
        


        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction} >

        <div id = "TabDatosGenerales"
         style={{
         
        }}>
          <FormControl variant="outlined" className="makeStyles-field" fullWidth = {true}>
            <InputLabel htmlFor="outlined-age-native-simple">Tipo</InputLabel>
              <Select
                native
                onChange={getProductoTipoValue}
                label="Age"
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                                        
                }}
                value = {ProductoTipoValue}
                >
                <option aria-label="None" value="" />
                <option value={'C'}>Consumible</option>
                <option value={'R'}>Reactivo</option>
              </Select>
          </FormControl>

          <FormControl variant="outlined" className="makeStyles-field" fullWidth = {true}>
                    
                    <ComboBoxGrupo 
                    parentCallback = {callbackGrupoFunction}
                    FGrupoId = {GrupoIdValue}/>
        
          </FormControl>

          <TextField 
          id="PrecioCompra" 
          type="number"
          label="Precio" 
          variant="outlined" 
          onChange={getPrecioCompraValue} 
          className="makeStyles-field"
          fullWidth = {true}
          value = {ProductoPrecioCompraValue}
          />

          <TextField 
          id="Iva" 
          type="number"
          label="%IVA" 
          variant="outlined" 
          onChange={getIVAValue} 
          className="makeStyles-field"
          fullWidth = {true}
          value = {ProductoIvaValue}
          /> 

          

          <TextField 
          id="Mascara" 
          label="Máscara" 
          variant="outlined" 
          onChange={getMascaraValue} 
          className="makeStyles-field"
          fullWidth = {true}
          value = {ProductoMascaraValue}
          /> 


          <TextField 
          id="Conservacion" 
          label="Conservación" 
          variant="outlined" 
          onChange={getConservacionValue} 
          className="makeStyles-field"
          fullWidth = {true}
          value = {ProductoConservacionValue}
          /> 



          <FormControl variant="outlined" className="makeStyles-field" fullWidth = {true}>
            <ComboBoxModoEtiqueta 
            parentCallback = {callbackModoEtiquetaFunction}
            FModoEtiquetaId = {ModoEtiquetaIdValue}/>
          </FormControl>

          <FormControl variant="outlined" className="makeStyles-field" fullWidth = {true}>
            <ComboBoxSeccion 
            parentCallback = {callbackSeccionFunction}
            FSeccionId = {SeccionIdValue}/>
          </FormControl>

         


        </div>

         
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
        <div id = "TabCodigosAlternos">
               
               <TextField 
               id="CodigoAlterno1" 
               label="Código Alterno 1" 
               variant="outlined" 
               onChange={getProductoCodigoAlternoUnoValue} 
               className="makeStyles-field"
               fullWidth
               value = {ProductoCodigoAlternoUnoValue}
               /> 

               <TextField 
               id="CodigoAlterno2" 
               label="Código Alterno 2" 
               variant="outlined" 
               onChange={getProductoCodigoAlternoDosValue} 
              // onChange={getUbicacionValue} 
               className="makeStyles-field"
               fullWidth
               value = {ProductoCodigoAlternoDosValue}/> 

               <TextField 
               id="CodigoAlterno3" 
               label="Código Alterno 3" 
               variant="outlined" 
               onChange={getProductoCodigoAlternoTresValue} 
              // onChange={getUbicacionValue} 
               className="makeStyles-field"
               fullWidth
               value = {ProductoCodigoAlternoTresValue}/> 

               <TextField 
               id="CodigoAlterno4" 
               label="Código Alterno 4" 
               variant="outlined" 
              // onChange={getUbicacionValue} 
               onChange={getProductoCodigoAlternoCuatroValue} 
               className="makeStyles-field"
               fullWidth
               value = {ProductoCodigoAlternoCuatroValue}/> 

               <TextField 
               id="CodigoAlterno5" 
               label="Código Alterno 5" 
               variant="outlined" 
              // onChange={getUbicacionValue} 
               onChange={getProductoCodigoAlternoCincoValue} 
               className="makeStyles-field"
               fullWidth
               value = {ProductoCodigoAlternoCincoValue}/> 
            
       </div>

          
        </TabPanel>
      
        <TabPanel value={value} index={3} dir={theme.direction}>

        <div id = "TabClasificaciones">

       



        {/* <div style = {{width:"100%", marginTop : "5%"}}> */}
          
          <ComboBoxClasificacionUno 
          parentCallback = {callbackClasificacionUnoFunction}
          FProductoClasificacionUno = {ProductoClasificacionUnoValue}
          />
        {/* </div> */}


        <div style = {{width:"100%" , marginTop : "5%"}}>                
          <ComboBoxClasificacionDos 
          parentCallback = {callbackClasificacionDosFunction}
          FProductoClasificacionDos = {ProductoClasificacionDosValue}
          />
        </div>

{/* </FormControl> */}

{/* <FormControl variant="outlined" className="makeStyles-field"> */}
<div style = {{width:"100%", marginTop : "5%"}}>                 
<ComboBoxClasificacionTres 
parentCallback = {callbackClasificacionTresFunction}
FProductoClasificacionTres = {ProductoClasificacionTresValue}
/>
</div>

{/* </FormControl> */}

{/* <FormControl variant="outlined" className="makeStyles-field"> */}
<div style = {{width:"100%", marginTop : "5%"}}>                
<ComboBoxClasificacionCuatro 
parentCallback = {callbackClasificacionCuatroFunction}
FProductoClasificacionCuatro = {ProductoClasificacionCuatroValue}
/>
</div>  
           
{/* </FormControl> */}

{/* <FormControl variant="outlined" className="makeStyles-field"> */}
<div style = {{width:"100%", marginTop : "5%"}}>
<ComboBoxClasificacionCinco 
parentCallback = {callbackClasificacionCincoFunction}
FProductoClasificacionCinco = {ProductoClasificacionCincoValue}
/>
</div>


</div>
          
        </TabPanel>

      </SwipeableViews>
    </div>

   

    </div>


    </Container>
  );
}


CustomizedInputs.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(CustomizedInputs);









































//Version 2.0




// import React, { useEffect, useState } from "react";
// import MuiAccordion from '@material-ui/core/Accordion';
// import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
// import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
// import PropTypes from 'prop-types';
// import { withStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import styled from 'styled-components';
// import FormControl from '@material-ui/core/FormControl';
// import ComboBoxAlmacenLine from './../../containers/ComboBox-Data/ComboBoxAlmacenLine'
// import ComboBoxProveedorLine from './../../containers/ComboBox-Data/ComboBoxProveedorLine'
// import SwipeableViews from 'react-swipeable-views';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import ComboBoxGrupo from './../../containers/ComboBox-Data/ComboBoxGrupo'
// import ComboBoxUnidadMedidaCompra from './../../containers/ComboBox-Data/ComboBoxUnidadMedidaCompra'
// import ComboBoxUnidadMedidaConsumo from './../../containers/ComboBox-Data/ComboBoxUnidadMedidaConsumo'
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import ComboBoxModoEtiqueta from './../../containers/ComboBox-Data/ComboBoxModoEtiqueta'
// import ComboBoxSeccion from '../../containers/ComboBox-Data/ComboBoxSeccion';
// import ComboBoxClasificacionUno from '../../containers/ComboBox-Data/ComboBoxClasificacionUno';
// import ComboBoxClasificacionDos from '../../containers/ComboBox-Data/ComboBoxClasificacionDos';
// import ComboBoxClasificacionTres from '../../containers/ComboBox-Data/ComboBoxClasificacionTres';
// import ComboBoxClasificacionCuatro from '../../containers/ComboBox-Data/ComboClasificacionCuatro';
// import ComboBoxClasificacionCinco from '../../containers/ComboBox-Data/ComboBoxClasificacionCinco';
// import Button from '@material-ui/core/Button';
// import SaveIcon from '@material-ui/icons/Save';
// import ipInfoLab from './../../containers/Functions/GetIpInfolab';
// import axios from 'axios';
// import Collapse from '@material-ui/core/Collapse';
// import { Alert, AlertTitle } from '@material-ui/lab';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import { getPosts } from './../../utils/RestProducto';

// const ColorButton = withStyles((theme) => ({
//   root: {
   
//     color: "white",
//     backgroundColor: "#15b765",
//     '&:hover': {
//       backgroundColor: "#0a86d4",
//     },
//     borderRadius:100,
//     // padding:"10px",
//     height:60,
//     boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
//     bottom:10,
//     right:10,
//     position:"fixed",
//     zIndex:100
//   },
// }))(Button);

// /*Styles Accordion [INICIO] */

// const Accordion = withStyles({
//   root: {
//     border: '1px solid rgba(0, 0, 0, .125)',
//     boxShadow: 'none',
//     '&:not(:last-child)': {
//       borderBottom: 0,
//     },
//     '&:before': {
//       display: 'none',
//     },
//     '&$expanded': {
//       margin: 'auto',
//     },
//   },
//   expanded: {},
// })(MuiAccordion);

// const AccordionSummary = withStyles({
//   root: {
//     backgroundColor: 'rgba(0, 0, 0, .03)',
//     borderBottom: '1px solid rgba(0, 0, 0, .125)',
//     marginBottom: -1,
//     minHeight: 56,
//     '&$expanded': {
//       minHeight: 56,
//     },
//   },
//   content: {
//     '&$expanded': {
//       margin: '12px 0',
//     },
//   },
//   expanded: {},
// })(MuiAccordionSummary);

// const AccordionDetails = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiAccordionDetails);

// /*Styles Accordion [FIN] */



// const styles = {
//   StyleTextField: {
//     fontweight: "bold",
//     width: '95%',
//     fontfamily: "Arial, Helvetica, sans-serif",
//   },
//   input: {
//     color: "white",
//     fontweight:"bold",
    
//   },

//   HeaderProducto:
//   {
//     backgroundColor:"#949494",
//     width : "100%",
//     paddingLeft:10,
//     paddingBottom:15,
//     paddingTop:10,
//     paddingright:50,
//   },

//   DetailProducto:
//   {
//     backgroundColor:"#bcbcbc",
//     width : "100%",
//     paddingLeft:10,
//     paddingBottom:15,
//     paddingTop:10,

//   },

// };

// const Container = styled.div`
// max-width: 80%;
// margin-left: 13%;
// margin-top: 25px;
// `;


// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     'aria-controls': `full-width-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: 500,
//   },
// }));

// const CRUDProducto = React.memo(function CustomizedInputsUser(props) {
 
//   console.log("se ejecuto crudproducto")
//   console.log({props})

//   const {DataProducto} = props
//   console.log([DataProducto])

//    DataProducto.map(post =>
//      {
//        const {ProductoCodigoBarra} = post
//        console.log('post en map: ' + ProductoCodigoBarra)
//        console.log({post})
//      })
 


  
//   // data.map(post => {
//   //   //const {ProductoCodigoBarra} = post
//   //   //console.log(ProductoCodigoBarra)
//   // })



//   const [tokenMode, settokenMode] = useState()
//   const [tokenProductoId, settokenProductoId] = useState()
//   const [ProductoCodigoBarraValue, setProductoCodigoBarraValue] = useState();
//   const [ProductoNombreValue, setProductoNombreValue] = useState('');
//   const [ProductoCodigoProveedorValue, setProductoCodigoProveedorValue] = useState('')
//   const [ProductoTipoValue, setProductoTipoValue] = useState('');
//   const [ProveedorIdValue, setProveedorIdValue] = useState(0);
//   const [AlmacenIdValue, setAlmacenIdValue] = useState(0);
//   const [GrupoIdValue, setGrupoIdValue] = useState(0);
//   const [ProductoPrecioCompraValue, setProductoPrecioCompraValue] = useState(0);
//   const [ProductoIvaValue, setProductoIvaValue] =  useState(0);
//   const [ProductoStockMinimoValue, setProductoStockMinimoValue] = useState(0);
//   const [ProductoStockMaximoValue, setProductoStockMaximoValue] = useState(0);
//   const [ProductoPuntoPedidoValue, setProductoPuntoPedidoValue] = useState(0);
//   const [ProductoPuntoRellenoValue, setProductoPuntoRellenoValue] = useState(0);
//   const [ProductoUnidadMedidaIdCompraValue, setProductoUnidadMedidaIdCompraValue] = useState(0);
//   const [ProductoUnidadMedidaIdConsumoValue, setProductoUnidadMedidaIdConsumoValue] = useState(0);
//   const [ProductoRatioValue, setProductoRatioValue] = useState(0);
//   const [ProductoDiasCaducidadMinimaValue, setProductoDiasCaducidadMinimaValue] = useState(0);
//   const [ProductoMascaraValue, setProductoMascaraValue] = useState(0);
//   const [ProductoCaducidadObligatoriaValue, setProductoCaducidadObligatoriaValue] = useState(false);
//   const [ProductoControlCuarentenaValue, setProductoControlCuarentenaValue] = useState(0);
//   const [ProductoConservacionValue, setProductoConservacionValue] = useState(0);
//   const [ProductoUbicacionValue, setProductoUbicacionValue] = useState('');
//   const [ModoEtiquetaIdValue, setModoEtiquetaIdValue] = useState(0);
//   const [SeccionIdValue, setSeccionIdValue] = useState(0);
//   const [ProductoObservacionesValue, setProductoObservacionesValue] = useState('');
//   const [ProductoClasificacionUnoValue, setProductoClasificacionUnoValue] = useState(0);
//   const [ProductoClasificacionDosValue, setProductoClasificacionDosValue] = useState(0);
//   const [ProductoClasificacionTresValue, setProductoClasificacionTresValue] = useState(0);
//   const [ProductoClasificacionCuatroValue, setProductoClasificacionCuatroValue] = useState(0);
//   const [ProductoClasificacionCincoValue, setProductoClasificacionCincoValue] = useState(0);
//   const [ValueMensajeRest, setMensajeRest] = useState('');
//   const [ValueExisteError, setExisteError] = useState(0);
//   const [openSucces, setOpenSucces] = React.useState(false);
//   const [openError, setOpenError] = React.useState(false);
//   const [disablesButtonSave, setDisableButtonSave] = React.useState(false);
  


// //   /*Parametros en url [INICIO] */
// //   const params = new URLSearchParams(props.location.search);
// //   const tokenMode = params.get('Mode')
// //   const tokenProductoId = params.get('ProductoId')
// //   /*Parametros en url [FIN] */

// //   useEffect(() => {
// //   if(tokenMode == 'upd')
// //   {

// //     const ProductoFilters = {
// //       ProductoId : tokenProductoId,
// //       ProductoNombre : ""
// //     }
    
// //     getPosts(ProductoFilters)
// //     .then((res) => {
// //         console.log(res)
// //         const data = res.data
        
// //         data.map(post => {
// //           const {ProductoCodigoBarra, ProductoNombre, ProductoCodigoProveedor, ProveedorId, ProductoObservaciones,
// //           ProductoCaducidadObligatoria, ProductoControlCuarentena, ProductoTipo, GrupoId, ProductoPrecioCompra,
// //           ProductoIva, ProductoMascara, ProductoConservacion, ModoEtiquetaId, SeccionId, ProductoUnidadMedidaIdConsumo} = post

// //           console.log('ProductoUnidadMedidaIdConsumo: ' + ProductoUnidadMedidaIdConsumo)
          
// //           setProductoCodigoBarraValue(ProductoCodigoBarra)
// //           setProductoNombreValue(ProductoNombre)
// //           setProductoCodigoProveedorValue(ProductoCodigoProveedor)
// //           setProveedorIdValue(ProveedorId)
// //           setProductoObservacionesValue(ProductoObservaciones)
// //           setProductoCaducidadObligatoriaValue(ProductoCaducidadObligatoria)
// //           setProductoControlCuarentenaValue(ProductoControlCuarentena)
// //           setProductoTipoValue(ProductoTipo)
// //           setGrupoIdValue(GrupoId)
// //           setProductoPrecioCompraValue(ProductoPrecioCompra)
// //           setProductoIvaValue(ProductoIva)
// //           setProductoMascaraValue(ProductoMascara)
// //           setProductoConservacionValue(ProductoConservacion)
// //           setModoEtiquetaIdValue(ModoEtiquetaId)
// //           setSeccionIdValue(SeccionId)
// //           setProductoUnidadMedidaIdConsumoValue(ProductoUnidadMedidaIdConsumo)

          
// //         })
// //     });
// //   }
// // },[false])
 
        


//   const { classes } = props;


//   function getProductoCodigoBarraValue(e){
//     const ProductoCodigoBarra = e.target.value
//     setProductoCodigoBarraValue(ProductoCodigoBarra)
//   }

//   function getProductoNombreValue(e){
//     const ProductoNombre = e.target.value
//     setProductoNombreValue(ProductoNombre)
//   }

//   function getProductoCodigoProveedorValue(e){
//     const ProductoCodigoProveedor = e.target.value
//     setProductoCodigoProveedorValue(ProductoCodigoProveedor)
//   }

//   function getProductoTipoValue(e){
//     const ProductoTipo = e.target.value;
//     setProductoTipoValue(ProductoTipo)
   
//     }

//   function callbackProveedorFunction(ProveedorData){
//     setProveedorIdValue(ProveedorData)
//   }

//   function callbackAlmacenFunction(AlmacenData){
//     setAlmacenIdValue(AlmacenData)
//   }

//   function callbackGrupoFunction(GrupoData){
//     setGrupoIdValue(GrupoData)
//   }

//   function getPrecioCompraValue(e){
//     const PrecioCompravalue = e.target.value;
//     setProductoPrecioCompraValue(PrecioCompravalue)
// }

// function getIVAValue(e){
//   const IVAValue = e.target.value;
//   setProductoIvaValue(IVAValue)
// }

// function getStockMinimoValue(e){
//   const StockMinimoValue = e.target.value;
//   setProductoStockMinimoValue(StockMinimoValue)
// }

// function getStockMaximoValue(e){
//   const StockMaximoValue = e.target.value;
//   setProductoStockMaximoValue(StockMaximoValue)
  
// }

// function getPuntoPedidoValue(e){
//   const PuntoPedidoValue = e.target.value;
//   setProductoPuntoPedidoValue(PuntoPedidoValue)
  
// }

// function getPuntoRellenoValue(e){
//   const PuntoRellenoValue = e.target.value;
//   setProductoPuntoRellenoValue(PuntoRellenoValue)
 
// }

// function callbackUnidadMedidaCompraFunction(UnidadMedidaCompraData){
//   console.log(UnidadMedidaCompraData)
//   setProductoUnidadMedidaIdCompraValue(UnidadMedidaCompraData)
// }

// function callbackUnidadMedidaConsumoFunction(UnidadMedidaConsumoData){
//   setProductoUnidadMedidaIdConsumoValue(UnidadMedidaConsumoData)
// }

// function getRatioValue(e){
//   const RatioValue = e.target.value;
//   setProductoRatioValue(RatioValue)
//  }

//  function getProductoDiasCaducidadMinimaValue(e){
//   const ProductoDiasCaducidadMinima = e.target.value;
//   setProductoDiasCaducidadMinimaValue(ProductoDiasCaducidadMinima)
// }

// function getMascaraValue(e){
//   const MascaraValue = e.target.value;
//   setProductoMascaraValue(MascaraValue)
// }

// function getCaducidadObligatoriaValue(e){
//   const CaducidadObligatoriaValue = e.target.checked;
//   setProductoCaducidadObligatoriaValue(CaducidadObligatoriaValue)
// }

// function getControlCuarentenaValue(e){
//   const ControlCuarentenaValue = e.target.checked;
//   setProductoControlCuarentenaValue(ControlCuarentenaValue)
// }

// function getConservacionValue(e){
//   const ConservacionValue = e.target.value;
//   setProductoConservacionValue(ConservacionValue)
// }

// function getUbicacionValue(e){
//   const UbicacionValue = e.target.value;
//   setProductoUbicacionValue(UbicacionValue)
// }

// function callbackModoEtiquetaFunction(ModoEtiquetaData){
//   setModoEtiquetaIdValue(ModoEtiquetaData);
// }

// function callbackSeccionFunction(SeccionData){
//   setSeccionIdValue(SeccionData)
// }

// function getObservacionesValue(e){
//   const ObservacionesValue = e.target.value;
//   setProductoObservacionesValue(ObservacionesValue)
// }


// /* Funciones para el tab de clasificaciones [INIIO] */

// function callbackClasificacionUnoFunction(ClasificacionUnoData){
//   setProductoClasificacionUnoValue(ClasificacionUnoData)
// }

// function callbackClasificacionDosFunction(ClasificacionDosData){
//   setProductoClasificacionDosValue(ClasificacionDosData)
// }


// function callbackClasificacionTresFunction(ClasificacionTresData){
//   setProductoClasificacionTresValue(ClasificacionTresData)
// }


// function callbackClasificacionCuatroFunction(ClasificacionCuatroData){
//   setProductoClasificacionCuatroValue(ClasificacionCuatroData)
// }


// function callbackClasificacionCincoFunction(ClasificacionCincoData){
//   setProductoClasificacionCincoValue(ClasificacionCincoData)
// }

// function saveProducto(){
  
//   console.log('tokenMode: ' + tokenMode)

//   const DataProducto = {
//   Modo                                    :       tokenMode,
//   ProductoId                              :       tokenProductoId,
//   ProductoCodigoBarra 			              :       ProductoCodigoBarraValue,
//   ProductoNombre	                        :       ProductoNombreValue	,							
//   ProductoTipo	                          :       ProductoTipoValue,				
//   AlmacenId 	                            :       AlmacenIdValue,					
//   ProveedorId 					                  :       ProveedorIdValue,
//   GrupoId 						                    :       GrupoIdValue,
//   ProductoCodigoProveedor 		            :       ProductoCodigoProveedorValue,
//   ProductoPrecioCompra 			              :       ProductoPrecioCompraValue,
//   ProductoIva 					                  :       ProductoIvaValue,
//   ProductoStockMinimo 			              :       ProductoStockMinimoValue,
//   ProductoStockMaximo 			              :       ProductoStockMaximoValue,
//   ProductoPuntoPedido 			              :       ProductoPuntoPedidoValue,
//   ProductoPuntoRelleno 			              :       ProductoPuntoRellenoValue,
//   ProductoUnidadMedidaIdCompra 	          :       ProductoUnidadMedidaIdCompraValue,
//   ProductoUnidadMedidaIdConsumo 	        :       ProductoUnidadMedidaIdConsumoValue,
//   ProductoRatio 					                :       ProductoRatioValue,
//   ProductoDiasCaducidadMinima 	          :       ProductoDiasCaducidadMinimaValue,
//   ProductoMascara 				                :       ProductoMascaraValue,
//   ProductoCaducidadObligatoria 	          :       ProductoCaducidadObligatoriaValue,
//   ProductoControlCuarentena 		          :       ProductoControlCuarentenaValue,
//   ProductoConservacion 			              :       ProductoConservacionValue,
//   ProductoUbicacion 				              :       ProductoUbicacionValue,
//   ModoEtiquetaId					                :       ModoEtiquetaIdValue,
//   SeccionId						                    :       SeccionIdValue,
//   ProductoObservaciones			              :       ProductoObservacionesValue,
//   ProductoClasificacionId1		            :       ProductoClasificacionUnoValue,
//   ProductoClasificacionId2		            :       ProductoClasificacionDosValue,
//   ProductoClasificacionId3		            :       ProductoClasificacionTresValue,
//   ProductoClasificacionId4		            :       ProductoClasificacionCuatroValue,
//   ProductoClasificacionId5	              :       ProductoClasificacionCincoValue,	
//  }

//  const GuardarProducto = new Promise((resolve, reject) => {

//   const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/GuardarProducto'

//   axios.post(urlRest, DataProducto).then(response => {
//     console.log({response})
//     const MensajeRest = response.data.Mensaje
//     const ExisteError = response.data.ExisteError
    
//     setExisteError(ExisteError)
//     setMensajeRest(MensajeRest)

//     if(ExisteError == 0)
//     {
//       setOpenSucces(true)
//       setDisableButtonSave(true)
//       setTimeout(
//         function()
//         {
//           setOpenSucces(false)
//           window.history.back();
//         }, 6000
//       );
      
//     }

//     else
//     {
      
//       setTimeout(
//         function()
//         {
//           setOpenSucces(false);; 
//           setOpenError(false);
          
//         }, 9000
//       );

//       setOpenError(true);
//       setOpenSucces(false);
//     }
    
     
//   }).catch(reason => {
//       console.log("la razon de error: " + reason);
//   })
// });
// }


// /* Funciones para el tab de clasificaciones [FIN] */


//   /*Funciones para las tabs [INICIO] */

//   //const classes = useStyles();
//   const theme = useTheme();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleChangeIndex = (index) => {
//     setValue(index);
//   };

//   /*Funciones para las tabs [FIN] */


//   /*Variables para el accordion [INICIO] */
//   const [expanded, setExpanded] = React.useState('panel1');

//   const handleChangeAccordion = (panel) => (event, newExpanded) => {
//     setExpanded(newExpanded ? panel : false);
//   };
//    /*Variables para el accordion [FIN] */
  
//   return (
//     <Container>

//     <div id = "DivContainer"
//     style={{
//         width : "100%",
//       }}>
      
    
//     <div
//       style={{
//         width : "25%",
//         position: "absolute",
//       }}
//       >

//       <div className = {classes.HeaderProducto}>
      
//         <TextField
//         className={classes.StyleTextField}

//         InputProps={{
//           className: classes.input,
//           // notchedOutline: classes.notchedOutline
//           classes: {
//             notchedOutline: classes.notchedOutline,
//             }
//         }}

//         label="Producto" 
//         InputLabelProps={{ 
//           className: classes.input
//         }}
//         onChange = {getProductoCodigoBarraValue }
//         helperText="Código de barra del producto"
//         value = {ProductoCodigoBarraValue}
//         />

//       </div>
      
//       <div className = {classes.DetailProducto}>
      

//       <TextField
//        className={classes.StyleTextField}
//         InputProps={{
//           className: classes.input
//         }}
//         label="Descripción" 
//         InputLabelProps={{ 
//           className: classes.input
//         }}
//         fullWidth = {true}
//         onChange = {getProductoNombreValue}
//         value = {ProductoNombreValue}
//         />


//       <TextField
//        className={classes.StyleTextField}
//         InputProps={{
//           className: classes.input
//         }}
//         label="Código Alterno" 
//         InputLabelProps={{ 
//           className: classes.input
//         }}
//         fullWidth = {true}
//         onChange = {getProductoCodigoProveedorValue}
//         value = {ProductoCodigoProveedorValue}
//         />

//         <FormControl variant="outlined" className= {classes.StyleTextField} value = {ProveedorIdValue} >
                    
//             <ComboBoxProveedorLine parentCallback = {callbackProveedorFunction}/>
    
//         </FormControl>


//         <FormControl  variant="outlined" className= {classes.StyleTextField} >
                    
//             <ComboBoxAlmacenLine parentCallback = {callbackAlmacenFunction}/>
            
//         </FormControl>

        
//         <TextField 
//         id="Observaciones" 
//         className={classes.StyleTextField}
//         InputProps={{
//           className: classes.input
//         }}
//         label="Observaciones" 
//         onChange={getObservacionesValue} 
//         fullWidth = {true}
//         InputLabelProps={{ 
//           className: classes.input
//         }}
//         value = {ProductoObservacionesValue}
//         /> 

//         <p>{ProductoUnidadMedidaIdConsumoValue}</p>
//         <div style = {{width:"100%"}}>
//             <ComboBoxUnidadMedidaConsumo parentCallback = {callbackUnidadMedidaConsumoFunction} ProductoUnidadMedidaIdConsumo = {ProductoUnidadMedidaIdConsumoValue}/>
//           </div>


//       </div>

//     {/* Div accoriodn [INICIO] */}

//     <Accordion square expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')} style = {{marginTop:20}}>

//     <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
//         <p style = {{fontWeight:"bold", color: "rgb(79, 195, 161)"}}> Obligatorio </p> 
//         </AccordionSummary>
//         <AccordionDetails>
//           <FormControlLabel className="makeStyles-field" style= {{width: '100%'}}
//             control={
//               <Checkbox
//               //checked={state.checkedB}
//               onChange={getCaducidadObligatoriaValue}
//               name="CaducidadObligatoria"
//               color="primary"
//               />
//               }
//               label="¿Caducidad Obligatoria?"
//               checked = {ProductoCaducidadObligatoriaValue}
//           />

//           <FormControlLabel className="makeStyles-field" style= {{width: '100%'}}
//             control={
//             <Checkbox
//             //checked={state.checkedB}
//             onChange={getControlCuarentenaValue}
//             name="ControlCuarentena"
//             color="primary"
//             />
//             }
//             label="¿Control Cuarentena?"
//             checked = {ProductoControlCuarentenaValue}
//           />
//         </AccordionDetails>

//     </Accordion>
    
//     <Accordion square expanded={expanded === 'panel2'} onChange={handleChangeAccordion('panel2')} style = {{marginTop:10}}>
//         <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
//         <p style = {{fontWeight:"bold", color: "rgb(79, 195, 161)"}}> Unidad Medida </p> 
//         </AccordionSummary>
//         <AccordionDetails>

//         <div style = {{width:"100%"}}>

//           <div style = {{width:"100%"}}> <ComboBoxUnidadMedidaCompra  parentCallback = {callbackUnidadMedidaCompraFunction}/></div>
   
//           <TextField 
//           id="Ratio" 
//           type="number"
//           label="Ratio" 
//           fullWidth
//           onChange={getRatioValue} 
//           className="makeStyles-field"/> 
         

 
//         </div>

//           {/* <FormControl variant="outlined" className="makeStyles-field">*/}
                        
           
                        
//          {/*</FormControl> */}
            
//           {/* <FormControl variant="outlined" className="makeStyles-field"  fullWidth = {true}> */}
                                    
                        
//           {/* </FormControl> */}

//         </AccordionDetails>
//       </Accordion>

//       <ColorButton disabled = {false} variant="contained" color="primary" className={classes.margin} onClick = {saveProducto}>
//         <SaveIcon></SaveIcon>
//       </ColorButton>

//          {/* seccion de alertas */}
//          <div className={classes.root}>
//       <div className = "AlertDiv">

//         {/* Alerta de succes  */}
//         <Collapse in={openSucces}>
//         <Alert severity="success"
//         action={
//         <IconButton
//           aria-label="close"
//           color="inherit"
//           size="small"
//           onClick={() => {
//           setOpenSucces(false);
//           }}
//           >
//         <CloseIcon fontSize="inherit" />
//         </IconButton>
//         }
//         >
//            <AlertTitle><b> Aviso </b></AlertTitle>
//           {ValueMensajeRest}
//         </Alert>
          
          

//         </Collapse>

//         {/* Alerta de error  */}

//         <Collapse in={openError}>
//           <Alert severity="error"
//           action={
//             <IconButton
//             aria-label="close"
//             color="inherit"
//             size="small"
//             onClick={() => {
//             setOpenError(false);
//               }
//             }
//             >
//       <CloseIcon fontSize="inherit" />
//       </IconButton>
//       }
//       >
//          <AlertTitle><b> Error </b></AlertTitle>
//         {ValueMensajeRest}
//       </Alert>
      
//       </Collapse>

//         </div>
//       </div>


    
//     </div>


//     <div style = {{    
//       width: "58%",
//       right: "1%",
//       position: "absolute"
//     }}>
      
//       <AppBar position="static" color="default">
//         <Tabs
          
//           value={value}
//           onChange={handleChange}
//           // indicatorColor="primary"
//           TabIndicatorProps={{style: {
//             background:'rgb(79, 195, 161)', 
            
//           }
//           }
//           }
//           textColor="primary"
          
//           variant="fullWidth"
//           aria-label="full width tabs example"
          

//         >
//           <Tab label="Datos Generales" {...a11yProps(0)}  style = {{fontWeight:"bold", color: "rgb(79, 195, 161)"}}/>
//           <Tab label="Códigos alternos" {...a11yProps(1)}  style = {{fontWeight:"bold", color: "rgb(79, 195, 161)"}}/>
//           <Tab label="Clasificaciones" {...a11yProps(2)}  style = {{fontWeight:"bold", color: "rgb(79, 195, 161)"}}/>
//           <Tab label="Control en almacén" {...a11yProps(3)}  style = {{fontWeight:"bold", color: "rgb(79, 195, 161)"}}/>
//         </Tabs>
//       </AppBar>
//       <SwipeableViews
//         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//         index={value}
//         onChangeIndex={handleChangeIndex}
//         style={{backgroundColor:"white"}}
//       >
//         <TabPanel value={value} index={0} dir={theme.direction}>
//          <div id = "TabDatosGenerales"
//          style={{
         
//         }}>
//           <FormControl variant="outlined" className="makeStyles-field" fullWidth = {true}>
//             <InputLabel htmlFor="outlined-age-native-simple">Tipo</InputLabel>
//               <Select
//                 value = {ProductoTipoValue}
//                 native
//                 onChange={getProductoTipoValue}
//                 label="Age"
//                 inputProps={{
//                   name: 'age',
//                   id: 'outlined-age-native-simple',
                                        
//                 }}
//                 >
//                 <option aria-label="None" value="" />
//                 <option value={'C'}>Consumible</option>
//                 <option value={'R'}>Reactivo</option>
//               </Select>
//           </FormControl>

//           <FormControl variant="outlined" className="makeStyles-field" fullWidth = {true}>
                    
//                     <ComboBoxGrupo parentCallback = {callbackGrupoFunction}/>
        
//           </FormControl>

//           <TextField 
//           id="PrecioCompra" 
//           type="number"
//           label="Precio" 
//           variant="outlined" 
//           onChange={getPrecioCompraValue} 
//           className="makeStyles-field"
//           fullWidth = {true}
//           value = {ProductoPrecioCompraValue}
//           />

//           <TextField 
//           id="Iva" 
//           type="number"
//           label="%IVA" 
//           variant="outlined" 
//           onChange={getIVAValue} 
//           className="makeStyles-field"
//           fullWidth = {true}
//           value = {ProductoIvaValue}
//           /> 

          

//           <TextField 
//           id="Mascara" 
//           label="Máscara" 
//           variant="outlined" 
//           onChange={getMascaraValue} 
//           className="makeStyles-field"
//           fullWidth = {true}
//           value = {ProductoMascaraValue}
//           /> 


//           <TextField 
//           id="Conservacion" 
//           label="Conservación" 
//           variant="outlined" 
//           onChange={getConservacionValue} 
//           className="makeStyles-field"
//           fullWidth = {true}
//           value = {ProductoConservacionValue}
//           /> 



//           <FormControl variant="outlined" className="makeStyles-field" fullWidth = {true}>
//             <ComboBoxModoEtiqueta parentCallback = {callbackModoEtiquetaFunction}/>
//           </FormControl>

//           <FormControl variant="outlined" className="makeStyles-field" fullWidth = {true}>
//             <ComboBoxSeccion parentCallback = {callbackSeccionFunction}/>
//           </FormControl>

         


//         </div>


//         </TabPanel>

//         <TabPanel value={value} index={1} dir={theme.direction} >
//           <div id = "TabCodigosAlternos">
               
//                   <TextField 
//                   id="CodigoAlterno1" 
//                   label="Código Alterno 1" 
//                   variant="outlined" 
//                  // onChange={getUbicacionValue} 
//                   className="makeStyles-field"
//                   fullWidth/> 

//                   <TextField 
//                   id="CodigoAlterno2" 
//                   label="Código Alterno 2" 
//                   variant="outlined" 
//                  // onChange={getUbicacionValue} 
//                   className="makeStyles-field"
//                   fullWidth/> 

//                   <TextField 
//                   id="CodigoAlterno3" 
//                   label="Código Alterno 3" 
//                   variant="outlined" 
//                  // onChange={getUbicacionValue} 
//                   className="makeStyles-field"
//                   fullWidth/> 

//                   <TextField 
//                   id="CodigoAlterno4" 
//                   label="Código Alterno 4" 
//                   variant="outlined" 
//                  // onChange={getUbicacionValue} 
//                   className="makeStyles-field"
//                   fullWidth/> 

//                   <TextField 
//                   id="CodigoAlterno5" 
//                   label="Código Alterno 5" 
//                   variant="outlined" 
//                  // onChange={getUbicacionValue} 
//                   className="makeStyles-field"
//                   fullWidth/> 
               
//           </div>
//         </TabPanel>

//         <TabPanel value={value} index={2} dir={theme.direction}>
//           <div id = "TabClasificaciones">

//               <div>

              
//             {/* <FormControl variant="outlined" className="makeStyles-field"> */}
//             <div style = {{width:"100%", marginTop : "5%"}}>
//               <ComboBoxClasificacionUno parentCallback = {callbackClasificacionUnoFunction}/>
//             </div>

//             {/* </FormControl> */}

//             {/* <FormControl variant="outlined" className="makeStyles-field"> */}
//             <div style = {{width:"100%" , marginTop : "5%"}}>                
//               <ComboBoxClasificacionDos parentCallback = {callbackClasificacionDosFunction}/>
//             </div>

//             {/* </FormControl> */}

//             {/* <FormControl variant="outlined" className="makeStyles-field"> */}
//             <div style = {{width:"100%", marginTop : "5%"}}>                 
//               <ComboBoxClasificacionTres parentCallback = {callbackClasificacionTresFunction}/>
//             </div>

//             {/* </FormControl> */}

//             {/* <FormControl variant="outlined" className="makeStyles-field"> */}
//             <div style = {{width:"100%", marginTop : "5%"}}>                
//               <ComboBoxClasificacionCuatro parentCallback = {callbackClasificacionCuatroFunction}/>
//             </div>  
                         
//             {/* </FormControl> */}

//             {/* <FormControl variant="outlined" className="makeStyles-field"> */}
//             <div style = {{width:"100%", marginTop : "5%"}}>
//               <ComboBoxClasificacionCinco parentCallback = {callbackClasificacionCincoFunction}/>
//             </div>

//             {/* </FormControl> */}
//             </div>
//           </div>
//         </TabPanel>
      
//         <TabPanel value={value} index={3} dir={theme.direction}>
//           <div id="TabControlAlmacen">
//           <TextField 
//           id="StockMinimo" 
//           type="number"
//           label="S. Mínimo" 
//           variant="outlined" 
//           onChange={getStockMinimoValue} 
//           className="makeStyles-field"
//           fullWidth = {true}
//           /> 

//           <TextField 
//           id="StockMaximo" 
//           type="number"
//           label="S. Máximo" 
//           variant="outlined" 
//           onChange={getStockMaximoValue} 
//           className="makeStyles-field"
//           fullWidth = {true}
//           /> 

//           <TextField 
//           id="PuntoPedido" 
//           type="number"
//           label="P. Pedido" 
//           variant="outlined" 
//           onChange={getPuntoPedidoValue} 
//           className="makeStyles-field"
//           fullWidth = {true}
//           />

//           <TextField 
//           id="PuntoRelleno" 
//           type="number"
//           label="P. Relleno" 
//           variant="outlined" 
//           onChange={getPuntoRellenoValue} 
//           className="makeStyles-field"
//           fullWidth = {true}
//           /> 



//           <TextField 
//           id="ProductoDiasCaducidadMinima" 
//           type="number"
//           label="días de anticipación para notificar que el producto caducará." 
//           variant="outlined" 
//           onChange={getProductoDiasCaducidadMinimaValue} 
//           className="makeStyles-field"
//           fullWidth = {true}
//           /> 

//           <TextField 
//           id="Ubicacion" 
//           label="Ubicación" 
//           variant="outlined" 
//           onChange={getUbicacionValue} 
//           className="makeStyles-field"
//           fullWidth = {true}
//           /> 
          
//           </div>
//         </TabPanel>

//       </SwipeableViews>
//     </div>

   

//     </div>


//     </Container>
//   );
// }
// )

// CRUDProducto.propTypes = {
//   classes: PropTypes.object.isRequired
// };


// export default withStyles(styles)(CRUDProducto);





