import React, { Component } from 'react';
import styled from 'styled-components';
import { getPosts } from './../../utils/RestModoEtiqueta';
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



class ComboBoxModoEtiqueta extends Component {


  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }


componentDidMount() {

  const ModoEtiquetaFilters = {
    ModoEtiquetaId : 0,
    ModoEtiquetaNombre: ""
  }

    getPosts(ModoEtiquetaFilters)

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
    const {FModoEtiquetaId} = this.props
    
    return posts.map(post => {
      const { ModoEtiquetaNombre, ModoEtiquetaDireccion, ModoEtiquetaId } = post;

      if(ModoEtiquetaId == FModoEtiquetaId)
      {
        return (
          <option selected value={ModoEtiquetaId}>{ModoEtiquetaNombre}</option>
        );
      }
      else
      {
        return (
          <option value={ModoEtiquetaId}>{ModoEtiquetaNombre}</option>
        );
      }

    });

    
  }

// renderFilters = () => {
//   const classes = useStyles();
  

// }

render() {
    const { loading } = this.state;
    
    const getModoEtiquetaValue = event => {
      const ModoEtiquetaValue = event.target.value;
      this.props.parentCallback(ModoEtiquetaValue)
      //console.log('ModoEtiquetaValue: ' + ModoEtiquetaValue);

    }

    return (
        

      <FormControl variant="outlined" className="" fullWidth>
           
      <InputLabel htmlFor="outlined-age-native-simple" >Modo etiqueta</InputLabel>
                 <Select
                 id="ModoEtiquetaId"
                 native
                 onChange={getModoEtiquetaValue}
                 label="Modo etiqueta"
                 >

               <option aria-label="None" value={0} />
               {this.renderPosts()}
               </Select>
               
      </FormControl> 
    );
  }
}

export default ComboBoxModoEtiqueta;