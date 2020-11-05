import React, { Component } from 'react';
import styled from 'styled-components';
import { getPostsAlmacen } from './../../utils/RestAlmacen';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

        
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



class ComboBoxAlmacenLine extends Component {

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
      console.log('renderpost en combo box almacen ')
      console.log(this.props)
        const { posts } = this.state;
        const {FAlmacenId} = this.props;
        
        
        if(FAlmacenId <= 0)
        {

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
        else
        {
          return posts.map(post => {
            const { AlmacenNombre, AlmacenDireccion, AlmacenId, AlmacenDefault } = post;
            if (AlmacenId == FAlmacenId)
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

        <FormControl variant="" className=""  >

          <TextField
          id="AlmacenLine"
          select
          label=""
         
          onChange={getAlmacenValue}
          SelectProps={{
            native: true,
          }}
          helperText="Almacen donde se deberá guardar"

          InputProps={{
            style:{color: "white"}
          }}

          InputLabelProps={{ 
            style:{color: "white"}
          }}
         
        >
           <option aria-label="None" value="" />
                     {this.renderPosts()}
                    
          </TextField>
                      
        </FormControl>
      
    
    );
  }
}

export default ComboBoxAlmacenLine;