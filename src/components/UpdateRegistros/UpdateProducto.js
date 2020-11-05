import React, { Component } from 'react'
import styled from 'styled-components';
import { getPosts } from './../../utils/RestProducto';
import DetailProducto from './Details/UpdateDetailsProducto'

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;



class ViewProducto extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          posts: [],
          loading: true,
        };
      }
      
      componentDidMount(FProductoId) {

        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('ProductoId')
 
        
        const ProductoFilters = {
          ProductoId : token,
          ProductoNombre: ""
        }
        

        
          getPosts(ProductoFilters)
      
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
              const { ProductoId, ProductoNombre, ProductoTipo, ProductoCodigoProveedor, 
                ProductoPrecioCompra, ProductoPrecioVenta, ProductoIva, ProductoStockMinimo, ProductoStockMaximo,
                ProductoPuntoPedido, ProductoPuntoRelleno, ProductoUnidadMedidaIdCompra, ProductoUnidadMedidaIdConsumo, ProductoRatio} = post;
              
              return (
                <div>
                  <Container> 
                  <div className = "row no-margin">
                    <div className = "dashboard-title-column">
                      <span className = "pull-left dashboard-title">
                        Modificar Producto {ProductoNombre}
                      </span>
                    </div>
                  </div>

                <div className = "cardNewRegistro">
                  <div className = "jss1 jss5 jss2">
                    <DetailProducto
                      ProductoId={ProductoId}
                      ProductoNombre={ProductoNombre}
                      ProductoTipo = {ProductoTipo}
                      ProductoCodigoProveedor = {ProductoCodigoProveedor}
                      ProductoPrecioCompra = {ProductoPrecioCompra}
                      ProductoPrecioVenta = {ProductoPrecioVenta}
                      ProductoIva = {ProductoIva}
                      ProductoStockMinimo = {ProductoStockMinimo}
                      ProductoStockMaximo = {ProductoStockMaximo}
                      ProductoPuntoPedido = {ProductoPuntoPedido}
                      ProductoPuntoRelleno = {ProductoPuntoRelleno}
                      ProductoUnidadMedidaIdCompra = {ProductoUnidadMedidaIdCompra}
                      ProductoUnidadMedidaIdConsumo = {ProductoUnidadMedidaIdConsumo}
                      ProductoRatio = {ProductoRatio}
                    />
                  </div>
                </div>
                
                </Container>
                </div>

              );
            });
        
        
          }

          render(FProductoId) {
            
            const { loading } = this.state;
        
            const getProductoValue = event => {
              const ProductoValue = event.target.value;
              
              const ProductoFilters = {
                ProductoId : 1,
                ProductoNombre: ProductoValue
              }
            
                
                getPosts(ProductoFilters)
                .then((res) => {
        
                  this.setState({
                    posts: res.data,
                    loading: false,
                  });
                })
                .catch((err) => console.log("Error: " + err));
        
            }
        
        
        
            return (
              <div> {this.renderFilters}

                    {loading ? 'buscando...' : this.renderPosts()}

              </div>
              
            );
          }
}

export default ViewProducto;