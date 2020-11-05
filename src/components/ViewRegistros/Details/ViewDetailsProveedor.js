import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const DetailProveedor = ({ ProveedorId, ProveedorNombre, ProveedorDireccion, ProveedorRazonSocial, ProveedorTelefono, ProveedorRepresentanteLegal}) => {

  const classes = useStyles();

    return (
  
     
  <div>
      

        <form className={classes.root} noValidate autoComplete="off">
    
          <div>
  
            <TextField
              disabled
              id="Proveedor"
              label="Proveedor"
              defaultValue={ProveedorNombre}
              variant="outlined"
            />

            <TextField
              disabled
              id="Direccion"
              label="Dirección"
              defaultValue={ProveedorDireccion}
              variant="outlined"
            />

            <TextField
              disabled
              id="RazonSocial"
              label="Razón Social"
              defaultValue={ProveedorRazonSocial}
              variant="outlined"
            />

            <TextField
              disabled
              id="Telefono"
              label="Teléfono"
              defaultValue={ProveedorTelefono}
              variant="outlined"
            />

            <TextField
              disabled
              id="RepresentanteLegal"
              label="Representante Legal"
              defaultValue={ProveedorRepresentanteLegal}
              variant="outlined"
            />
   
    </div>
  </form>


  </div>
     

 
  
    );
  };
  export default DetailProveedor;