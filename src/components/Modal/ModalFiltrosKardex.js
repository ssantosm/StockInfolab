import React from 'react'
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';

class ModalFiltrosKardex extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            valueFiltroExistencias: this.props.valueFiltroExistencias,//"Todos",
            valueFiltroCaducidad: this.props.valueFiltroCaducidad,
            valueDiasCaduca : this.props.valueDiasCaduca,
            valueFiltroReactivo : this.props.valueFiltroReactivo,
            valueFiltroConsumible : this.props.valueFiltroConsumible,
        }
    }

    render(){

        const getFiltroExistencias = event =>{
            const FiltroExistenciasValue = event.target.value;
            this.setState({valueFiltroExistencias : FiltroExistenciasValue})
            this.props.parentCallbackFiltroExistencias(FiltroExistenciasValue)
        }

        const getFiltroCaducidad = event =>{
            const FiltroCaducidadValue = event.target.value;
            this.setState({valueFiltroCaducidad : FiltroCaducidadValue})
            this.props.parentCallbackFiltroCaducidad(FiltroCaducidadValue)
        }

        const getDiasCaduca = event => {
            const DiasCaducaValue = event.target.value;
            this.setState({valueDiasCaduca : DiasCaducaValue})
            this.props.parentCallbackDiasCaduca(DiasCaducaValue)
        }

        const getfiltroReactivo = event => {
            const FiltroReactivoValue = !this.state.valueFiltroReactivo
            this.setState({ valueFiltroReactivo:  FiltroReactivoValue});
            this.props.parentCallbackFiltroReactivo(FiltroReactivoValue)
        }

        const getfiltroConsumible = event => {

            const FiltroConsumibleValue = !this.state.valueFiltroConsumible
            this.setState({ valueFiltroConsumible:  FiltroConsumibleValue});
            this.props.parentCallbackFiltroConsumible(FiltroConsumibleValue)
            
        }

      

        const valueFiltroExistencias = this.state.valueFiltroExistencias;
        const valueFiltroCaducidad = this.state.valueFiltroCaducidad;
        const valueDiasCaduca = this.state.valueDiasCaduca;
        const valueFiltroReactivo = this.state.valueFiltroReactivo;

        return(
            <div>
            <h4>Existencias</h4>
              <div style = {{paddingLeft:"20%"}}>
                <FormControl component="fieldset">
                 <RadioGroup aria-label="Exitencias" name="Exitencias" value={valueFiltroExistencias} onChange= {getFiltroExistencias}>
                     <FormControlLabel value="Todos" control={<Radio color="primary"/>} label="Todos" />
                     <FormControlLabel value="PMinimo" control={<Radio color="primary"/>} label="Por debajo del punto mínimo" />
                     <FormControlLabel value="PPedido" control={<Radio color="primary"/>} label="Por debajo del punto de pedido" />
                 </RadioGroup>
                </FormControl>
                </div>
             
            <h4>Caducidad</h4>
             <div style = {{paddingLeft:"20%"}}>
             <FormControl component="fieldset">
                 <RadioGroup aria-label="Caducidad" name="Caducidad" value={valueFiltroCaducidad} onChange={getFiltroCaducidad}>
                     <FormControlLabel value="Todos" control={<Radio color="primary"/>} label="Todos" />
                     <FormControlLabel value="Caducados" control={<Radio color="primary"/>} label="Caducados" />
                     <div style = {{display:"flex"}}>
                     <FormControlLabel value="DiasCaduca" control={<Radio color="primary"/>} label="Caducan en:" />
                         <TextField
                         id="CaducidadDias"
                         type="number"
                         onChange = {getDiasCaduca}
                         className="makeStyles-field"
                         value = {valueDiasCaduca}
                         />

                         <p>días</p>
                     </div> 

                  </RadioGroup> 
              </FormControl> 
             </div>

            <h4>Producto</h4>
            <div style = {{paddingLeft:"20%"}}>

                     
            


<FormControl component="fieldset">
      <FormGroup aria-label="position" row>
      <FormControlLabel
            control={<Switch
            color="primary"
            checked={this.state.valueFiltroReactivo}
            onClick={() => getfiltroReactivo('valueFiltroReactivo')}
            value="valueFiltroReactivo"
            label = "Reactivo"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
        />}
          label="Reactivo"
        />

        <FormControlLabel
            control={<Switch
            color="primary"
            checked={this.state.valueFiltroConsumible}
            onClick={() => getfiltroConsumible('valueFiltroConsumible')}
            value="valueFiltroConsumible"
            label = "Reactivo"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
        />}
          label="Consumible"
        />
          </FormGroup>
    </FormControl>
  
             </div>
            
            </div>
        )
    }
}

export default ModalFiltrosKardex;

// const ModalFiltrosKardex = ({CallbackExistenciasFunction}) =>
// {

//   const [valueExistencias, setValueExistencias] = React.useState('Todos');
//   const [valueCaducidad, setValueCaducidad] = React.useState('Todos');

//   const handleChangeExistencias = (event) => { 
//     setValueExistencias(event.target.value);
//     // props.parentCallbackFiltroExistencias(valueExistencias)
//     // props.parentCallbackFiltroExistencias(valueExistencias)
//     // console.log(props)
//     // this.CallbackExistenciasFunction(valueExistencias)
//   };

//   const handleChangeCaducidad = (event) => {
//     setValueCaducidad(event.target.value);
//   };

//     return(
//         <div>
//             <h4>Existencias</h4>
//             <div style = {{paddingLeft:"20%"}}>
//             <FormControl component="fieldset">
//                 <RadioGroup aria-label="Exitencias" name="Exitencias" value={valueExistencias} onChange= {() => CallbackExistenciasFunction("Hola existencias")}>
//                     <FormControlLabel value="Todos" control={<Radio color="primary"/>} label="Todos" />
//                     <FormControlLabel value="PMinimo" control={<Radio color="primary"/>} label="Por debajo del punto mínimo" />
//                     <FormControlLabel value="PPedido" control={<Radio color="primary"/>} label="Por debajo del punto de pedido" />
//                 </RadioGroup>
//             </FormControl>
//             </div>

//             <h4>Caducidad</h4>
//             <div style = {{paddingLeft:"20%"}}>
//             <FormControl component="fieldset">
//                 <RadioGroup aria-label="Exitencias" name="Exitencias" value={valueCaducidad} onChange={handleChangeCaducidad}>
//                     <FormControlLabel value="Todos" control={<Radio color="primary"/>} label="Todos" />
//                     <FormControlLabel value="PMinimo" control={<Radio color="primary"/>} label="Caducados" />
//                     <div style = {{display:"flex"}}>
//                     <FormControlLabel value="PPedido" control={<Radio color="primary"/>} label="Caducan en:" />
//                         <TextField
//                         id="CaducidadDias"
//                         // label="Cantidad"
//                         type="number"
//                         // InputLabelProps={{
//                         //     shrink: true,
//                         // }}
//                         // variant="outlined"
//                         // fullWidth={true}
//                         //onChange = {getCantidad}
//                         className="makeStyles-field"
//                         />

//                         <p>días</p>
//                     </div>

//                 </RadioGroup>
//             </FormControl>
//             </div>

//         </div>
//     );
// }

// export default ModalFiltrosKardex;