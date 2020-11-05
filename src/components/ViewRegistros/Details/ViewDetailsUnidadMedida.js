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

const DetailUnidadMedida = ({ UnidadMedidaId, UnidadMedidaNombre}) => {

  const classes = useStyles();

    return (
  
     
  <div>
      
        <form className={classes.root} noValidate autoComplete="off">
    
          <div>
  
            <TextField
              disabled
              id="UnidadMedida"
              label="Almacén"
              defaultValue={UnidadMedidaNombre}
              variant="outlined"
            />
   
    </div>
  </form>


  </div>
     

 
  
    );
  };
  export default DetailUnidadMedida;