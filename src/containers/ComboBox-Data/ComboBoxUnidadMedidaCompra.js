import React, { Component } from 'react';
import styled from 'styled-components';
import { getPosts } from './../../utils/RestUnidadMedida';
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



class ComboBoxUnidadMedidaCompra extends Component {


  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
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
    const {FProductoUnidadMedidaIdCompra} = this.props
    console.log('Combo unidad medida compra')
    console.log(this.props)
      
    return posts.map(post => {

      const { UnidadMedidaNombre, UnidadMedidaId } = post;

      if(UnidadMedidaId == FProductoUnidadMedidaIdCompra)
      {
        return (
          <option selected value={UnidadMedidaId}>{UnidadMedidaNombre}</option>
        );
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
      const UnidadMedidaCompraValue = event.target.value;
      this.props.parentCallback(UnidadMedidaCompraValue)

    }

    return (

      
      <FormControl variant="" className=""  fullWidth>

        <Select
                        id="UnidadMedidaCompra"
                        native
                        onChange={getUnidadMedidaValue}
                        label="Compra"
                        // inputProps={{ style:{color: "white"} }}
                        InputLabelProps={{ 
                          // style:{color: "white"}
                        }}
                        >

                      <option aria-label="None" value={0} />
                      {this.renderPosts()}
                      </Select>
                      <FormHelperText>Modo en que se compra el producto</FormHelperText>
                  
    </FormControl>
      
    
    );
  }
}

export default ComboBoxUnidadMedidaCompra;