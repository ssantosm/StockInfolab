import React, { Component } from 'react';
import styled from 'styled-components';
import { getPostsAlmacen } from './../../utils/RestAlmacen';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));



class ComboBoxAlmacen extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }


componentDidMount() {

  const AlmacenFilters = {
    AlmacenId : 0,
    AlmacenNombre: "",
    MostrarDefault: false
    
  }

      getPostsAlmacen(AlmacenFilters)

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
    
    
    return posts.map(post => {
      const { AlmacenNombre, AlmacenDireccion, AlmacenId, AlmacenDefault } = post;
      if (AlmacenDefault == true)
      {
        return (
          <option selected value={AlmacenId} >{AlmacenNombre}</option>
        );
      }else
      {
        return (
        <option value={AlmacenId} >{AlmacenNombre}</option>
        );
      }

      this.props.parentCallback(AlmacenId)

    });

    
  }

// renderFilters = () => {
//   const classes = useStyles();
  

// }

render() {
    const { loading } = this.state;
    
    const getAlmacenValue = event => {
      const AlmacenValue = event.target.value;
      this.props.parentCallback(AlmacenValue)

    }


    return (
        
    //  <div>

         
         <FormControl variant="outlined" className="makeStyles-field" fullWidth>
           
             <InputLabel htmlFor="outlined-age-native-simple" >Almacén</InputLabel>
                        <Select
                        native
                        onChange={getAlmacenValue}
                        label="Almacen"
                        inputProps={{
                        name: 'Almacen',
                        id: 'outlined-age-native-simple',
                        
                        }}
                        >

                      <option aria-label="None" value={0} />
                      {this.renderPosts()}
                      </Select>
                      
             </FormControl>
  
    //  </div>
      
    
    );
  }
}

export default ComboBoxAlmacen;