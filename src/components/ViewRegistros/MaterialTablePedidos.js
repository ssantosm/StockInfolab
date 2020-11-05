import React from 'react';
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from 'react-router-dom';
import ButtonNew from './../Buttons/ButtonNewRegistro';

const MaterialTablePedido = React.memo((props) =>
{
   
    const {posts} =  props;
    const [openNuevoPedido, setOpenNuevoPedido] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const descriptionElementRef = React.useRef(null);
    
    const NuevoPedido = () => {
       
       /*<Link to = {"/NuevoPedido"}>
           
        </Link>*/
       // setOpenNuevoPedido(true)

    }

    const handleCloseNuevoPedido = () => {
        setOpenNuevoPedido(false);
       
      };

    return(
        <div>
            <MaterialTable
            title="Pedidos"
            columns = {[
                { title: 'NO. Pedido', field: 'PedidoId'},
                { title: 'Fecha', field: 'PedidoFechaHora',
                headerStyle: {
                  fontSize: 20
                  }, },
                { title: 'Proveedor', field: 'ProveedorNombre' },
                { title: 'Estatus', field: 'PedidoEstatus' },
               
              ]}

            data= {posts}

            /*actions={[
                {
                  icon: 'add',
                  tooltip: 'Nuevo Pedido',
                  isFreeAction: true,
                  onClick:() => <Link to={'/product/'}>Edit</Link> //(NuevoPedido)//(event) => alert("You want to add a new row")
                }
              ]}*/

            options={{
                // paging:false,
                  
                 headerStyle: {
                 backgroundColor: '#01579b',
                 color: '#FFF'
                 },
                 rowStyle: {
                 fontSize:16,
                 height:10,
                 width:20,
                },
                cellStyle: {
                 width: 200,
                 
               },
            }}

            components = {{
                Actions : (props) => {
                    return(
                        <div>
                            <ButtonNew
                                UrlButton = {"/NuevoPedido"}
                                TittleButton = {"Nuevo Pedido"}
                            />
                        </div>
                    )
                }
            }}
            />

        <Dialog
            open={openNuevoPedido}
            onClose={handleCloseNuevoPedido}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth = {true}
        
        >

            <DialogTitle id="scroll-dialog-title">Nuevo Pedido</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>

            
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                
                    <h3>Aquí van los datos del nuevo pedido</h3>

                </DialogContentText>

            </DialogContent>

        </Dialog>
            
        </div>
    )
});

export default MaterialTablePedido;