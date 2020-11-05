import React, { Component } from 'react'
import styled from 'styled-components';
import { getPosts } from './../../utils/RestUnidadMedida';
import DetailUnidadMedida from './Details/UpdateDetailsUnidadMedida'

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
              const { UnidadMedidaId, UnidadMedidaNombre} = post;
              console.log('UnidadMedidaId in render post: ' + UnidadMedidaId)
              return (
        
                <div>
                <Container> 

                <div className = "row no-margin">
                    <div className = "dashboard-title-column">
                      <span className = "pull-left dashboard-title">
                        Modificar Unidad Medida {UnidadMedidaNombre}
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
        
            const getUnidadMedidaValue = event => {
              const UnidadMedidaValue = event.target.value;
              
              const UnidadMedidaFilters = {
                UnidadMedidaId : 1,
                UnidadMedidaNombre: UnidadMedidaValue
              }
            
                
                getPosts(UnidadMedidaFilters)
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

export default ViewUnidadMedida;