import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { render } from '@testing-library/react';




const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));



  

  export default function TransitionAlerts() {
    alert('se renderiza TransitionAlerts')
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
  
    return (
      <div className={classes.root}>
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Close me!
          </Alert>
        </Collapse>
        <Button
          disabled={open}
          variant="outlined"
          onClick={() => {
            setOpen(true);
          }}
        >
          Re-open
        </Button>
      </div>
    );
  }

// const AlertMessage = React.memo(({openMessageSucces, openMessageError}) =>
// {
  

     
//     alert("se renderiza el alert message" + openMessageError)
//     const classes = useStyles();
//     const [openSucces, setOpenSucces] = React.useState(openMessageSucces);
//     const [openError, setOpenError] = React.useState(true);
 
//     // setTimeout(
//     //     function()
//     //     {
//     //         setOpenSucces(false);; 
//     //         setOpenError(false);
//     //     }, 9000
//     // );
  
//     return (
//         <div>
//         <Button
//             disabled={openSucces}
//             variant="outlined"
//             onClick={() => {
//               setOpenSucces(true);
//               setOpenError(true);
//             }}
//           >
//             Re-open
//           </Button>
        
//         <div className = "AlertDiv">

        
        
//         <div className={classes.root}>
//         <Collapse in={openSucces}>
//         <Alert severity="success"
//         action={
//         <IconButton
//           aria-label="close"
//           color="inherit"
//           size="small"
//           onClick={() => {
//           setOpenSucces(false);
//           }}
//           >
//         <CloseIcon fontSize="inherit" />
//         </IconButton>
//         }
//         >
//            <AlertTitle><b> Aviso </b></AlertTitle>
//           Mesanje de succes
//         </Alert>
        
//     </Collapse>


//     <Collapse in={openError}>
//       <Alert severity="error"
//       action={
//       <IconButton
//         aria-label="close"
//         color="inherit"
//         size="small"
//         onClick={() => {
//         setOpenError(false);
//         }}
//         >
//       <CloseIcon fontSize="inherit" />
//       </IconButton>
//       }
//       >
//          <AlertTitle><b> Error </b></AlertTitle>
//         Mensaje de Error
//       </Alert>
      
//   </Collapse>

//         </div>
//         </div>
//         </div>
//       );
// }
// )

// export default AlertMessage;