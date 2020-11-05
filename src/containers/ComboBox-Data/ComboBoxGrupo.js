import React, { Component } from 'react';
import styled from 'styled-components';
import { getPosts } from './../../utils/RestGrupo';
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



class ComboBoxGrupo extends Component {


  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }


componentDidMount() {

  const GrupoFilters = {
    GrupoId : 0,
    GrupoNombre: ""
  }

    getPosts(GrupoFilters)

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
    const {FGrupoId} = this.props;
    
    return posts.map(post => {
      const { GrupoNombre, GrupoDireccion, GrupoId } = post;
 
      if(GrupoId == FGrupoId)
      {
        return (
          <option selected value={GrupoId}>{GrupoNombre}</option>
        );
      }
      else{
        return (
          <option value={GrupoId}>{GrupoNombre}</option>
        );

      }

    });

    
  }

// renderFilters = () => {
//   const classes = useStyles();
  

// }

render() {
    const { loading } = this.state;
    
    const getGrupoValue = event => {
      const GrupoValue = event.target.value;
      this.props.parentCallback(GrupoValue)

      //console.log('GrupoValue: ' + GrupoValue);

    }

    return (
        
     <div>

<FormControl variant="outlined" className="" fullWidth>
           
           <InputLabel htmlFor="outlined-age-native-simple" >Grupo</InputLabel>
                      <Select
                      id="GrupoId"
                      native
                      onChange={getGrupoValue}
                      label="Grupo"
                   
                      
                      >

                    <option aria-label="None" value={0} />
                    {this.renderPosts()}
                    </Select>
                    <FormHelperText>Grupo al que pertenece</FormHelperText>
                    
           </FormControl>

        
         {/* <FormControl variant="outlined" className="" fullWidth = {true}>
             <InputLabel htmlFor="outlined-age-native-simple">Grupo</InputLabel>
                        <Select
                        id="GrupoId"
                        native
                       // value={state.Tipo}
                        onChange={getGrupoValue}
                        label="Grupo"
                        inputProps={{
                        name: 'Grupo',
                        id: 'outlined-age-native-simple',
                        }}
                        >
                     
                     <option aria-label="None" value="" />
                      {loading ? 'buscando...' : this.renderPosts()}
                      </Select>
                      
             </FormControl> */}
     
     </div>
      
    
    );
  }
}

export default ComboBoxGrupo;