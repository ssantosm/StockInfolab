import React, {useState} from 'react'
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { render } from '@testing-library/react';

const EntradaDeUnProducto = (props) =>
{


     render()
     {
     const {ParmOpenModal} = props
     console.log('ParmOpenModal: ')
     console.log(ParmOpenModal)

     const [scroll, setScroll] = React.useState('paper');
     const [openModal, setopenModal] = useState(true)

     alert(ParmOpenModal)
     //setopenModal(ParmOpenModal)
     console.log('valor openModal: ')
     console.log(openModal)

     function handleOpen(){
         setopenModal(true)
     }
     function handleClose(){
         setopenModal(false)
     }

     const descriptionElementRef = React.useRef(null);

     React.useEffect(() => {
         if (openModal) {
           const { current: descriptionElement } = descriptionElementRef;
           if (descriptionElement !== null) {
             descriptionElement.focus();
           }
         }
       }, [openModal]);


     const styles = (theme) => ({
         root: {
           margin: 0,
           padding: theme.spacing(2),
         },
         closeButton: {
           position: 'absolute',
           right: theme.spacing(1),
           top: theme.spacing(1),
           color: theme.palette.grey[500],
         },
       });

     const DialogTitle = withStyles(styles)((props) => {
         const { children, classes, onClose, ...other } = props;
         return (
           <MuiDialogTitle disableTypography className={classes.root} {...other}>
             <Typography variant="h6">{children}</Typography>
             {onClose ? (
               <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                 <CloseIcon />
               </IconButton>
             ) : null}
           </MuiDialogTitle>
         );
       });

      

     return(
         <div>
             <div>

             <Dialog
                 open={openModal}
                 onClose={handleClose}
                 scroll={scroll}
                 aria-labelledby="scroll-dialog-title"
                 aria-describedby="scroll-dialog-description"
                 fullWidth = {true}
             >
  
   <DialogTitle id="scroll-dialog-title"  onClose={handleClose}>Entrada</DialogTitle>
   <DialogContent dividers={scroll === 'paper'}>
     <DialogContentText
       id="scroll-dialog-description"
       ref={descriptionElementRef}
       tabIndex={-1}
     >
      


     </DialogContentText>
   </DialogContent>

   <Button
         variant="contained"
         color="primary"
         //className={classes.button}
        // onClick={GuardarMovimiento}//{newEntrada}
         //disabled = {disablesButtonSave}
       >Aceptar</Button>



     </Dialog>
 </div>
         </div>
     )
 }

}

export default EntradaDeUnProducto