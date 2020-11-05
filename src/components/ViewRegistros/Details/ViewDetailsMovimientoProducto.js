import React, { useState } from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import HistoryIcon from '@material-ui/icons/History';
import { getPostsProductoMovimientos } from './../../../utils/RestProductoMovimientos';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Modal from 'react-awesome-modal';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Tooltip from '@material-ui/core/Tooltip';
import Moment from 'moment';
//import DateFnsUtils from '@date-io/date-fns';
import deLocale from "date-fns/locale/es";
//import MomentUtils from "@date-io/moment";

const Table = ({valueDataDetail}) => {


  return( <MaterialTable

    
    columns={[
              { 
                title: 'Fecha Captura', 
                field: 'KardexFechaMovimiento', 
                type: 'datetime',
                cellStyle: {
                  textAlign: "right"
                 } ,
                 headerStyle: {textAlign: 'right'}
              },

              { title: 'Movimiento', field: 'MotivoMovimientoNombre' },

              { 
                title: 'Cantidad Entrante', 
                field: 'ProductoKardexCantidad',
                cellStyle: {
                  textAlign: "center"
                 } ,
                 headerStyle: {textAlign: 'center'}
              },
              { title: 'Ubicación', field: 'ProductoKardexUbicacion' },
              { title: 'Caducidad', field: 'ProductoKardexFechaCaducidad', type: 'date', Moment:'es'},
              
                       
    ]}
    data = {valueDataDetail}
    options= {{
    toolbar: false,
    pageSizeOptions:[5],
    cellStyle: { padding: '0.3em'},
    headerStyle: { padding: '0.3em'},
    
    
    }}

    localization={{
      pagination: {
        labelDisplayedRows: '{from}-{to} de {count}',
    },
  }}
    >
    </MaterialTable>)
}

const TextoFecha = ({ProductoKardexFechaCaducidad}) => {
  //var dateCaducidad = date()

  const [dateCaducidad, setDateCaducidad] = React.useState(ProductoKardexFechaCaducidad);
  Moment.locale('es');

  //date = ProductoKardexFechaCaducidad;

  //console.log(date)

  

  if(ProductoKardexFechaCaducidad == "00-00-0000")
  {
    
    return(
      <p></p>
      )

  }else
  {

    return(
     <p>{dateCaducidad}</p>
    
      )

  }

}
  
//function ViewDetailMovimientoProducto (rowData)
const ViewDetailMovimientoProducto = React.memo((rowData) =>

{
    const {AlmacenId} = rowData;
    const {dataDetail} = rowData;
    const {ProductoId} = rowData;
    const {ProductoCodigoBarra} = rowData;

    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
          
        },

        buttonSearch : 
        {
         // float : "right",
         position: 'absolute',
         top: '21%',
         left: '65%',
        },

        ActionCloseModal : 
        {
          float: "right",
          top: 0,
          position: "absolute",
          right: 0,
          cursor: "pointer",
        },
      
        table: {
          minWidth: 700,
        },
      
      }));
    
    const classes = useStyles();

    const [valueProductoId, setValueProductoId] = useState(0)
    const [statePopUp, setStatePopUp] = useState(false)
    const [valueDataDetail, setValueDataDetail] = useState();

    const [selectedDate, setSelectedDate] = React.useState(null);
    

    const handleDateChangeFrom = (date) => {
       if(date)
       {
        setSelectedDate(date.toLocaleDateString('en-US'));
       }else
       {
        setSelectedDate(date);
       }
      
    };
  
    const [selectedDateTo, setSelectedDateTo] = React.useState(null);

    const handleDateChangeTo = (date) => {

      if(date)
      {
      setSelectedDateTo(date.toLocaleDateString('en-US'));
      }else
      {
        setSelectedDateTo(date);
      }
    };
   
    function SearchMovimientos(){
      console.log(selectedDate)
      const ProductoMovimientosFilters = {
        ProductoId : ProductoId,
        AlmacenId : AlmacenId,
        FechaDesde : selectedDate,
        FechaHasta : selectedDateTo,
      }
  
      getPostsProductoMovimientos(ProductoMovimientosFilters)
  
        .then((res) => {

          const DateText = res.data.map(Response => {
              const {ProductoKardexFechaCaducidad} = Response
              return {...Response,DateText: <TextoFecha
                ProductoKardexFechaCaducidad = {ProductoKardexFechaCaducidad}
              ></TextoFecha>}
  
          })

            //setValueDataDetail(res.data)
            setValueDataDetail(DateText)
            
        })
        .catch((err) => console.log(err));
    }

    

    function openModal() {
     
      setSelectedDate(null)
      setSelectedDateTo(null)
        setStatePopUp(true)
    
        const ProductoMovimientosFilters = {
          ProductoId : ProductoId,
          AlmacenId : AlmacenId,
          FechaDesde : '',
          FechaHasta : '',
        }
    
        getPostsProductoMovimientos(ProductoMovimientosFilters)
    
          .then((res) => {

            const DateText = res.data.map(Response => {
              
              const {ProductoKardexFechaCaducidad} = Response;
              return {...Response,DateText: 
              
                <TextoFecha
                  ProductoKardexFechaCaducidad = {ProductoKardexFechaCaducidad}>

                </TextoFecha>}
  
          })
            
              //setValueDataDetail(res.data)
              setValueDataDetail(DateText)
              
          })
          .catch((err) => console.log(err));
       
      }

      function closeModal() {
        setValueDataDetail([]);
        setStatePopUp(false);
        
      }

  

    return(
    <div>
        <h3 style={
          {color: "rgb(1, 87, 155)",
          margin:20}
        }
        >Movimientos del producto {ProductoCodigoBarra} (últimos 15 días)
        </h3>
   
        <MaterialTable
        columns={[
        { title: 'Fecha Captura', field: 'KardexFechaMovimiento', type: 'datetime', },
        { title: 'Movimiento', field: 'MotivoMovimientoNombre' },
      //   { 
      //     title: 'Cantidad Entrante', 
      //     field: 'ProductoKardexCantidad',  
      //     cellStyle: {
      //      textAlign: "center"
      //     } ,
      //     headerStyle: {textAlign: 'center'}
      //  },

        { 
          title: 'Cantidad', 
          field: 'ProductoKardexCantidadConsumo',
          cellStyle: {
            textAlign: "center"
          } ,
          headerStyle: {textAlign: 'center'}
        },
    
        ]}
        data = {dataDetail}

        options= {{
        pageSize:6,
        toolbar: false,
        paging: false,
        
        }}
    />

        <div style={{ padding: '20px' }}>
          <Tooltip title="Consultar todo el histórico" aria-label="Historico">
                <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<HistoryIcon>Histórico</HistoryIcon>}
                onClick={() => openModal(ProductoId)}
                tooltip ={'Consultar todo el histórico'} 
                >
                  Histórico
                </Button>
          </Tooltip>

              </div>


        <Modal 
          visible={statePopUp}
          width="800"
          height="500"
          effect="fadeInUp"
          onClickAway={() => closeModal()}
        
          
      >
        

      
      <div className = "ContainerModal">
        
      
        
        <div className={classes.root}>
         
              <h1>Consulta del histórico {ProductoCodigoBarra}</h1>

              <Tooltip title="Cerrar" aria-label="Cerrar">

              
                <HighlightOffIcon  
                onClick={() => closeModal()}
                className = {classes.ActionCloseModal}/>

              </Tooltip>

        </div>
          

          <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils} >
            {/* utils={DateFnsUtils} position="fixed"> */}

          <div id = "FiltersKardex">

            

          <KeyboardDatePicker
          margin="normal"
          autoOk = {true}
          id="date-picker-dialog-from"
          label="Desde"
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChangeFrom}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          
         
          
        />

          <KeyboardDatePicker
          margin="normal"
          autoOk = {true}
          id="date-picker-dialog-to"
          label="Hasta"
          format="dd/MM/yyyy"
          value={selectedDateTo}
          onChange={handleDateChangeTo}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.buttonSearch}
            onClick = {SearchMovimientos}
            //startIcon={<HistoryIcon>todo</HistoryIcon>}
            //onClick={handleClickOpen('paper')}//{newEntrada}
              
          >Buscar</Button>
        </div>

        </MuiPickersUtilsProvider>
        </div>

        <Table
        valueDataDetail = {valueDataDetail}
        showTextRowsSelected = {false}/>

        
      </Modal>

    </div>
    
    )
})

export default ViewDetailMovimientoProducto;