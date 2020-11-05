import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  
    table: {
      minWidth: 700,
    },
  
    margin: {
      margin: theme.spacing(1),
      backgroundColor: '#ecf6fd',
      border: 0,
      fontWeight: 'bold',
      color: '#2797ef',
    },
  
  }));


function ButtonNew({UrlButton, TittleButton, Mode}){

    const classes = useStyles();

    return(
        <Link 
        to = {{
          pathname : UrlButton,
          search : "&Mode=" + Mode
          }}>
        <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon></AddIcon>}
                    className={classes.margin}
                   
                   >{TittleButton}</Button>
        </Link>

        // <Link to = {UrlButton}>
        //    <button type="button" className = "btn btn-green-light btn-pill">{TittleButton}</button>
        // </Link>
    )
}

export default ButtonNew;