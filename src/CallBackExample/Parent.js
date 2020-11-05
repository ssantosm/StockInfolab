import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react'
import Child1 from './child1'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import SaveProducto from './../components/NewRegistros/Rest/SaveProducto';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ComboBoxAlmacen from './../containers/ComboBox-Data/ComboBoxAlmacen'
import ComboBoxProveedor from './../containers/ComboBox-Data/ComboBoxProveedor'
import ComboBoxGrupo from './../containers/ComboBox-Data/ComboBoxGrupo'
import ComboBoxUnidadMedidaCompra from './../containers/ComboBox-Data/ComboBoxUnidadMedidaCompra'
import ComboBoxUnidadMedidaConsumo from './../containers/ComboBox-Data/ComboBoxUnidadMedidaConsumo'
import ComboBoxModoEtiqueta from './../containers/ComboBox-Data/ComboBoxModoEtiqueta'
import ComboBoxSeccion from './../containers/ComboBox-Data/ComboBoxSeccion';
import ComboBoxClasificacionUno from './../containers/ComboBox-Data/ComboBoxClasificacionUno';
import ComboBoxClasificacionDos from './../containers/ComboBox-Data/ComboBoxClasificacionDos';
import ComboBoxClasificacionTres from './../containers/ComboBox-Data/ComboBoxClasificacionTres';
import ComboBoxClasificacionCuatro from './../containers/ComboBox-Data/ComboClasificacionCuatro';
import ComboBoxClasificacionCinco from './../containers/ComboBox-Data/ComboBoxClasificacionCinco';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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


class Parent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          count: 5,
          valueProducto : '',
          ValueProductoTipo: '',
          ValueCodigoProveedor : '',
          ValuePrecioCompra : 0,
          ValueIVA: 0,
          ValueStockMinimo : 0,
          ValueStockMaximo : 0,
          ValuePuntoPedido : 0,
          ValuePuntoRelleno : 0,
          ValueRatio : '',
          valueCodigoBarra: '',
          ValueCaducidadDias : 0,
          ValueMascara : '',
          ValueCaducidadObligatoria : false,
          ValueControlCuarentena: false,
          ValueConservacion : '',
          ValueUbicacion : '',
          ValueObservaciones : '',
        
        };
      }

    

    /*CallBacks [INICIO]*/
    state = { message: "" }
    callbackFunction = (childData) => {
          this.setState({message: childData})
    }


    state = { messageAlmacen: "" }
    callbackAlmacenFunction = (AlmacenData) => {
        this.setState({messageAlmacen: AlmacenData})
    }
  
    state = { messageProveedor: "" }
    callbackProveedorFunction = (ProveedorData) => {
      this.setState({messageProveedor: ProveedorData})
    }

    state = { messageGrupo: "" }
    callbackGrupoFunction = (GrupoData) => {
      this.setState({messageGrupo: GrupoData})
    }

    state = { messageUnidadMedidaCompra: "" }
    callbackUnidadMedidaCompraFunction = (UnidadMedidaCompraData) => {
      this.setState({messageUnidadMedidaCompra: UnidadMedidaCompraData})
    }

    state = { messageUnidadMedidaConsumo: "" }
    callbackUnidadMedidaConsumoFunction = (UnidadMedidaConsumoData) => {
      this.setState({messageUnidadMedidaConsumo: UnidadMedidaConsumoData})
    }

    state = { messageModoEtiqueta: "" }
    callbackModoEtiquetaFunction = (ModoEtiquetaData) => {
      this.setState({messageModoEtiqueta: ModoEtiquetaData})
    }

    state = { messageSeccion: "" }
    callbackSeccionFunction = (SeccionData) => {
      this.setState({messageSeccion: SeccionData})
    }

    state = { messageClasificacionUno: "" }
    callbackClasificacionUnoFunction = (ClasificacionUnoData) => {
      this.setState({messageClasificacionUno: ClasificacionUnoData})
    }

    state = { messageClasificacionDos: "" }
    callbackClasificacionDosFunction = (ClasificacionDosData) => {
      this.setState({messageClasificacionDos: ClasificacionDosData})
    }

    state = { messageClasificacionTres: "" }
    callbackClasificacionTresFunction = (ClasificacionTresData) => {
      this.setState({messageClasificacionTres: ClasificacionTresData})
    }

    state = { messageClasificacionCuatro: "" }
    callbackClasificacionCuatroFunction = (ClasificacionCuatroData) => {
      this.setState({messageClasificacionCuatro: ClasificacionCuatroData})
    }

    state = { messageClasificacionCinco: "" }
    callbackClasificacionCincoFunction = (ClasificacionCincoData) => {
      this.setState({messageClasificacionCinco: ClasificacionCincoData})
    }

    /*CallBacks [FIN]*/


    //Obtener valores ingresados
    getProductoValue = (e) => {
        const ProductoValue = e.target.value;
        this.setState({valueProducto : ProductoValue})
    }

    getProductoTipoValue = (e) => {
        //const name = e.target.name;
         //this.setState({
         /*...state,
         [name]: e.target.value,*/
         //});
 
     
     const ProductoTipoValue = e.target.value;
     this.setState({ValueProductoTipo : ProductoTipoValue})
    
     }

    getCodigoProveedorValue = (e) => {
        const CodigoProveedorValue = e.target.value;
        this.setState({ValueCodigoProveedor :  CodigoProveedorValue})
       
    }


   getPrecioCompraValue = (e) =>{
        const PrecioCompraValue = e.target.value;
       this.setState({ValuePrecioCompra : PrecioCompraValue})
    }

    getIVAValue = (e) =>{
        const IVAValue = e.target.value;
        this.setState({ValueIVA : IVAValue})
    }

    getStockMinimoValue = (e) =>{
        const StockMinimoValue = e.target.value;
        this.setState({ValueStockMinimo : StockMinimoValue})
    }

    getStockMaximoValue = (e) =>{
        const StockMaximoValue = e.target.value;
        this.setState({ValueStockMaximo : StockMaximoValue})
    }

    getPuntoPedidoValue = (e) =>{
        const PuntoPedidoValue = e.target.value;
        this.setState({ValuePuntoPedido : PuntoPedidoValue})
    }

    getPuntoRellenoValue = (e) =>{
        const PuntoRellenoValue = e.target.value;
       this.setState({ValuePuntoRelleno : PuntoRellenoValue})
    }

    getRatioValue = (e) => {
        const RatioValue = e.target.value;
       this.setState({ValueRatio : RatioValue})
    }

    getCodigoBarraValue = (e) =>{
        const CodigoBarraValue = e.target.value;
        this.setState({valueCodigoBarra : CodigoBarraValue})
    }

    getCaducidadDiasValue = (e) => {
        const CaducidadDiasValue = e.target.value;
        this.setState({ValueCaducidadDias : CaducidadDiasValue})
    }

    getMascaraValue = (e) => {
        const MascaraValue = e.target.value;
        this.setState({ValueMascara : MascaraValue})
    }

    getCaducidadObligatoriaValue = (e) => {
        const CaducidadObligatoriaValue = e.target.checked;
       this.setState({ValueCaducidadObligatoria : CaducidadObligatoriaValue})
    }

    getControlCuarentenaValue = (e) => {
        const ControlCuarentenaValue = e.target.checked;
        this.setState({ValueControlCuarentena : ControlCuarentenaValue})
    }

    getConservacionValue = (e) => {
        const ConservacionValue = e.target.value;
        this.setState({ValueConservacion : ConservacionValue})
    }

    getUbicacionValue = (e) =>{
        const UbicacionValue = e.target.value;
        this.setState({ValueUbicacion : UbicacionValue})
    }

    getObservacionesValue = (e) => {
        const ObservacionesValue = e.target.value;
       this.setState({ValueObservaciones : ObservacionesValue})
    }


    GetData = () => {
        const ProductoValue = this.state.valueProducto
        const ProductoTipoValue = this.state.ValueProductoTipo
        const AlmacenValue = this.state.messageAlmacen
        const ProveedorValue = this.state.messageProveedor
        const GrupoValue = this.state.messageGrupo
        const CodigoProveedorValue = this.state.ValueCodigoProveedor
        const PrecioCompraValue = this.state.ValuePrecioCompra
        const IVAValue = this.state.ValueIVA
        const StockMinimoValue = this.state.ValueStockMinimo
        const StockMaximoValue = this.state.ValueStockMaximo
        const PuntoPedidoValue = this.state.ValuePuntoPedido
        const PuntoRellenoValue = this.state.ValuePuntoRelleno
        const UnidadMedidaCompraValue = this.state.messageUnidadMedidaCompra
        const UnidadMedidaConsumoValue = this.state.messageUnidadMedidaConsumo
        const RatioValue = this.state.ValueRatio
        const CodigoBarraValue = this.state.valueCodigoBarra
        const CaducidadDiasValue = this.state.ValueCaducidadDias
        const MascaraValue = this.state.ValueMascara
        const CaducidadObligatoriaValue = this.state.ValueCaducidadObligatoria
        const ControlCuarentenaValue = this.state.ValueControlCuarentena
        const ConservacionValue = this.state.ValueConservacion
        const UbicacionValue = this.state.ValueUbicacion
        const ModoEtiquetValue = this.state.messageModoEtiqueta
        const SeccionValue = this.state.messageSeccion
        const ObservacionesValue = this.state.ValueObservaciones
        const ClasificacionUnoValue = this.state.messageClasificacionUno
        const ClasificacionDosValue = this.state.messageClasificacionDos
        const ClasificacionTresValue = this.state.messageClasificacionTres
        const ClasificacionCuatroValue = this.state.messageClasificacionCuatro
        const ClasificacionCincoValue = this.state.messageClasificacionCinco
        
        const DataProducto = {
        ProductoNombre	                        :       ProductoValue	,							
        ProductoTipo	                        :       ProductoTipoValue,				
        AlmacenId 	                            :       AlmacenValue,					
        ProveedorId 					        :       ProveedorValue,
        GrupoId 						        :       GrupoValue,
        ProductoCodigoProveedor 		        :       CodigoProveedorValue,
        ProductoPrecioCompra 			        :       PrecioCompraValue,
        ProductoIva 					        :       IVAValue,
        ProductoStockMinimo 			        :       StockMinimoValue,
        ProductoStockMaximo 			        :       StockMaximoValue,
        ProductoPuntoPedido 			        :       PuntoPedidoValue,
        ProductoPuntoRelleno 			        :       PuntoRellenoValue,
        ProductoUnidadMedidaIdCompra 	        :       UnidadMedidaCompraValue,
        ProductoUnidadMedidaIdConsumo 	        :       UnidadMedidaConsumoValue,
        ProductoRatio 					        :       RatioValue,
        ProductoCodigoBarra 			        :       CodigoBarraValue,
        ProductoDiasCaducidadMinima 	        :       CaducidadDiasValue,
        ProductoMascara 				        :       MascaraValue,
        ProductoCaducidadObligatoria 	        :       CaducidadObligatoriaValue,
        ProductoControlCuarentena 		        :       ControlCuarentenaValue,
        ProductoConservacion 			        :       ConservacionValue,
        ProductoUbicacion 				        :       UbicacionValue,
        ModoEtiquetaId					        :       ModoEtiquetValue,
        SeccionId						        :       SeccionValue,
        ProductoObservaciones			        :       ObservacionesValue,
        ProductoClasificacionId1		        :       ClasificacionUnoValue,
        ProductoClasificacionId2		        :       ClasificacionDosValue,
        ProductoClasificacionId3		        :       ClasificacionTresValue,
        ProductoClasificacionId4		        :       ClasificacionCuatroValue,
        ProductoClasificacionId5	            :       ClasificacionCincoValue,	
       }

       SaveProducto({DataProducto})
       
    }
    

    render() {
            return (
                <div>
                    <Container>
                    <div className = "row no-margin">
                        <div className = "dashboard-title-column">
                            <span className = "pull-left dashboard-title">
                      Nuevo Producto
                            </span>
                        </div>
                    </div>

                    <div className = "cardNewRegistro">
                        <div className = "jss1 jss5 jss2">
                            <form  noValidate autoComplete="off">
                       
                           
                                
                                    <TextField id="Producto" label="Producto" variant="outlined" onChange={this.getProductoValue} className = "makeStyles-field"/> 
                                

                                
                                    <FormControl variant="outlined" className="makeStyles-field">
                                    <InputLabel htmlFor="outlined-age-native-simple" >Tipo</InputLabel>
                                        <Select
                                        native
                                        //value={state.Tipo}
                                        onChange={this.getProductoTipoValue}
                                        label="Age"
                                        inputProps={{
                                        name: 'age',
                                        id: 'outlined-age-native-simple',
                                        
                                        }}
                                        >
                                        <option aria-label="None" value="" />
                                        <option value={'C'}>Consumible</option>
                                        <option value={'R'}>Reactivo</option>
                                        </Select>
                                </FormControl>
                              
                               

                                <FormControl variant="outlined" className="makeStyles-field">
                    
                                    <ComboBoxAlmacen parentCallback = {this.callbackAlmacenFunction}/>
                            
                                </FormControl>

                                <FormControl variant="outlined" className="makeStyles-field">
                    
                                    <ComboBoxProveedor parentCallback = {this.callbackProveedorFunction}/>
                    
                                </FormControl>
                         

                            <FormControl variant="outlined" className="makeStyles-field">
                    
                                <ComboBoxGrupo parentCallback = {this.callbackGrupoFunction}/>
                    
                            </FormControl>

                            <TextField id="CodigoProveedor" label="Código Proveedor" variant="outlined" onChange={this.getCodigoProveedorValue} className = "makeStyles-field"/> 

                            <TextField id="PrecioCompra" label="Precio" variant="outlined" onChange={this.getPrecioCompraValue} className="makeStyles-field"/> 

                            <TextField id="Iva" label="%IVA" variant="outlined" onChange={this.getIVAValue} className="makeStyles-field"/> 

                            <TextField id="StockMinimo" label="S. Mínimo" variant="outlined" onChange={this.getStockMinimoValue} className="makeStyles-field"/> 

                            <TextField id="StockMaximo" label="S. Máximo" variant="outlined" onChange={this.getStockMaximoValue} className="makeStyles-field"/> 

                            <TextField id="PuntoPedido" label="P. Pedido" variant="outlined" onChange={this.getPuntoPedidoValue} className="makeStyles-field"/>

                            <TextField id="PuntoRelleno" label="P. Relleno" variant="outlined" onChange={this.getPuntoRellenoValue} className="makeStyles-field"/> 

                            <FormControl variant="outlined" className="makeStyles-field">
                        
                                <ComboBoxUnidadMedidaCompra  parentCallback = {this.callbackUnidadMedidaCompraFunction}/>
                    
                            </FormControl>

                            <FormControl variant="outlined" className="makeStyles-field">
                        
                                <ComboBoxUnidadMedidaConsumo parentCallback = {this.callbackUnidadMedidaConsumoFunction}/>
                    
                            </FormControl>

                            <TextField id="Ratio" label="Ratio" variant="outlined" onChange={this.getRatioValue} className="makeStyles-field"/> 

                            <TextField id="CB" label="C. B." variant="outlined" onChange={this.getCodigoBarraValue} className="makeStyles-field"/> 

                            <TextField id="caducidadDias" label="Caducidad días." variant="outlined" onChange={this.getCaducidadDiasValue} className="makeStyles-field"/> 

                            <TextField id="Mascara" label="Máscara" variant="outlined" onChange={this.getMascaraValue} className="makeStyles-field"/> 

                            <FormControlLabel className="makeStyles-field"
                                control={
                                    <Checkbox
                                    //checked={state.checkedB}
                                    onChange={this.getCaducidadObligatoriaValue}
                                    name="CaducidadObligatoria"
                                    color="primary"
                                    />
                                    }
                                    label="¿Caducidad Obligatoria?"
                                    />

                            <FormControlLabel className="makeStyles-field"
                                control={
                                    <Checkbox
                                    //checked={state.checkedB}
                                    onChange={this.getControlCuarentenaValue}
                                    name="ControlCuarentena"
                                    color="primary"
                                    />
                                    }
                                    label="¿Control Cuarentena?"
                                    />

                            <TextField id="Conservacion" label="Conservación" variant="outlined" onChange={this.getConservacionValue} className="makeStyles-field"/> 

                            <TextField id="Ubicacion" label="Ubicación" variant="outlined" onChange={this.getUbicacionValue} className="makeStyles-field"/> 

                            <FormControl variant="outlined" className="makeStyles-field">
                                <ComboBoxModoEtiqueta parentCallback = {this.callbackModoEtiquetaFunction}/>
                            </FormControl>

                            <FormControl variant="outlined" className="makeStyles-field">
                                <ComboBoxSeccion parentCallback = {this.callbackSeccionFunction}/>
                            </FormControl>

                            <TextField id="Observaciones" label="Observaciones" variant="outlined" onChange={this.getObservacionesValue} className="makeStyles-field"/> 

                            <FormControl variant="outlined" className="makeStyles-field">
                                <ComboBoxClasificacionUno parentCallback = {this.callbackClasificacionUnoFunction}/>
                            </FormControl>

                            <FormControl variant="outlined" className="makeStyles-field">
                                <ComboBoxClasificacionDos parentCallback = {this.callbackClasificacionDosFunction}/>
                            </FormControl>

                            <FormControl variant="outlined" className="makeStyles-field">
                                <ComboBoxClasificacionTres parentCallback = {this.callbackClasificacionTresFunction}/>
                            </FormControl>

                            <FormControl variant="outlined" className="makeStyles-field">
                                <ComboBoxClasificacionCuatro parentCallback = {this.callbackClasificacionCuatroFunction}/>
                            </FormControl>

                            <FormControl variant="outlined" className="makeStyles-field">
                                <ComboBoxClasificacionCinco parentCallback = {this.callbackClasificacionCincoFunction}/>
                            </FormControl>

                                                
                            </form>
                            <button type="button" className = "btn btn-green-light btn-pill" onClick = {this.GetData} >Guardar</button>

                        </div>
                    </div>
                    
                    </Container>
                </div>
            );
    }
    }

    export default Parent