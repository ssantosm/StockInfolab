import React, { Component } from 'react';
import styled from 'styled-components';
import { getPosts } from './../../utils/RestMotivoMovimiento';
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



class ComboBoxMotivoMovimiento extends Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }

  


componentDidMount() {

  const MotivoMovimientoFilters = {
    MotivoMovimientoId : 0,
    MotivoMovimientoNombre: "",
    MotivoMovimientoTipo : this.props.MotivoMovimientoTipo//"",
  }
    console.log({MotivoMovimientoFilters})
    getPosts(MotivoMovimientoFilters)

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
      const { MotivoMovimientoNombre, MotivoMovimientoTipo, MotivoMovimientoId } = post;
 
      return (
        <option value={MotivoMovimientoId}>{MotivoMovimientoNombre}</option>
      );
    });

    
  }

// renderFilters = () => {
//   const classes = useStyles();
  

// }

render() {
    const { loading } = this.state;
    
    const getMotivoMovimientoValue = event => {
      const MotivoMovimientoValue = event.target.value;
      this.props.parentCallback(MotivoMovimientoValue)

      //console.log('MotivoMovimientoValue: ' + MotivoMovimientoValue);

    }

    return (
        
     <div>

         <tbody class="jss539">
         <FormControl variant="outlined" className="" fullWidth={true}>
             <InputLabel htmlFor="outlined-age-native-simple" fullWidth={true}>Motivo Movimiento</InputLabel>
                        <Select
                        native
                        fullWidth={true}
                       // value={state.Tipo}
                        onChange={getMotivoMovimientoValue}
                        label="MotivoMovimiento"
                        inputProps={{
                        name: 'MotivoMovimiento',
                        id: 'outlined-age-native-simple',
                        }}
                        >
                     
                     <option aria-label="None" value="" />
                      {loading ? 'buscando...' : this.renderPosts()}
                      </Select>
                      
             </FormControl>
        </tbody>
     </div>
      
    
    );
  }
}

export default ComboBoxMotivoMovimiento;