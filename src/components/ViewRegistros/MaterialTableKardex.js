import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogSalida from '@material-ui/core/Dialog';
import DialogEntradaDeUnProducto from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import ipInfoLab from './../../containers/Functions/GetIpInfolab';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ComboBoxProveedor from './../../containers/ComboBox-Data/ComboBoxProveedor'
import ComboBoxMotivoMovimiento from './../../containers/ComboBox-Data/ComboBoxMotivoMovimiento'
import { getPosts } from './../../utils/RestKardex';
import ViewDetailMovimientoProducto from './Details/ViewDetailsMovimientoProducto'
import NewEntradaMovimiento from './../NewRegistros/NewEntradaMovimiento'
import AlertMessage from './../Messages/AlertMessage'
import Collapse from '@material-ui/core/Collapse';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import deLocale from "date-fns/locale/es";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';






/*const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },

  button: {
    margin: theme.spacing(1),
  },

});*/

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor:"#22c488",
    borderColor: "#22c488",
    color:"#FFFFFF"
  },

  table: {
    minWidth: 700,
  },

  margin: {
    margin: theme.spacing(1),
    backgroundColor: '#ecf6fd',
    border: 0,
    fontWeight: 'bold',
    color: '#2797ef',
  },

}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const MaterialTableKardex = React.memo((props) => {
  const {posts} = props; //Recupera los productos del rest
  const data = props.posts
  const {AlmacenId} = props;
  const {Movimiento} = props //Recupera los movimientos de los productos
  const [statePopUp, setStatePopUp] = useState(false)
  const [openEntrada, setOpenEntrada] = React.useState(false);
  const [openSalida, setOpenSalida] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [openSucces, setOpenSucces] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const [valueDataTable, setValueDataTeble] = React.useState({posts})//[valueDataTable, setValueDataTeble] = useState([posts])
  const [open, setOpen] = React.useState(true);
  const [disablesButtonSave, setDisableButtonSave] = React.useState(false);
  const [OpenModalEntradaUnProducto, setOpenModalEntradaUnProducto] = React.useState(false)
  /*Date picker*/



  const [selectedDateCaducidad, setSelectedDateCaducidad] = React.useState(null);
  const [selectedDateKardexFechaMovimientoFisico, setSelectedDateKardexFechaMovimientoFisico] = React.useState(Date);
  
  const handleDateChangeCaducidad = (date) => {
    setSelectedDateCaducidad(date);
    setValueCaducidad(date);
  };

  const handleDateChangeKardexFechaMovimientoFisico = (date) => {
    setSelectedDateKardexFechaMovimientoFisico(date);
    setValueKardexFechaMovimientoFisico(date);

  };


 /*Columnas tabla padre*/
  const [stateTable, setStateTable] = React.useState({
    columns: [
      { title: 'Producto', field: 'ProductoCodigoBarra'},
      { title: 'Descripción', field: 'ProductoNombre',
      headerStyle: {
        fontSize: 20
        }, },
      { title: 'Total', field: 'CantidadExistente' },
      { title: 'Stock Mínimo', field: 'ProductoStockMinimo' },
      { title: 'Stock Máximo', field: 'ProductoStockMaximo' },
      { title: 'Punto Pedido', field: 'ProductoPuntoPedido' },
      { title: 'Punto Relleno', field: 'ProductoPuntoRelleno' },
      { title: 'Existencia', field: 'color'},
     
    ],

  });
  const classes = useStyles();
  


  /* Pop up scroll [INICIO]*/
  const handleClickOpen = (scrollType) => () => {
    setOpenEntrada(true);
    setScroll(scrollType);

    //se lipian las avriables al abrir el modal para que no haya residuos
    setDisableButtonSave(false);
    setSelectedDateCaducidad(null);
    setValueCaducidad(null);
    setValueCantidad(null);
    setValueCodigoBarra(null);
    setValueMotivoMovimiento(null);
    setValueObservaciones(null);
    setValueProveedor(null);
    setValueUbicacion(null);
  };

  const handleCloseEntrada = () => {
    setOpenEntrada(false);
    setOpenSucces(false);
    setOpenError(false);
  };

  const handleCloseSalida = () => {
    setOpenSalida(false);
    setOpenSucces(false);
    setOpenError(false);
  };

  const handelCloseModal = () => {
    setOpenModalEntradaUnProducto(false)
  }

  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (openEntrada) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openEntrada]);

  /* Pop up scroll [FIN]*/

  /* Variables de valores recuperados [INICIO] */

  const [valueProductoId, setValueProductoId] = useState(0)
  const [valueCodigobarra, setValueCodigoBarra] = useState('');
  const [valueCantidad, setValueCantidad] = useState(0);
  const [valueCaducidad, setValueCaducidad] = React.useState(null);
  const [valueKardexFechaMovimientoFisico, setValueKardexFechaMovimientoFisico] = React.useState(new Date());
  const [valueObservaciones, setValueObservaciones] = useState('');
  const [ValueMensajeRest, setMensajeRest] = useState('');
  const [ValueExisteError, setExisteError] = useState(0);
  const [ValueProveedor, setValueProveedor] = useState(0)
  const [ValueMotivoMovimiento, setValueMotivoMovimiento] = useState(0)
  const [valueUbicacion, setValueUbicacion] = useState('');
  const [valueMotivoMovimientoAbreviacion, setValueMotivoMovimientoAbreviacion] = useState('');
 // state = { messageProveedor: "" }
    

  /* Variables de valores recuperados [FIN] */

  /*  Modal PopUp [INICIO] */






  const handleClickOpenSalida = (scrollType) => () => {
    setOpenSalida(true);
    setDisableButtonSave(false)
    setScroll(scrollType);
  };

   /*  Modal PopUp [FIN] */

/* Funciones para recuperar los valores introducidos [INICIO] */

  function getCodigoBarra(e){
    const ProductoCodigoBarra = e.target.value;
    setValueCodigoBarra(ProductoCodigoBarra);
  }

  function getCantidad(e){
    const ProductoKardexCantidad = e.target.value;
    setValueCantidad(ProductoKardexCantidad);
  }

  function getCaducidad(e){
    const ProductoKardexFechaCaducidad = e.target.value;
    setValueCaducidad(ProductoKardexFechaCaducidad);
  }

  function getObservaciones(e){
    const KardexObservaciones = e.target.value
    setValueObservaciones(KardexObservaciones)
  }

 
  function callbackProveedorFunction(ProveedorData) {
    const messageProveedor = ProveedorData
    setValueProveedor(messageProveedor)
  }

  function callbackMotivoMovimientoFunction(MotivoMovimientoData) {
    const messageMotivoMovimiento = MotivoMovimientoData
    setValueMotivoMovimiento(messageMotivoMovimiento)
  }

  function getUbicacion(e){
    const ProductoKardexUbicacion = e.target.value
    setValueUbicacion(ProductoKardexUbicacion)
  }

  function GenerarEntradaDeUnProducto(ProductoId)
  {

    setValueProductoId(ProductoId)
    setValueMotivoMovimientoAbreviacion('ER')//Entrada rápida
    setOpenModalEntradaUnProducto(true)
    setDisableButtonSave(null);
    setSelectedDateCaducidad(null);
    setValueCaducidad(null);
    setValueCantidad(null);
    setValueCodigoBarra(null);
    setValueMotivoMovimiento(null);
    setValueObservaciones(null);
    setValueProveedor(null);
    setValueUbicacion(null);
    setValueKardexFechaMovimientoFisico(new Date())
    setValueCaducidad(null);
    
    //alert("clic")
  }

  function GenerarSalidaDeUnProducto(ProductoId)
  {
    setValueProductoId(ProductoId)
    setValueMotivoMovimientoAbreviacion('SR')//Entrada rápida
    setOpenModalEntradaUnProducto(true)
    setDisableButtonSave(null);
    setValueCaducidad(null);
    setValueCantidad(null);
    setValueCodigoBarra(null);
    setValueMotivoMovimiento(null);
    setValueObservaciones(null);
    setValueProveedor(null);
    setValueUbicacion(null);
    setValueKardexFechaMovimientoFisico(new Date())
    setValueCaducidad(null);
    setSelectedDateCaducidad(null)
  }

function GuardarMovimiento(){
  /*Armo la variable que se le enviara como parametro al proceso que guarda el movimiento */
   const DataNuevoMovimiento = ({
    SdtNuevoMovimiento : //Este es el nombre del parámetro en GX.
    {
    ProveedorKardexId : ValueProveedor,
    AlmacenKardexId : AlmacenId,
    KardexObservaciones : valueObservaciones,
    MotivoMovimientoId : ValueMotivoMovimiento,
    KardexFechaMovimientoFisico : valueKardexFechaMovimientoFisico,
    MotivoMovimientoAbreviacion : valueMotivoMovimientoAbreviacion,

    Productos : [{
      ProductoId : valueProductoId,//0,
      ProductoIdValue: valueProductoId,
      ProductoCodigoBarra: valueCodigobarra,
      ProductoKardexUbicacion : valueUbicacion,
      ProductoKardexCantidad :  valueCantidad,
      ProductoKardexFechaCaducidad : valueCaducidad,
      ProductoKardexFechaCaducidadtxt : valueCaducidad,
    }]
  }
  })


   const GuardarMovimiento = new Promise((resolve, reject) => {

    const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/GuardarMovimientoProducto'
        
    axios.post(urlRest, DataNuevoMovimiento)
    .then(response => {
      console.log({response})
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
           
            setOpenEntrada(false);
            setOpenSalida(false);
            setOpenSucces(false)
            setOpenModalEntradaUnProducto(false)
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
      
      props.parentCallback(ExisteError, MensajeRest)

      }).catch(reason => {
          console.log("la razon de error: " + reason);
        })

    });


    const KardexFilters = {
      AlmacenId : AlmacenId
    }
  }
/* Funciones para recuperar los valores introducidos [FIN] */

  return (
    <div>

      <MaterialTable
    
       title={<>Inventario Actual <Button
       variant="outlined"
       color="primary"
       //className={classes.button}
       startIcon={<AddIcon></AddIcon>}
       onClick={handleClickOpen('paper')}//{newEntrada}
       className={classes.margin}
      
      >Generar Entrada</Button>
       <Button
          // variant="contained"
          variant="outlined"
           color="primary"
          // className={classes.button}
           startIcon={<RemoveIcon>todo</RemoveIcon>}
           className={classes.margin}
           onClick={handleClickOpenSalida('paper')}
       >Generar Salida</Button>
       </>}



      columns = {[
        { title: 'Producto', field: 'ProductoCodigoBarra', 
        cellStyle: {
          width: '80%',
         
        }, 
      },
        { title: 'Código Alterno', field: 'ProductoCodigoProveedor',
        cellStyle: {
          width: '80%',
         
        }, 
      },
        
        { title: 'Descripción', field: 'ProductoNombre',
          cellStyle: {
            width: '80%',
         
          }, 
        },
        { title: 'Total', field: 'CantidadExistente',
        cellStyle: {
          width: '10%',
         
        }, 
        },
        { title: 'Stock Mínimo', field: 'ProductoStockMinimo',
        
        cellStyle: {
          width: '10%',
         
        }, 
        },
        { title: 'Stock Máximo', field: 'ProductoStockMaximo',
        
        cellStyle: {
          width: '10%',
         
        }, 
        },
        { title: 'Punto Pedido', field: 'ProductoPuntoPedido',
        
        cellStyle: {
          width: '10%',
         
        }, 
        },
        { title: 'Punto Relleno', field: 'ProductoPuntoRelleno',

        cellStyle: {
          width: '10%',
         
        }, 
        },
        { title: 'Existencia', 
          field: 'color',
        },
       
      ]}
      data= {posts}


      actions={[
        {
          icon: 'add_circle',
          iconProps: { style: { fontSize: "24px", color: "#2797ef" } },
          tooltip: 'Realizar Entrada',
          onClick: (event, rowData) => GenerarEntradaDeUnProducto(rowData.ProductoId)//(event, rowData) =>  setOpenModalEntradaUnProducto(true)//alert("You saved " + rowData.ProductoId)
        },

        {
          icon: 'remove_circle',
          iconProps: { style: { fontSize: "24px", color: "#FE4C25" } },
          tooltip: 'Realizar Salida',
          onClick: (event, rowData) => GenerarSalidaDeUnProducto(rowData.ProductoId)//alert("You saved " + rowData.name)
        },
      ]}

      

      options={{
       // paging:false,
         
        headerStyle: {
          backgroundColor: '#01579b',
          color: '#FFF'
        },

        rowStyle: {
          fontSize:16,
          height:10,
          width:20,
        },
       
        cellStyle: {
          width: 200,
          padding: '0',
        },

        pageSizeOptions:[5, 10, 20, 30],

        exportButton: true,
        exportFileName: "Inventario Actual",
        exportAllData: true ,

        actionsColumnIndex: 3 //Posición de los botones de acción dentro de la grilla
        
      }}
      

      

      localization={{
        header: {
          actions: 'Entrada/Salida'
        },

        toolbar: {
          searchPlaceholder: 'Buscar producto',
          
        },

        pagination: {
          labelDisplayedRows: '{from}-{to} de {count}',
          labelRowsSelect: 'Productos por página',
      },
    }}
      

      //  components={{
      //    Actions: (props) => {
          
      //      return(
      //        <div>
                
          
      //      </div>
      //      );

      //    }
      //  }}

      detailPanel={rowData => {
        const dataDetail = rowData.Movimiento
        return (
          
              <ViewDetailMovimientoProducto
              rowData = {rowData}
              AlmacenId = {AlmacenId}
              dataDetail = {dataDetail}
              ProductoId = {rowData.ProductoId}
              ProductoCodigoBarra = {rowData.ProductoCodigoBarra}>
                

              </ViewDetailMovimientoProducto> 


        )
      }}

      onRowClick={(event, rowData, togglePanel) => togglePanel()}



      >
      </MaterialTable>





     

      {/* Nueva Entrada */}
      <div>

      <Dialog
        open={openEntrada}
        onClose={handleCloseEntrada}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth = {true}
        
        
      >
        
        <DialogTitle id="scroll-dialog-title"   
          style = {{backgroundColor:"#fd9610", color:"#ffffff"}}>
            Entrada
            <IconButton onClick={handleCloseEntrada}>
            <CloseIcon />
            </IconButton>
            </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
          <h3>Producto</h3>

          <TextField 
          id="CodigoBarra" 
          label="Código de Barra" 
          variant="outlined" 
          className="makeStyles-field" 
          fullWidth={true} 
         // onChange = {getCodigoBarra}
          onBlur = {getCodigoBarra}//{getProveedorProducto}
          /> 
          
          <FormControl variant="outlined" className="makeStyles-field"  fullWidth={true}>
                    
            <ComboBoxProveedor 
            fullWidth={true} 
            parentCallback = {callbackProveedorFunction}
            ProductoCodigoBarra = {valueCodigobarra}
            />

          </FormControl>

          <h3>Información</h3>

          <TextField
          id="Cantidad"
          label="Cantidad"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          // fullWidth={true}
          onChange = {getCantidad}
          className="makeStyles-field"
        />

        <FormControl variant="" className="makeStyles-field"  fullWidth={false}>
                    
          <ComboBoxMotivoMovimiento 
          fullWidth={false} 
          parentCallback = {callbackMotivoMovimientoFunction}
          MotivoMovimientoTipo = "E"/>
        
        </FormControl>

        <TextField 
        id="Ubicacion" 
        label="Ubicación" 
        variant="outlined" 
        className="makeStyles-field" 
        fullWidth={true} 
        onChange = {getUbicacion}/> 

        <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils} position="fixed" className="makeStyles-field" fullWidth={true}>

          

  

              <KeyboardDatePicker
              margin="normal"
              autoOk = {true}
              id="date-picker-dialog-Caducidad"
              label="Caducidad"
              format="dd/MM/yyyy"
              value={selectedDateCaducidad}
              onChange={handleDateChangeCaducidad}
              KeyboardButtonProps={{
              'aria-label': 'change date',
              
              }}



              />
        

            <KeyboardDatePicker
              margin="normal"
              autoOk = {true}
              id="date-picker-dialog-Movimiento"
              label="Fecha entrada"
              format="dd/MM/yyyy"
              value={selectedDateKardexFechaMovimientoFisico}
             //inputProps={{ readOnly: true }}
              //readOnly = {true}
              KeyboardButtonProps={{
              'aria-label': 'change date',
              
              }}
              onChange={handleDateChangeKardexFechaMovimientoFisico}
              />

          </MuiPickersUtilsProvider>


          <TextField
          id="Observaciones"
          label="Observaciones"
          multiline
          rows={4}
          columns = {4}
          variant="outlined"
          fullWidth={true}
          onChange = {getObservaciones}
        />



          </DialogContentText>
        </DialogContent>

        <Button
              variant="contained"
              //color="primary"
              className={classes.button}
              onClick={GuardarMovimiento}//{newEntrada}
              disabled = {disablesButtonSave}
            >Aceptar</Button>

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
      
      </Dialog>
    </div>
    
    {/* Salida */}
    <DialogSalida
        open={openSalida}
        onClose={handleCloseSalida}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth = {true}
      >
       

       <DialogTitle id="scroll-dialog-title" onClose={handleCloseSalida}>Salida </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
             <h3>Producto</h3>
          <TextField id="CodigoBarra" label="Código de Barra" variant="outlined" className="makeStyles-field" fullWidth={true} onChange = {getCodigoBarra}/> 

          <FormControl variant="outlined" className="makeStyles-field"  fullWidth={true}>
                    
            <ComboBoxProveedor fullWidth={true} parentCallback = {callbackProveedorFunction}/>
        
          </FormControl>

          <h3>Información</h3>

          <TextField
          id="Cantidad"
          label="Cantidad"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          //fullWidth={true}
          onChange = {getCantidad}
          className="makeStyles-field"
        />

        <FormControl variant="" className="makeStyles-field"  fullWidth={false}>
                    
          <ComboBoxMotivoMovimiento 
          fullWidth={false} 
          parentCallback = {callbackMotivoMovimientoFunction} 
          MotivoMovimientoTipo = "S"/>
        
        </FormControl>



  <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils} position="fixed">

    <div id = "FiltersKardex">

      <KeyboardDatePicker
      margin="normal"
      autoOk = {true}
      //readOnly = {true}
      id="date-picker-dialog-Movimiento"
      label="Fecha Salida"
      format="dd/MM/yyyy"
      KeyboardButtonProps={{
      'aria-label': 'change date',
      }}
      onChange={handleDateChangeKardexFechaMovimientoFisico}
      value={selectedDateKardexFechaMovimientoFisico}
  />

</div>

      </MuiPickersUtilsProvider>

          <TextField
          id="Observaciones"
          label="Observaciones"
          multiline
          rows={4}
          variant="outlined"
          fullWidth={true}
          onChange = {getObservaciones}
        />



          </DialogContentText>
          </DialogContent>

          <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={GuardarMovimiento}//{newEntrada}
              type="submit"
              disabled = {disablesButtonSave}
            >Aceptar</Button>

            
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
    </DialogSalida>
    
    
    <DialogEntradaDeUnProducto
        open={OpenModalEntradaUnProducto}
        onClose={handelCloseModal}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth = {true}
        
      >
        
        <DialogTitle id="scroll-dialog-title"  onClose={handelCloseModal}>Movimiento Rápido</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >

        <div>
        <TextField
          id="Cantidad"
          label="Cantidad"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          //fullWidth={true}
          onChange = {getCantidad}
          className="makeStyles-field"
          // fullWidth
        />

        <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils} position="fixed" className="makeStyles-field" >

              <KeyboardDatePicker
              margin="normal"
              autoOk = {true}
              id="date-picker-dialog-Caducidad"
              label="Caducidad"
              format="dd/MM/yyyy"
              value={selectedDateCaducidad}
              onChange={handleDateChangeCaducidad}
              KeyboardButtonProps={{
              'aria-label': 'change date',
              
              }}
              />
        
          </MuiPickersUtilsProvider>
        </div>     
          

        <TextField
          id="Observaciones"
          label="Observaciones"
          multiline
          rows={4}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          //fullWidth={true}
          onChange = {getObservaciones}
          className="makeStyles-field"
          fullWidth
        />


          </DialogContentText>
        </DialogContent>

        <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={GuardarMovimiento}//{newEntrada}
              disabled = {disablesButtonSave}
            >Aceptar</Button>

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
      
      </DialogEntradaDeUnProducto>


    {/* <EntradaDeUnProducto ref={element => {this.child = element}}></EntradaDeUnProducto> */}

    </div>
    

    
   
  );
})

export default MaterialTableKardex