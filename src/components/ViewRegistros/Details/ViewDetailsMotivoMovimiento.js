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

const DetailMotivoMovimiento = ({ MotivoMovimientoId, MotivoMovimientoNombre}) => {

  const classes = useStyles();

    return (
  
     
  <div>
      <Container>

     

      <div className = "jss1 jss5 jss2">

        <form className={classes.root} noValidate autoComplete="off">
    
          <div>
  
            <TextField
              disabled
              id="MotivoMovimiento"
              label="Almacén"
              defaultValue={MotivoMovimientoNombre}
              variant="outlined"
            />
   
    </div>
  </form>
        </div>
      </Container>

  </div>
     

 
  
    );
  };
  export default DetailMotivoMovimiento;