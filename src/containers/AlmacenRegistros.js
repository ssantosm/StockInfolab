import React, { Component } from 'react';
import AlmacenGrid from '../components/AlmacenGrid';
import styled from 'styled-components';
import { getPostsAlmacen } from '../utils/RestAlmacen';
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



class AlmacenRegistros extends Component {
  
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
      const { AlmacenNombre, AlmacenDireccion, AlmacenId } = post;
      
      return (
        <AlmacenGrid
          key={AlmacenId}
          Id = {AlmacenId}
          title={AlmacenNombre}
          body={AlmacenDireccion}
          
        />
      );
    });

    
  }

// renderFilters = () => {
//   const classes = useStyles();
  

// }

render() {
    const { loading } = this.state;

    const getAlmacenValue = event => {
      const AlmacenValue = event.target.value;
      
      const AlmacenFilters = {
        AlmacenId : 0,
        AlmacenNombre: AlmacenValue
      }
    
        
        getPostsAlmacen(AlmacenFilters)
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
            <TextField id="Almacen" label="Almacén" onChange={getAlmacenValue}/>
            
          </div>

        </div>

     
        
        <div className = "jss1 jss5 jss2">
             
           <table class="jss519">
            
                <thead class="jss520">
                        <th className = "jss526 jss527 jss534"></th>
                        <th className = "jss526 jss527 jss534">Almacén</th>
                        <th className = "jss526 jss527 jss534">Dirección</th>
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

export default AlmacenRegistros;