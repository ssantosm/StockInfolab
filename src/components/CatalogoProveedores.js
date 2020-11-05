import React, { Component } from 'react';
import styled from 'styled-components';
import ProveedorRegistros from '../containers/ProveedorRegistros';
import ButtonNew from './Buttons/ButtonNewRegistro';


const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;


class CatalogoProveedores extends Component {
  render() {
    return (
      <div>
      <Container>
        <div className = "dashboard-title-column">
             <div className = "row no-margin">
                 <div className = "col-md-6 col-sm-6 col-xs-12 dashboard-title-column">
                   <span className = "pull-left dashboard-title">
                       Catálogo proveedores
                   </span>
                 </div>
               </div>

   

         <div className = "no-padding col-md-3 col-sm-3 col-xs-12 pull-right">
               <ButtonNew
               UrlButton = {"/NuevoProveedor"}
               TittleButton = {"Agregar proveedor"}
               />
               
         </div>
         
       </div>
       
       <ProveedorRegistros />
     </Container>
     </div>
    );
  }
}
export default CatalogoProveedores;