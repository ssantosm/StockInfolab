import React, { Component } from 'react';
import styled from 'styled-components';
import MotivoMovimientoRegistros from '../containers/MotivoMovimientoRegistros';
import ButtonNew from './Buttons/ButtonNewRegistro';


const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;


const CatalogoMotivoMovimiento = () => {
  //render() {
    return (
      <div>
      <Container>
         <div className = "dashboard-title-column">
             <div className = "row no-margin">
                 <div className = "col-md-6 col-sm-6 col-xs-12 dashboard-title-column">
                   <span className = "pull-left dashboard-title">
                       Motivo de movimientos
                   </span>
                 </div>
               </div>

   

         <div className = "no-padding col-md-3 col-sm-3 col-xs-12 pull-right">
         <ButtonNew
                UrlButton = {"/NuevoMotivoMovimiento"}
                TittleButton = {"Agregar Movimiento"}
                />
         </div>
         
       </div>
       
       <MotivoMovimientoRegistros />
     </Container>
     </div>
    );
  //}
}
export default CatalogoMotivoMovimiento;