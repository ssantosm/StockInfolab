import React, { Component } from 'react';
import styled from 'styled-components';
import MaterialTablePedido from './../components/ViewRegistros/MaterialTablePedidos'
import { getPostsPedido } from './../utils/RestPedido';

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;


class CatalogoPedidos extends Component {

    constructor(props) {
        super(props);
        this.state = {
          posts: [],
          loading: true,
          PedidoId : 0,
        };
    }

    async  componentDidMount() {
        
        const PedidoFilters = {
            PedidoId : 0,
            ProveedorId : 0
        }

        await getPostsPedido(PedidoFilters)
        .then((res) => {
            //console.log(res)
            this.setState({
                posts: res.data,
                loading : false,
                PedidoId : 0,
            });

        });
    };

    render() {

    const {posts} = this.state; //Se recupera el posts de lo recibido del rest
    
    return (
      <div>
       <Container>
        <MaterialTablePedido
        posts = {posts}/>
      </Container>
      </div>
    );
  }
}
export default CatalogoPedidos;