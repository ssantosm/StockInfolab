import React from 'react';
import {Link} from 'react-router-dom';


function AddButton(props){
    return(
        <Link to = "/NuevoProveedor">
           <button type="button" className = "btn btn-green-light btn-pill">Agregar almacén</button>
        </Link>
    )
}

export default AddButton;