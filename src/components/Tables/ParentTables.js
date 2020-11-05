import React, { Component } from 'react';
import styled from 'styled-components';
import ComboBoxAlmacen from './../../containers/ComboBox-Data/ComboBoxAlmacen'
import { getPosts } from './../../utils/RestKardex';
import { makeStyles } from '@material-ui/core/styles';


import BarColorExistencias from './../BarColorExistencias';
import { getPostsAlmacen } from './../../utils/RestAlmacen';

import CollapsibleTable from './CollapsibleTable'

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  

class Kardex extends Component {
    constructor(props) {
        super(props);
        this.state = {
          posts: [],
          loading: true,
        };
      }

state = { messageAlmacen: "" }
    callbackAlmacenFunction = (AlmacenData) => {
        this.setState({messageAlmacen: AlmacenData})
        const AlmacenValue = this.state.messageAlmacen

        const KardexFilters = {
            AlmacenId : AlmacenData
            }
            
        getPosts(KardexFilters)
        .then((res) => {
         


   
          const color = res.data.map(Response => {
            const { ProductoColorExistencia } = Response;
      
            return {...Response,color: <BarColorExistencias ProductoColorExistencia = {ProductoColorExistencia}></BarColorExistencias>}

        })
          
          this.setState({
            //posts: res.data,
            posts : color,
            loading: false,
          });
         
        })
        .catch((err) => console.log("Error: " + err));
    }

   

    

componentDidMount() {

  const AlmacenFilters = {
    AlmacenId : 0,
    AlmacenNombre: "",
    MostrarDefault: true
  }
  
  getPostsAlmacen(AlmacenFilters)
  .then((res) => {
    this.setState({
        posts: res.data,
        loading: false,
       
      }
     
      );

      
      const { posts } = this.state;
     

      posts.map(post => {
        const { AlmacenId} = post;

      

        const KardexFilters = {
          AlmacenId : AlmacenId
          }

          getPosts(KardexFilters)
          .then((res) => {

               
          const color = res.data.map(Response => {
            const { ProductoColorExistencia } = Response;
      
            return {...Response,color: <BarColorExistencias ProductoColorExistencia = {ProductoColorExistencia}></BarColorExistencias>}

        })
          
          this.setState({
            //posts: res.data,
            posts : color,
            loading: false,
          });

           /* this.setState({
                posts: res.data,
                loading: false,
              });
               */
            }
           
            )
            .catch((err) => console.log(err));
      })
      
    })
    .catch((err) => console.log(err));
 
}




renderPosts = () => {
    const { posts } = this.state;

    return posts.map(post => {
      const { ProductoNombre, ProductoId, ProductoStockMinimo, CantidadExistente, ProductoStockMaximo, ProductoPuntoPedido, ProductoPuntoRelleno} = post;
      return (
        <div></div>
        /*
        <KardexGrid
          key={ProductoId}
          ProductoNombre = {ProductoNombre}
          CantidadExistente = {CantidadExistente}
          ProductoStockMinimo={ProductoStockMinimo}
          ProductoStockMaximo = {ProductoStockMaximo}
          ProductoPuntoPedido = {ProductoPuntoPedido}
          ProductoPuntoRelleno = {ProductoPuntoRelleno}
          
        />*/
      );
    });
}

//   renderFilters = () => {
//     const classes = useStyles();
// }



  render() {

    const { loading } = this.state;

    
    const {posts} = this.state;


    const getproductoValue = event => {
      const productoValue = event.target.value;
      
      const KardexFilters = {
        AlmacenId : 0
        
      }
    
        
        getPosts(KardexFilters)
        .then((res) => {
          
          this.setState({
            posts: res.data,
            loading: false,
          });
        })
        .catch((err) => console.log("Error: " + err));

    }

    return (
                <div>
                    <Container>
                        <div className = "ContentCatalogo"> {this.renderFilters}

                            <div className = "jss1 jss5 jss2">
                                <ComboBoxAlmacen parentCallback = {this.callbackAlmacenFunction}/>
                            </div>

                        </div>

                    
                    <CollapsibleTable
                    posts = {posts}
                   
                    />
                    
                    </Container >
                </div>
            );
        }
    }
export default Kardex;