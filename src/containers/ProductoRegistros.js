import React, { Component } from 'react';
import ProductoGrid from '../components/ProductoGrid';
import styled from 'styled-components';
import { getPosts } from '../utils/RestProducto';
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



class productoRegistros extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }


componentDidMount() {

  const productoFilters = {
    productoId : 0,
    productoNombre: ""
  }

    getPosts(productoFilters)

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
      const { ProductoNombre, ProductoId, ProductoTipo, GrupoNombre} = post;
      
      return (

        
        <ProductoGrid
          key={ProductoId}
          Id = {ProductoId}
          title={ProductoNombre}
          ProductoTipo = {ProductoTipo}
        />
      );
    });


  }

  // renderFilters = () => {
  //   const classes = useStyles();
    
  
  // }

render() {
    const { loading } = this.state;

    const getproductoValue = event => {
      const productoValue = event.target.value;
      
      const productoFilters = {
        productoId : 0,
        productoNombre: productoValue
      }
    
        
        getPosts(productoFilters)
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
          <TextField id="producto" label="producto" onChange={getproductoValue}/>
          
        </div>

      </div>



        <div className = "jss1 jss5 jss2">

           <table class="jss519">
            
                <thead class="jss520">
                        <th className = "jss526 jss527 jss534"></th>
                        <th className = "jss526 jss527 jss534">producto</th>
                        <th className = "jss526 jss527 jss534">Tipo</th>
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

export default productoRegistros;