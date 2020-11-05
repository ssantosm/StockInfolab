import React, { Component } from 'react';
import styled from 'styled-components';
import { getPosts } from '../../utils/RestProveedor';
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

  combo: {

  },
}));



class ComboBoxProveedorLine extends Component {


  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      //FProveedorId: this.props.FProveedorId
    };
  }


componentDidMount() {

  const ProveedorFilters = {
    ProveedorId : 0,
    ProveedorNombre: "",
    ProductoCodigoBarra:""
  }

    getPosts(ProveedorFilters)

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
    const {FProveedorId} = this.props

    
    return posts.map(post => {
      const { ProveedorNombre, ProveedorDireccion, ProveedorId } = post;
      
      if(ProveedorId == FProveedorId)
      {
        return (
          <option selected value={ProveedorId}>{ProveedorNombre}</option>
        );
      }else
      {
        return (
          <option value={ProveedorId}>{ProveedorNombre}</option>
        );
      }

      this.props.parentCallback(ProveedorId)

    });

    
  }

// renderFilters = () => {
//   const classes = useStyles();
  

// }

render() {
    const { loading } = this.state;
    
    const getProveedorValue = event => {
      const ProveedorValue = event.target.value;
      this.props.parentCallback(ProveedorValue)


    }

    return (

      <FormControl variant="" className="" fullWidth>
           
             <InputLabel htmlFor="outlined-age-native-simple" >Proveedor</InputLabel>
                        <Select
                        id="ProveedorIdLine"
                        native
                        onChange={getProveedorValue}
                        label="Proveedor"
                        inputProps={{ style:{color: "white"} }}
                        InputLabelProps={{ 
                          style:{color: "white"}
                        }}
                        >

                      <option aria-label="None" value={0} />
                      {this.renderPosts()}
                      </Select>
                      <FormHelperText>Proveedor que surte el producto</FormHelperText>
                      
             </FormControl>

        // <FormControl variant="" className=""  >

        //   <TextField
        //   id="ProveedorLine"
        //   select
        //   label="Proveedor"
         
        //   onChange={getProveedorValue}
        //   SelectProps={{
        //     native: true,
        //   }}
        //   helperText="Proveedor que surte el producto"

        //   InputProps={{
        //     style:{color: "white"}
        //   }}

        //   InputLabelProps={{ 
        //     style:{color: "white"}
        //   }}

          
         
        // >
        //    <option aria-label="None" value="" />
        //              {this.renderPosts()}
                    
        //   </TextField>
                      
        //      </FormControl>
      
    
    );
  }
}


export default ComboBoxProveedorLine;