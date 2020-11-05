import React,  { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import UpdateProducto from './../Rest/UpdateProducto'
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

const DetailProducto = ({ ProductoId, ProductoNombre, ProductoTipo, ProductoCodigoProveedor, 
    ProductoPrecioCompra, ProductoPrecioVenta, ProductoIva, ProductoStockMinimo, ProductoStockMaximo,
    ProductoPuntoPedido, ProductoPuntoRelleno, ProductoUnidadMedidaIdCompra, ProductoUnidadMedidaIdConsumo, ProductoRatio}) => {

  const classes = useStyles();

  //Variables para los valores a guardar
  const [valueProductoId, setValueProductoId] = useState(ProductoId);
  const [valueProducto, setValueProducto] = useState(ProductoNombre); //UseState recupera el valor introducido
  const [valueProductoTipo, setValueProductoTipo] = useState(ProductoTipo)
  const [valueProductoCodigoProveedor, setValueProductoCodigoProveedor] = useState(ProductoCodigoProveedor)
  const [valueProductoPrecioCompra, setValueProductoPrecioCompra] = useState(ProductoPrecioCompra)
  const [valueProductoPrecioVenta, setValueProductoPrecioVenta] = useState(ProductoPrecioVenta)
  const [valueProductoIva, setValueProductoIva] = useState(ProductoIva)
  const [valueProductoStockMinimo, setValueProductoStockMinimo] = useState(ProductoStockMinimo)
  const [valueProductoStockMaximo, setValueProductoStockMaximo] = useState(ProductoStockMaximo)
  const [valueProductoPuntoPedido, setValueProductoPuntoPedido] = useState(ProductoPuntoPedido)
  const [valueProductoPuntoRelleno, setValueProductoPuntoRelleno] = useState(ProductoPuntoRelleno)
  const [valueProductoUnidadMedidaIdCompra, setValueProductoUnidadMedidaIdCompra] = useState(ProductoUnidadMedidaIdCompra)
  const [valueProductoUnidadMedidaIdConsumo, setValueProductoUnidadMedidaIdConsumo] = useState(ProductoUnidadMedidaIdConsumo)
  const [valueProductoRatio, setValueProductoRatio] = useState(ProductoRatio)

  //Variables para la respuesta del servicio
  const [ValueMensajeRest, setMensajeRest] = useState('');
  const [ValueExisteError, setExisteError] = useState(0);
  const [open, setOpen] = React.useState(false);
  
  //Funciones para recuperar lo ingresado
  function  getProductoValue(e){
    const ProductoValue = e.target.value;
    setValueProducto(ProductoValue)
}

  function Guardar()
  {
    const DataProducto = {
      ProductoId : valueProductoId,
      ProductoNombre :  valueProducto,
    }


      const GuardarProducto = new Promise((resolve, reject) => {

        const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/ActualizarProducto'
        

        axios.post(urlRest, DataProducto).then(response => {
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

  //UpdateProducto({DataProducto})
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
              
                id="Producto"
                label="Producto"
                defaultValue={ProductoNombre}
                variant="outlined"
                type="search"
                onChange={getProductoValue}
                />

            <TextField
              
              id="ProductoTipo"
              label="Tipo"
              defaultValue={ProductoTipo}
              variant="outlined"
              type="search"
              onChange={getProductoValue}
              />

            <TextField
              
              id="ProductoCodigoProveedor"
              label="Código Proveedor"
              defaultValue={ProductoCodigoProveedor}
              variant="outlined"
              type="search"
              onChange={getProductoValue}
              />

            <TextField
              
              id="ProductoPrecioCompra"
              label="Precio compra"
              defaultValue={ProductoPrecioCompra}
              variant="outlined"
              type="search"
              onChange={getProductoValue}
              />

            <TextField
              
              id="ProductoPrecioVenta"
              label="Precio venta"
              defaultValue={ProductoPrecioVenta}
              variant="outlined"
              type="search"
              onChange={getProductoValue}
              />

            <TextField
              
              id="ProductoIva"
              label="IVA(%)"
              defaultValue={ProductoIva}
              variant="outlined"
              type="search"
              onChange={getProductoValue}
              />

            <TextField
              
              id="ProductoStockMinimo"
              label="Stock Mínimo"
              defaultValue={ProductoStockMinimo}
              variant="outlined"
              type="search"
              onChange={getProductoValue}
              />

            <TextField
              
              id="ProductoStockMaximo"
              label="Stock Máximo"
              defaultValue={ProductoStockMaximo}
              variant="outlined"
              type="search"
              onChange={getProductoValue}
              />

            <TextField
              
              id="ProductoPuntoPedido"
              label="Punto Pedido"
              defaultValue={ProductoPuntoPedido}
              variant="outlined"
              type="search"
              onChange={getProductoValue}
              />

            <TextField
              
              id="ProductoPuntoRelleno"
              label="Punto Relleno"
              defaultValue={ProductoPuntoRelleno}
              variant="outlined"
              type="search"
              onChange={getProductoValue}
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
  export default DetailProducto;