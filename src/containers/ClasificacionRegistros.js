import React, { Component } from 'react';
import ClasificacionGrid from '../components/ClasificacionGrid';
import styled from 'styled-components';
import { getPosts } from '../utils/RestClasificacion';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


        
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



class ClasificacionRegistros extends Component {
  
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
    ClasificacionOrden: 0
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
    
    return posts.map(post => {
      const { ClasificacionNombre, ClasificacionOrden, ClasificacionId } = post;
      
      return (
       
          
        <ClasificacionGrid
          key={ClasificacionId}
          Id = {ClasificacionId}
          title={ClasificacionNombre}
          body={ClasificacionOrden}
        />
      );
    });

    
  }

// renderFilters = () => {
//   const classes = useStyles();
  

// }

render() {
    const { loading } = this.state;

    const getClasificacionValue = event => {
      const ClasificacionValue = event.target.value;
      
      const ClasificacionFilters = {
        ClasificacionId : 0,
        ClasificacionNombre: ClasificacionValue
      }
    
        
        getPosts(ClasificacionFilters)
        .then((res) => {

          this.setState({
            posts: res.data,
            loading: false,
          });
        })
        .catch((err) => console.log("Error: " + err));

    }


    
    return (
      <div className = "ContentCatalogo"> {this.renderFilters}

        <div className = "jss1 jss5 jss2">
          <div>
            <TextField id="Clasificacion" label="Motivo Movimiento" onChange={getClasificacionValue}/>
            
          </div>

        </div>

     
        
        <div className = "jss1 jss5 jss2">
             
           <table class="jss519">
            
                <thead class="jss520">
                        <th className = "jss526 jss527 jss534"></th>
                        <th className = "jss526 jss527 jss534">Motivo Movimiento</th>
                        <th className = "jss526 jss527 jss534">Órden</th>
                 </thead>



                 <tbody class="jss539">
                      {loading ? 'buscando...' : this.renderPosts()}
                 </tbody>
                  
               
                     
       
               
            </table>
          </div>
        </div>
      
    );
  }
}

export default ClasificacionRegistros;