import React, { Component } from 'react'
import styled from 'styled-components';
import { getPosts } from './../../utils/RestProveedor';
import DetailProveedor from './Details/UpdateDetailsProveedor'

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;



class ViewProveedor extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          posts: [],
          loading: true,
        };
      }
      
      componentDidMount(FProveedorId) {

        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('ProveedorId')
 
        
        const ProveedorFilters = {
          ProveedorId : token,
          ProveedorNombre: "",
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
              const { ProveedorId, ProveedorNombre, ProveedorDireccion, ProveedorRazonSocial, ProveedorTelefono, ProveedorRepresentanteLegal} = post;
              
              return (
                <div>
                  <Container> 
                  <div className = "row no-margin">
                    <div className = "dashboard-title-column">
                      <span className = "pull-left dashboard-title">
                        Modificar proveedor {ProveedorNombre}
                      </span>
                    </div>
                  </div>

                <div className = "cardNewRegistro">
                  <div className = "jss1 jss5 jss2">
                    <DetailProveedor
                      ProveedorId={ProveedorId}
                      ProveedorNombre={ProveedorNombre}
                      ProveedorDireccion={ProveedorDireccion}
                      ProveedorRazonSocial = {ProveedorRazonSocial}
                      ProveedorTelefono = {ProveedorTelefono}
                      ProveedorRepresentanteLegal = {ProveedorRepresentanteLegal}
                  
                    />
                  </div>
                </div>
                
                </Container>
                </div>

              );
            });
        
        
          }

          render(FProveedorId) {
            
            const { loading } = this.state;
        
            const getProveedorValue = event => {
              const ProveedorValue = event.target.value;
              
              const ProveedorFilters = {
                ProveedorId : 1,
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
              <div> {this.renderFilters}

                    {loading ? 'buscando...' : this.renderPosts()}

              </div>
              
            );
          }
}

export default ViewProveedor;