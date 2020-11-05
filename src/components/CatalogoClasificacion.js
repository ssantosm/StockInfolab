import React, { Component } from 'react';
import styled from 'styled-components';
import ClasificacionRegistros from '../containers/ClasificacionRegistros';
import ButtonNew from './Buttons/ButtonNewRegistro';


const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;


const CatalogoClasificacion = () => {
  //render() {
    return (
      <div>
      <Container>
         <div className = "dashboard-title-column">
             <div className = "row no-margin">
                 <div className = "col-md-6 col-sm-6 col-xs-12 dashboard-title-column">
                   <span className = "pull-left dashboard-title">
                       Clasificaciones
                   </span>
                 </div>
               </div>

   

         <div className = "no-padding col-md-3 col-sm-3 col-xs-12 pull-right">
         <ButtonNew
                UrlButton = {"/NuevoClasificacion"}
                TittleButton = {"Agregar Movimiento"}
                />
         </div>
         
       </div>
       
       <ClasificacionRegistros />
     </Container>
     </div>
    );
  //}
}
export default CatalogoClasificacion;