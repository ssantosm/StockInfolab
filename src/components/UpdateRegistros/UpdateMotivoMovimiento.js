import React, { Component } from 'react'
import styled from 'styled-components';
import { getPosts } from './../../utils/RestMotivoMovimiento';
import DetailMotivoMovimiento from './Details/UpdateDetailsMotivoMovimiento'

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
              const { MotivoMovimientoId, MotivoMovimientoNombre, MotivoMovimientoTipo} = post;
              return (
        
        
                <DetailMotivoMovimiento
                  MotivoMovimientoId={MotivoMovimientoId}
                  MotivoMovimientoNombre={MotivoMovimientoNombre}
                  MotivoMovimientoTipo = {MotivoMovimientoTipo}
                  
                />
              );
            });
        
        
          }

          render(FMotivoMovimientoId) {
            
            const { loading } = this.state;
        
            const getMotivoMovimientoValue = event => {
              const MotivoMovimientoValue = event.target.value;
              
              const MotivoMovimientoFilters = {
                MotivoMovimientoId : 1,
                MotivoMovimientoNombre: MotivoMovimientoValue
              }
            
                
                getPosts(MotivoMovimientoFilters)
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

                    {loading ? 'buscando...' : this.renderPosts()}

              </div>
              
            );
          }
}

export default ViewMotivoMovimiento;