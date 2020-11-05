import React, { Component } from 'react'
import styled from 'styled-components';
import { getPosts } from './../../utils/RestMotivoMovimiento';
import DetailMotivoMovimiento from './Details/ViewDetailsMotivoMovimiento'

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;



class ViewMotivoMovimiento extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          posts: [],
          loading: true,
        };
      }
      
      componentDidMount(FMotivoMovimientoId) {

        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('MotivoMovimientoId')
        console.log(token)
        
        const MotivoMovimientoFilters = {
          MotivoMovimientoId : token,
          MotivoMovimientoNombre: ""
        }
        

        
          getPosts(MotivoMovimientoFilters)
      
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
              const { MotivoMovimientoNombre, MotivoMovimientoId} = post;
              
              return (
        
        
                <DetailMotivoMovimiento
                  MotivoMovimientoId={MotivoMovimientoId}
                  MotivoMovimientoNombre={MotivoMovimientoNombre}
                
                />
              );
            });
        
        
          }

          render(FMotivoMovimientoId) {
            
            const { loading } = this.state;
        
            return (
              <div className = "ContentCatalogo"> {this.renderFilters}

                    {loading ? 'buscando...' : this.renderPosts()}

              </div>
              
            );
          }
}

export default ViewMotivoMovimiento;