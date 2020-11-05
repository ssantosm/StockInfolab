import React, { Component } from 'react';

import styled from 'styled-components';
import ProductoRegistros from '../containers/ProductoRegistros';
import ComboBoxAlmacen from './../containers/ComboBox-Data/ComboBoxAlmacen'
import { getPosts } from '../utils/RestKardex';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import KardexGrid from '../components/KardexGrid';
import MaterialTableKardex from './ViewRegistros/MaterialTableKardex';
import BarColorExistencias from './BarColorExistencias';
import { getPostsAlmacen } from './../utils/RestAlmacen';
import Axios from 'axios';
import ipInfoLab from './../containers/Functions/GetIpInfolab';
import FilterListIcon from '@material-ui/icons/FilterList';
import DialogFiltros from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ModalFiltrosKardex from './Modal/ModalFiltrosKardex'
import Button from '@material-ui/core/Button';


const Container = styled.div`
  max-width: 85%;
  margin-left: 13%;
  margin-top: -40px;
`;

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  

const viewKardex = React.memo (class Kardex extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {
          posts: [],
          loading: true,
          AlmacenId : 0,
          valueFiltroExistencias: "Todos",
          valueFiltroCaducidad: "Todos",
          valueDiasCaduca : null,
          valueFiltroReactivo : true,
          valueFiltroConsumible : true,
          AbrirModalFiltros: false,
        };
      }

  //state = { messageAlmacen: "" }

  


  callbackAlmacenFunction = (AlmacenData) => {
        
    this.setState({AlmacenFiltro: AlmacenData})
    const AlmacenValue = this.state.AlmacenFiltro
    const FiltroExistenciasValue = this.state.valueFiltroExistencias
    const FiltroCaducidadValue = this.state.valueFiltroCaducidad
    const FiltroDiasCaducaValue = this.state.valueDiasCaduca
    const FiltroReactivoValue = this.state.valueFiltroReactivo
    const FiltroConsumibleValue = this.state.valueFiltroConsumible
    
    const KardexFilters = {
      AlmacenId : AlmacenData,
      valueFiltroExistencias: FiltroExistenciasValue,
      valueFiltroCaducidad : FiltroCaducidadValue,
      valueDiasCaduca : FiltroDiasCaducaValue,
      valueFiltroReactivo : FiltroReactivoValue,
      valueFiltroConsumible : FiltroConsumibleValue,
    }
            
        getPosts(KardexFilters)
        .then((res) => {
          const color = res.data.map(Response => {
          const { ProductoColorExistencia } = Response;
          const {CantidadExistente} = Response;
          const {ProductoStockMaximo} = Response;

            return {...Response,color: <BarColorExistencias 
              ProductoColorExistencia = {ProductoColorExistencia}
              CantidadExistente = {CantidadExistente}
              ProductoStockMaximo = {ProductoStockMaximo}></BarColorExistencias>}

        })
          
          this.setState({
            //posts: res.data,
            posts : color,
            loading: false,
            AlmacenId : AlmacenData,
          });
         
        })
        .catch((err) => console.log("Error: " + err));
    }
  

  CallbackFiltroExistenciasFunction = (ExistenciasData) =>{

    this.setState({valueFiltroExistencias: ExistenciasData})

  }

  CallbackFiltroCaducidadFunction = (CaducidadData) =>{
    this.setState({valueFiltroCaducidad: CaducidadData})

  }

  CallbakDiasCaducaFunction = (DiasCaducaData) => {
    this.setState({valueDiasCaduca: DiasCaducaData})
  }

  CallbackFiltroReactivoFunction = (ReactivoData) => {
    this.setState({valueFiltroReactivo: ReactivoData})
  }

  CallbackFiltroConsumibleFunction = (ConsumibleData) => {
    this.setState({valueFiltroConsumible : ConsumibleData})
  }

  BuscarProductosFiltro = () =>
  {
    const AlmacenValue = this.state.AlmacenId
    const FiltroExistenciasValue = this.state.valueFiltroExistencias;
    const FiltroCaducidadValue = this.state.valueFiltroCaducidad;
    const DiasCaducaValue = this.state.valueDiasCaduca;
    const FiltroReactivoValue = this.state.valueFiltroReactivo;
    const FiltroConsumibleValue = this.state.valueFiltroConsumible;

    const KardexFilters = {
      AlmacenId : AlmacenValue,
      valueFiltroExistencias: FiltroExistenciasValue,
      valueFiltroCaducidad: FiltroCaducidadValue,
      valueDiasCaduca: DiasCaducaValue,
      valueFiltroReactivo : FiltroReactivoValue, 
      valueFiltroConsumible : FiltroConsumibleValue,
    }

    console.log(KardexFilters)

    getPosts(KardexFilters)
    .then((res) => {
      console.log(res)
      const color = res.data.map(Response => {
      const { ProductoColorExistencia } = Response;
      const {CantidadExistente} = Response;
      const {ProductoStockMaximo} = Response;

        return {...Response,color: <BarColorExistencias 
          ProductoColorExistencia = {ProductoColorExistencia}
          CantidadExistente = {CantidadExistente}
          ProductoStockMaximo = {ProductoStockMaximo}></BarColorExistencias>}

    })
      this.setState({
        posts : color,
        loading: false,
        AlmacenId : AlmacenValue,
      });
     
    })
    .catch((err) => console.log("Error: " + err));

    this.setState({
      AbrirModalFiltros:false
    })
    

   
  }
 
    

async  componentDidMount() {

  const AlmacenFilters = {
    AlmacenId : 0,
    AlmacenNombre: "",
    MostrarDefault: true
  }
  
  await getPostsAlmacen(AlmacenFilters)
  .then((res) => {
    this.setState({
        posts: res.data,
        loading: false,
        AlmacenId : 0,
      }
     
      );

      
      const { posts, valueFiltroExistencias, valueFiltroCaducidad, valueDiasCaduca, valueFiltroReactivo, valueFiltroConsumible } = this.state;
     

      posts.map(async post => {
        const { AlmacenId} = post;
        

        const KardexFilters = {
          AlmacenId : AlmacenId,
          valueFiltroExistencias: valueFiltroExistencias,
          valueFiltroCaducidad : valueFiltroCaducidad,
          valueDiasCaduca : valueDiasCaduca,
          valueFiltroReactivo : valueFiltroReactivo,
          valueFiltroConsumible : valueFiltroConsumible,
          }

          await getPosts(KardexFilters)
          .then((res) => {

               
          const color = res.data.map(Response => {
            const { ProductoColorExistencia } = Response;
            const {CantidadExistente} = Response;
            const {ProductoStockMaximo} = Response;
      
            return {...Response,color: <BarColorExistencias 
              ProductoColorExistencia = {ProductoColorExistencia}
              CantidadExistente = {CantidadExistente}
              ProductoStockMaximo = {ProductoStockMaximo}></BarColorExistencias>}

        })
          
          this.setState({
            //posts: res.data,
            posts : color,
            loading: false,
            AlmacenId : AlmacenId
          });
            }
           
            )
            .catch((err) => console.log(err));
      })
      
    })
    .catch((err) => console.log(err));
      
}


UpdateData = async (ExisteError, MensajeRest) =>
{

  const {AlmacenId} = this.state;

  if(ExisteError === 0)
  {
    this.setState({
    posts: [{}],//res.data,
    loading: false,
    AlmacenId : AlmacenId
    });
  

  const KardexFilters = {
    AlmacenId : this.state.AlmacenId
    
  }

  await Axios.delete('http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/ConsultaKardex?&AlmacenId=' + this.state.AlmacenId)

  getPosts(KardexFilters)

  .then((res) => {
    console.log([res.data])
    const color = res.data.map(Response => {
      const { ProductoColorExistencia } = Response;
      const { ProductoStockMaximo } = Response;
      const {CantidadExistente} = Response;
      

      return {...Response,color: <BarColorExistencias 
        ProductoColorExistencia = {ProductoColorExistencia}
        CantidadExistente = {CantidadExistente}
        ProductoStockMaximo = {ProductoStockMaximo}
        >
          

        </BarColorExistencias>}

  })
  
    this.setState({
      posts: color,//res.data,
      loading: false,
      AlmacenId : AlmacenId
    });
  })
  .catch((err) => console.log("Error: " + err));

  
  }
}

MostrarModalFiltros = () => {
  this.setState({
    AbrirModalFiltros:true
  })
  

}

OcultarModalFiltros = () => {
  this.setState({
    AbrirModalFiltros:false
  })
  

}
  render() {

    const { loading } = this.state;
    const {posts} = this.state;
    const {AlmacenId} = this.state;

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




    const getproductoValue = event => {
      const productoValue = event.target.value;
      
      const KardexFilters = {
        AlmacenId : 0
        
      }
    
        
        getPosts(KardexFilters)
        .then((res) => {
          
          this.setState({
            posts: res.data,
            loading: false,
            AlmacenId : 0
          });
        })
        .catch((err) => console.log("Error: " + err));

    }

  
    const {AbrirModalFiltros, valueFiltroExistencias, valueFiltroCaducidad, valueDiasCaduca, 
      valueFiltroReactivo, valueFiltroConsumible} = this.state;

    return (
                <div>
                    <Container>
                   
                        <div className = "ContentCatalogo"> {this.renderFilters} 


                              <div style = {{backgroundColor: "#fff", marginBottom:"20px", padding:"20px", boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"}}>

                                <div style={{display:"flex", width:"100%"}}>
                                  <div style = {{width:"95%"}}>
                                    <ComboBoxAlmacen parentCallback = {this.callbackAlmacenFunction}/>
                                  </div>
                                  
                                  <div style = {{padding:"25px"}}>
                                    <FilterListIcon onClick = {this.MostrarModalFiltros}></FilterListIcon>
                                  </div>
                                </div>
                                 
                                  
         
                                <div>
                               
                                </div>
                                
                                
                              </div>

                        </div>

                    
                    <MaterialTableKardex
                    posts = {posts}
                    AlmacenId = {AlmacenId}
                    parentCallback = {this.UpdateData}
                    />
                    




        <DialogFiltros
        open={AbrirModalFiltros}//{OpenModalEntradaUnProducto}
        onClose={this.OcultarModalFiltros}
        // scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth = {true}
        
      >
        
        <DialogTitle id="scroll-dialog-title"  
        //onClose={handelCloseModal}
        >
          Filtros
        </DialogTitle>

        <DialogContent 
        //dividers={scroll === 'paper'}
        >
          <DialogContentText
            id="scroll-dialog-description"
           // ref={descriptionElementRef}
            tabIndex={-1}
          >

       
          
        <ModalFiltrosKardex
          parentCallbackFiltroExistencias = {this.CallbackFiltroExistenciasFunction}
          parentCallbackFiltroCaducidad =  {this.CallbackFiltroCaducidadFunction}
          parentCallbackDiasCaduca = {this.CallbakDiasCaducaFunction}
          parentCallbackFiltroReactivo = {this.CallbackFiltroReactivoFunction}
          parentCallbackFiltroConsumible = {this.CallbackFiltroConsumibleFunction}
          valueFiltroExistencias = {valueFiltroExistencias}
          valueFiltroCaducidad = {valueFiltroCaducidad}
          valueDiasCaduca = {valueDiasCaduca}
          valueFiltroReactivo = {valueFiltroReactivo}
          valueFiltroConsumible = {valueFiltroConsumible}
        >

        </ModalFiltrosKardex>
       

          </DialogContentText>
        </DialogContent>
        <Button
              variant="contained"
              color="primary"
              onClick = {this.BuscarProductosFiltro}
              // className={classes.button}
              // onClick={GuardarMovimiento}//{newEntrada}
              // disabled = {disablesButtonSave}
            >Aceptar</Button>

        </DialogFiltros>

        </Container >

                    
                </div>
            );
        }
    }
)
export default viewKardex;