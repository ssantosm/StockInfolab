import React, { Component } from 'react';
import styled from 'styled-components';
import ProductoRegistros from '../containers/ProductoRegistros';
import ButtonNew from './Buttons/ButtonNewRegistro';
import MaterialTableProducto from './../components/ViewRegistros/MaterialTableProducto'
import { getPosts } from './../utils/RestProducto';

const Container = styled.div`
max-width: 80%;
margin-left: 13%;
margin-top: 25px;
`;



class Catalogoproducto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      PedidoId : 0,
    };
  }

  async  componentDidMount() {
        
    const ProductoFilters = {
      ProductoId : 0,
      ProductoNombre : ""
    }

    await getPosts(ProductoFilters)
    .then((res) => {
        console.log(res)
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
       <MaterialTableProducto
      
        posts = {posts}
       
       />
     </Container>
     </div>
    );
  }
}
export default Catalogoproducto;