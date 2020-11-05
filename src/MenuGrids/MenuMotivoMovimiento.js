import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom';

const MenuPopupState = ({FMotivoMovimientoId}) => {
  console.log("FMotivoMovimientoId en menu: " + FMotivoMovimientoId)
  const MotivoMovimientoId = FMotivoMovimientoId;
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
              pathname:"/ViewMotivoMovimiento",
              search: "MotivoMovimientoId=" + FMotivoMovimientoId,
             }}> 
            <MenuItem onClick={popupState.close}>Visualiar</MenuItem>
          </Link>

             <Link 
          to ={{
              pathname:"/UpdateMotivoMovimiento",
              search: "MotivoMovimientoId=" + FMotivoMovimientoId,
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