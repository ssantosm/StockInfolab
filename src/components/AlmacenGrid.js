import React from 'react';
import styled from 'styled-components';
import MenuPopupState from '../MenuGrids/MenuAlmacen'

/*const Container = styled.div`
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
-webkit-box-pack: space-around;
-webkit-justify-content: space-around;
-ms-flex-pack: space-around;
justify-content: space-around;
-webkit-flex-wrap: wrap;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
width: 100%;
background-color: transparent;
border-bottom: 1px solid gray;

`;*/

const AlmacenGrid = ({ key, title, body, Id }) => {
  return (

   

    <tr class="jss521 jss523">
      <td className = "jss526 jss528 jss532">
        <MenuPopupState FAlmacenId ={Id} />
      </td>
      <td className = "jss526 jss528 jss532"><p>{title}</p></td>
      <td className = "jss526 jss528 jss532"><p>{body}</p></td>
    </tr>

  );
};
export default AlmacenGrid;