import React, { Component } from 'react';
import styled from 'styled-components';
import { getPosts } from '../../utils/RestUnidadMedida';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

        
/*const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  background-color: transparent;
  
`;*/

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));



const  ComboBoxUnidadMedidaConsumo = React.memo(class ComboBoxUnidadMedidaConsumo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      ProductoUnidadMedidaIdConsumoValue : this.props.ProductoUnidadMedidaIdConsumoValue,
    };
   
  }


componentDidMount() {

  const UnidadMedidaFilters = {
    UnidadMedidaId : 0,
    UnidadMedidaNombre: ""
  }

    getPosts(UnidadMedidaFilters)

      .then((res) => {
        this.setState({
          posts: res.data,
          loading: false,
        });
      })
      .catch((err) => console.log(err));

     
  }

renderPosts = () => {
    const { posts } = this.state;
    const {FProductoUnidadMedidaIdConsumo} = this.props
    
    return posts.map(post => {

      const { UnidadMedidaNombre, UnidadMedidaId } = post;

      if(UnidadMedidaId == FProductoUnidadMedidaIdConsumo)
      {
        return(
          <option selected value={UnidadMedidaId}>{UnidadMedidaNombre}</option>
        )
        
      }
      else
      {
      return (
        <option value={UnidadMedidaId}>{UnidadMedidaNombre}</option>
      );
      }
    });

    
  }

// renderFilters = () => {
//   const classes = useStyles();
  

// }

render() {
    const { loading } = this.state;
    
    const getUnidadMedidaValue = event => {
      const UnidadMedidaValue = event.target.value;
      this.props.parentCallback(UnidadMedidaValue)

    }

    return (

      <FormControl variant="" className=""  fullWidth = {true}>

        
        <InputLabel htmlFor="outlined-age-native-simple" >Proveedor</InputLabel>
                        <Select
                        id="UnidadMedidaIdConsumo"
                        native
                        onChange={getUnidadMedidaValue}
                        label="Consumo"
                        // inputProps={{ style:{color: "white"} }}
                        // InputLabelProps={{ 
                        //   style:{color: "white"}
                        // }}
                        >

                      <option aria-label="None" value={0} />
                      {this.renderPosts()}
                      </Select>
                      <FormHelperText>Modo en el que se consume el producto</FormHelperText>
                      


      {/* <TextField
      id="UnidadMedidaConsumo"
      select
      label="Consumo"
     
      onChange={getUnidadMedidaValue}
      SelectProps={{
        native: true,
      }}
      helperText="Modo en el que se consume"

      InputProps={{
        style:{color: ""}
      }}

      InputLabelProps={{ 
        style:{color: ""}
      }}
     
    >
       <option aria-label="None" value="" />
                 {this.renderPosts()}
                
      </TextField> */}
                  
    </FormControl>

      
    
    );
  }
}
)

export default ComboBoxUnidadMedidaConsumo;