import React, { Component } from 'react';
import ProveedorGrid from '../components/ProveedorGrid';
import styled from 'styled-components';
import { getPosts } from '../utils/RestProveedor';
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



class ProveedorRegistros extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }


componentDidMount() {

  const ProveedorFilters = {
    ProveedorId : 0,
    ProveedorNombre: "",
    ProductoCodigoBarra: "",
    ProductoCodigoBarra: ""
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

    return posts.map(post => {
      const { ProveedorNombre, ProveedorDireccion, ProveedorId } = post;
     
      return (


        <ProveedorGrid
          key={ProveedorId}
          Id = {ProveedorId}
          title={ProveedorNombre}
          body={ProveedorDireccion}
        />
      );
    });


  }

  // renderFilters = () => {
  //   const classes = useStyles();
    
  
  // }

render() {
    const { loading } = this.state;

    const getProveedorValue = event => {
      const ProveedorValue = event.target.value;
      
      const ProveedorFilters = {
        ProveedorId : 0,
        ProveedorNombre: ProveedorValue
      }
    
        
        getPosts(ProveedorFilters)
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
          <TextField id="Proveedor" label="Proveedor" onChange={getProveedorValue}/>
          
        </div>

      </div>



        <div className = "jss1 jss5 jss2">

           <table class="jss519">
            
                <thead class="jss520">
                        <th className = "jss526 jss527 jss534"></th>
                        <th className = "jss526 jss527 jss534">Proveedor</th>
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

export default ProveedorRegistros;