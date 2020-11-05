import React from 'react';
import styled from 'styled-components';
import MenuPopupState from '../MenuGrids/MenuProducto'
import { Progress } from 'semantic-ui-react'

const KardexGrid = ({key, ProductoNombre, CantidadExistente, ProductoStockMinimo, ProductoStockMaximo, ProductoPuntoPedido, ProductoPuntoRelleno, Id }) => {
  return (

   

    <tr class="jss521 jss523">
      <td className = "jss526 jss528 jss532">
      <MenuPopupState />
      </td>
      <td className = "jss526 jss528 jss532"><p>{ProductoNombre}</p></td>
      <td className = "jss526 jss528 jss532"><p>{CantidadExistente}</p></td>
      <td className = "jss526 jss528 jss532"><p>{ProductoStockMinimo}</p></td>
      <td className = "jss526 jss528 jss532"><p>{ProductoStockMaximo}</p></td>
      <td className = "jss526 jss528 jss532"><p>{ProductoPuntoPedido}</p></td>
      <td className = "jss526 jss528 jss532"><p>{ProductoPuntoRelleno}</p></td>
      
      <td><div className = "Danger-Bar"></div></td>
    </tr>

  );
};
export default KardexGrid;