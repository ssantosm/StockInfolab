import React, { useState } from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import ComboBoxProveedor from './../../containers/ComboBox-Data/ComboBoxProveedor';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ipInfoLab from './../../containers/Functions/GetIpInfolab';
import axios from 'axios';
import { getPosts } from './../../utils/RestProveedor';
import Collapse from '@material-ui/core/Collapse';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;

const useStyles = makeStyles((theme) => (
    {
      root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
      rootlarge: {
        '& > *': {
          margin: theme.spacing(1),
          width: '100%',
        },
      }
    }));

const NewPedido = () =>
{
    const classes = useStyles();


  /* Material table example */
  const { useState } = React;

    const [ValueMensajeRest, setMensajeRest] = useState('');
    const [ValueExisteError, setExisteError] = useState(0);
    const [openSucces, setOpenSucces] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);






    //const dinamicObject ={ 34: "test1", 63: "test2" }


    const [clientOptions, setclientOptions] = useState({});

    const ProveedorFilters = {
      ProveedorId : 0,
      ProveedorNombre: ""
    }

    getPosts(ProveedorFilters)

  .then((res) => {

    var clients = [];
    

    clients = res.data


     clients.map(client => {
      const { ProveedorId, email, ProveedorNombre } = client;
      clientOptions[ ProveedorId ] = ProveedorNombre
      console.log({clientOptions})
      })

})
.catch((err) => console.log(err));

  // Now let us convert it to JavaScript Object with key and value pairs:
  





  /*const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/CatalogoProveedor'

  axios.post(urlRest).then(response => {
      const MensajeRest = response.data.Mensaje
      const ExisteError = response.data.ExisteError
      console.log('--------------------------------------------')
      console.log({response})
      //setExisteError(ExisteError)
      //setMensajeRest(MensajeRest)
      
      
  }).catch(reason => {
      console.log("la razon de error: " + reason);
  })*/

  

  /*clients.map(client => {
      const { Proveedorid, email } = client;
      clientOptions[ Proveedorid ] = email;
  })*/
    

   /* const [columns, setColumns] = useState([
      { title: 'id', field: 'ProductoId' },
      { title: 'Codigo de barra', field: 'ProductoCodigoBarra', onChange : GetCodigoBarra()},
      { title: 'Cantidad', field: 'PedidoProductosCantidad', type: 'numeric', initialEditValue: 1 },
      {
          title: 'Proveedor',
          field: 'ProveedorId',
          type: 'numeric',
         // lookup: {1: 'Dicipa', 2: 'prueba'}//clientOptions,//{ 34: 'Dicipa', 63: 'Şanlıurfa' },
      },
    ]);*/

  const [data, setData] = useState([]);
  
//fin example ,aterial table

const [valuePedidoObservaciones, setvaluePedidoObservaciones] = useState("");

//const [ValueProveedor, setValueProveedor] = useState(0)

/*function callbackProveedorFunction(ProveedorData) {
    const messageProveedor = ProveedorData
    setValueProveedor(messageProveedor)
}*/

function GetObservacionesValue(e) {
  const Observaciones = e.target.value;
  console.log(Observaciones)
  setvaluePedidoObservaciones(Observaciones)
}

function GetCodigoBarra(e) {

}

function SavePedido()
{
  console.log({data})

  const DataPedido = {
    PedidoObservaciones : valuePedidoObservaciones,
    data : data
  }
  
  const GuardarPedido = new Promise((resolve, reject) => {

    const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/GuardarPedido'

    axios.post(urlRest, DataPedido).then(response => {
        const MensajeRest = response.data.MensajeRest
        const ExisteError = response.data.ExisteError

        setExisteError(ExisteError)
        setMensajeRest(MensajeRest)

        if(ExisteError == 0)
        {
          setOpenSucces(true);
          setOpenError(false);

          setTimeout(
            function()
            {
              setOpenSucces(false)
              window.history.back();
            }, 6000
          );
        }
        else
        {
          setOpenError(true);
          setOpenSucces(false);

          setTimeout(
            function()
            {
              setOpenError(false)
            }, 6000
          );
        }
       

        console.log({response})
        //setExisteError(ExisteError)
        //setMensajeRest(MensajeRest)
        
        
    }).catch(reason => {
        console.log("la razon de error: " + reason);
    })
});


}
    return(
        <div>
     <Container>

     
            <div className = "row no-margin">
                 <div className = "dashboard-title-column">
                   <span className = "pull-left dashboard-title">
                      Nuevo Pedido
                   </span>
                 </div>
            </div>

            <div className = "cardNewRegistro">
                <div className = "jss1 jss5 jss2">
                <form className={classes.root} noValidate autoComplete="off">
                    
                  {/* <TextField id="CodigoBarra" label="Código de barra" variant="outlined"/>  */}

                  {/* <FormControl variant="outlined" className=""> */}
                
                    {/* <InputLabel htmlFor="outlined-age-native-simple">Proveedor</InputLabel> */}
                
                    {/* <ComboBoxProveedor  parentCallback = {callbackProveedorFunction}/> */}
                
                  {/* </FormControl> */}
                
                </form>
                
                {/* <form className={classes.root} noValidate autoComplete="off"> */}

               
                
                {/* </form> */}
                
                <form className={classes.rootlarge} noValidate autoComplete="off">

                  <TextField id="PedidoObservaciones" label="Observaciones" variant="outlined" onChange = {GetObservacionesValue}/> 

                </form>

                <button type="button" className = "btn btn-green-light btn-pill"  onClick = {SavePedido}>Guardar</button>
                               


              </div>


            </div>

            <MaterialTable
            title="Productos"
            columns={[
            //  { title: 'id', field: 'ProductoId' },
              { title: 'Codigo de barra', field: 'ProductoCodigoBarra', render: rowData => <h1 onClick = {GetCodigoBarra}>{rowData.ProductoCodigoBarra}</h1> },
              { title: 'Cantidad', field: 'PedidoProductosCantidad', type: 'numeric', initialEditValue: 1 },
              {
                  title: 'Proveedor',
                  field: 'ProveedorId',
                  //type: 'numeric',
                  lookup: clientOptions,//{ 34: 'Dicipa', 63: 'Şanlıurfa' },
                 
              },
             
            ]}//{columns}
            data={data}
            editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
              setTimeout(() => {
              setData([...data, newData]);
              
              resolve();
              }, 1000)
            }),

        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              
              resolve()
            }, 1000)
          }),
      }}
    />

    
    </Container>

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
        
    )
}

export default NewPedido;