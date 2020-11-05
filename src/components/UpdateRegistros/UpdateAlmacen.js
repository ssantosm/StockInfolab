import React, { Component } from 'react'
import styled from 'styled-components';
import { getPostsAlmacen } from './../../utils/RestAlmacen';
import DetailAlmacen from './Details/UpdateDetailsAlmacen'

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;



class ViewAlmacen extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          posts: [],
          loading: true,
        };
      }
      
      componentDidMount(FAlmacenId) {

        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('AlmacenId')
     
        
        const AlmacenFilters = {
            AlmacenId : token,
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
              const { AlmacenId, AlmacenNombre, AlmacenDireccion, AlmacenDefault} = post;
              
              return (
        
                
                <div>
                  <Container> 
                  <div className = "row no-margin">
                    <div className = "dashboard-title-column">
                      <span className = "pull-left dashboard-title">
                        Modificar Almacén {AlmacenNombre}
                      </span>
                    </div>
                  </div>

                  
                <div className = "cardNewRegistro">
                  <div className = "jss1 jss5 jss2">
                    <DetailAlmacen
                      AlmacenId={AlmacenId}
                      AlmacenNombre={AlmacenNombre}
                      AlmacenDireccion={AlmacenDireccion}
                      AlmacenDefault = {AlmacenDefault}
                    />
                  </div>
                </div>

                  </Container>
                </div>
              );
            });
        
        
          }

          render(FAlmacenId) {
            
            const { loading } = this.state;
        
            const getAlmacenValue = event => {
              const AlmacenValue = event.target.value;
              
              const AlmacenFilters = {
                AlmacenId : 1,
                AlmacenNombre: AlmacenValue,
                MostrarDefault: false,
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
              <div> {this.renderFilters}

                    {loading ? 'buscando...' : this.renderPosts()}

              </div>
              
            );
          }
}

export default ViewAlmacen;