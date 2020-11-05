import React, { Component } from 'react'
import styled from 'styled-components';
import { getPosts } from './../../utils/RestUnidadMedida';
import DetailUnidadMedida from './Details/ViewDetailsUnidadMedida'

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;



class ViewUnidadMedida extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          posts: [],
          loading: true,
        };
      }
      
      componentDidMount(FUnidadMedidaId) {

        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('UnidadMedidaId')
        console.log(token)
        
        const UnidadMedidaFilters = {
          UnidadMedidaId : token,
          UnidadMedidaNombre: ""
        }
        

        
          getPosts(UnidadMedidaFilters)
      
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
              const { UnidadMedidaNombre, UnidadMedidaId} = post;
              
              return (
        
                <div>
                  <Container> 
                  <div className = "row no-margin">
                  <div className = "dashboard-title-column">
                  <span className = "pull-left dashboard-title">
                    Detalle Unidad Medida {UnidadMedidaNombre}
                  </span>
                  </div>
                  </div>

                <div className = "cardNewRegistro">
                <div className = "jss1 jss5 jss2">
                <DetailUnidadMedida
                  UnidadMedidaId={UnidadMedidaId}
                  UnidadMedidaNombre={UnidadMedidaNombre}
                
                />
                </div>
                </div>
                </Container>
                </div>
              );
            });
        
        
          }

          render(FUnidadMedidaId) {
            
            const { loading } = this.state;
        
            return (
              <div> {this.renderFilters}

                    {loading ? 'buscando...' : this.renderPosts()}

              </div>
              
            );
          }
}

export default ViewUnidadMedida;