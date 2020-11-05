import React, { Component } from 'react';
import styled from 'styled-components';
import { getPosts } from './../../utils/RestClasificacion';
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
}));



class ComboBoxClasificacionCuatro extends Component {


  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }


componentDidMount() {

  const ClasificacionFilters = {
    ClasificacionId : 0,
    ClasificacionNombre: "",
    ClasificacionOrden: 4 //Se introduce el tipo de clasificación que se requiera ver
  }

    getPosts(ClasificacionFilters)

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
    const {FProductoClasificacionCuatro} = this.props
    
    
    return posts.map(post => {
      const { ClasificacionNombre, ClasificacionOrden, ClasificacionId } = post;
 
      if(ClasificacionId == FProductoClasificacionCuatro)
      {
        return (
          <option selected value={ClasificacionId}>{ClasificacionNombre}</option>
        );
      }
      else{
        return (
          <option value={ClasificacionId}>{ClasificacionNombre}</option>
        );
      }
      
    });

    
  }

// renderFilters = () => {
//   const classes = useStyles();
  

// }

render() {
    const { loading } = this.state;
    
    const getClasificacionValue = event => {
      const ClasificacionValue = event.target.value;
      this.props.parentCallback(ClasificacionValue)
      //console.log('ClasificacionValue: ' + ClasificacionValue);

    }

    return (

      <FormControl variant="outlined" className="" fullWidth>
           
      <InputLabel htmlFor="outlined-age-native-simple" >Clasificación 4</InputLabel>
                 <Select
                 id="ClasificacionCuatro"
                 native
                 onChange={getClasificacionValue}
                 label="Clasificación 4"
            
                 >

               <option aria-label="None" value={0} />
               {this.renderPosts()}
               </Select>
              
      </FormControl>
        
    //  <div>

         
    //      <FormControl variant="outlined" className="" fullWidth = {true}>
    //          <InputLabel htmlFor="outlined-age-native-simple">Clasificacion 4</InputLabel>
    //                     <Select
    //                     native
    //                    // value={state.Tipo}
    //                     onChange={getClasificacionValue}
    //                     label="Clasificacion"
    //                     inputProps={{
    //                     name: 'Clasificacion',
    //                     id: 'outlined-age-native-simple',
    //                     }}
    //                     >
                     
    //                  <option aria-label="None" value="" />
    //                   {loading ? 'buscando...' : this.renderPosts()}
    //                   </Select>
                      
    //          </FormControl>
       
    //  </div>
      
    
    );
  }
}

export default ComboBoxClasificacionCuatro;