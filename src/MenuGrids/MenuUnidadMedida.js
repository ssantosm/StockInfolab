import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom';

const MenuPopupState = ({FUnidadMedidaId}) => {
  const UnidadMedidaId = FUnidadMedidaId;
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="" color="" {...bindTrigger(popupState)}>
            <MoreVertIcon/>
          </Button>
          <Menu {...bindMenu(popupState)}>
          <Link 
          to ={{
              pathname:"/ViewUnidadMedida",
              search: "UnidadMedidaId=" + FUnidadMedidaId,
             }}> 
            <MenuItem onClick={popupState.close}>Visualiar</MenuItem>
          </Link>

             <Link 
          to ={{
              pathname:"/UpdateUnidadMedida",
              search: "UnidadMedidaId=" + FUnidadMedidaId,
             }}> 
            <MenuItem onClick={popupState.close}>Modificar</MenuItem>
          </Link>

          </Menu>
          
          
          
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default MenuPopupState;