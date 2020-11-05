import React from 'react';
import './styles.css';
import PeopleIcon from '@material-ui/icons/People';
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import ClassIcon from '@material-ui/icons/Class';
import ReceiptIcon from '@material-ui/icons/Receipt';
import {Link} from 'react-router-dom';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';
import WidgetsIcon from '@material-ui/icons/Widgets';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import FolderIcon from '@material-ui/icons/Folder';


const Menu = () =>
(
    <div className = "MenuLeft">
        <Link to = "/Kardex">
            <div className = "MenuItem" onClick={changeBackground} onMouseLeave={changeBackgroundNormal} onClick={handleClick()}>
                <SettingsBackupRestoreIcon style={{ color: "#cacfd2", fontSize: "40px"}} />
                <p className = "TittleMenu">INVENTARIO</p>
            </div>
        </Link>
        <Link to = "/CatalogoPedidos">
            <div className = "MenuItem" onClick={changeBackground} onMouseLeave={changeBackgroundNormal} onClick={handleClick()}>
                <FolderIcon style={{ color: "#cacfd2", fontSize: "40px"}} />
                <p className = "TittleMenu">PEDIDOS</p>
            </div>
        </Link>

         <Link to = "/CatalogoProveedores">
            <div className = "MenuItem" onClick={changeBackground} onMouseLeave={changeBackgroundNormal} onClick={handleClick()}>
                <PeopleIcon style={{ color: "#cacfd2", fontSize: "40px"}} />
                <p className = "TittleMenu">Proveedores</p>
            </div>
        </Link>
        <Link to = "/CatalogoAlmacenes">
            <div className = "MenuItem"  onClick={changeBackground} onMouseLeave={changeBackgroundNormal}>
                <LocalConvenienceStoreIcon style={{ color: "#cacfd2", fontSize: "40px"}} />
                <p className = "TittleMenu">Almacén</p>
            </div>
        </Link>

        <Link to = "/CatalogoUnidadMedida">
            <div className = "MenuItem"  onClick={changeBackground} onMouseLeave={changeBackgroundNormal}>
                <BlurLinearIcon style={{ color: "#cacfd2", fontSize: "40px"}} />
                <p className = "TittleMenu">UNIDAD DE MEDIDA</p>
            </div>
        </Link>

        <Link to = "/CatalogoMotivoMovimiento">
            <div className = "MenuItem"  onClick={changeBackground} onMouseLeave={changeBackgroundNormal}>
                <OpenWithIcon style={{ color: "#cacfd2", fontSize: "40px"}} />
                <p className = "TittleMenu">Tipo de movimientos</p>
            </div>
        </Link>

        <Link to = "/CatalogoClasificacion">
            <div className = "MenuItem"  onClick={changeBackground} onMouseLeave={changeBackgroundNormal}>
                <ClassIcon style={{ color: "#cacfd2", fontSize: "40px"}} />
                <p className = "TittleMenu">Clasificación</p>
            </div>
        </Link>


        <div className = "MenuItem"  onClick={changeBackground} onMouseLeave={changeBackgroundNormal}>
            <ReceiptIcon style={{ color: "#cacfd2", fontSize: "40px"}} />
            <p className = "TittleMenu">Grupos</p>
        </div>

        <Link to = "/CatalogoProducto">
            <div className = "MenuItem"  onClick={changeBackground} onMouseLeave={changeBackgroundNormal}>
                <WidgetsIcon style={{ color: "#cacfd2", fontSize: "40px"}} />
                <p className = "TittleMenu">Productos</p>
            </div>
        </Link>



        

    </div>
)

function changeBackground(e) {
  
    
  }

  function changeBackgroundNormal(e) {
    
  }


  function handleClick(e) {
 
   
  }
  
export default Menu;