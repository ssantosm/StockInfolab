import React, { Component } from 'react';
import styled from 'styled-components';
import { getPosts } from './../../utils/RestSeccion';
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



class ComboBoxSeccion extends Component {


  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }


componentDidMount() {

  const SeccionFilters = {
    SeccionId : 0,
    SeccionNombre: ""
  }

    getPosts(SeccionFilters)

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
    const {FSeccionId} = this.props
    
    return posts.map(post => {
      const { SeccionNombre, SeccionDireccion, SeccionId } = post;
 
      if(SeccionId == FSeccionId)
      {
        return (
          <option selected value={SeccionId}>{SeccionNombre}</option>
        );
      }
      else
      {
      return (
        <option value={SeccionId}>{SeccionNombre}</option>
      );
      }
    });

    
  }

// renderFilters = () => {
//   const classes = useStyles();
  

// }

render() {
    const { loading } = this.state;
    
    const getSeccionValue = event => {
      const SeccionValue = event.target.value;
      this.props.parentCallback(SeccionValue)

      //console.log('SeccionValue: ' + SeccionValue);

    }

    return (
        
     <div>
          <FormControl variant="outlined" className="" fullWidth>
           
           <InputLabel htmlFor="" >Sección</InputLabel>
                      <Select
                      id="Secciond"
                      native
                      onChange={getSeccionValue}
                      label="Proveedor"
                     
                      >

                    <option aria-label="None" value={0} />
                    {this.renderPosts()}
                    </Select>
           </FormControl>
     </div>
      
    
    );
  }
}

export default ComboBoxSeccion;