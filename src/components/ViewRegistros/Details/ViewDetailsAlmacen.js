import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

const DetailAlmacen = ({ AlmacenId, AlmacenNombre, AlmacenDireccion, AlmacenDefault}) => {

  const classes = useStyles();

    return (
  
     
  <div>

        <form className={classes.root} noValidate autoComplete="off">
    
          <div>
  
            <TextField
              disabled
              id="Almacen"
              label="Almacén"
              defaultValue={AlmacenNombre}
              variant="outlined"
            />

            <TextField
              disabled
              id="Direccion"
              label="Dirección"
              defaultValue={AlmacenDireccion}
              variant="outlined"
            />
            
            <FormControlLabel className="makeStyles-field"
                control={
                  <Checkbox
                  disabled
                    defaultChecked={AlmacenDefault}
                    //onChange={getAlmacenDaultValue}
                    name="AlmacenDefault"
                    color="primary"
                  />
                  }
                  label="Seleccionar como default"
                  />

   
    </div>
  </form>

  </div>
     

 
  
    );
  };
  export default DetailAlmacen;