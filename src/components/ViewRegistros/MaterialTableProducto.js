import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import ButtonNew from '../Buttons/ButtonNewRegistro'//'././Buttons/ButtonNewRegistro';
import MenuPopupState from './../../MenuGrids/MenuProducto'

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


const MaterialTableProducto = React.memo((props) =>
{

    const {posts} =  props;
    

    const classes = useStyles();

    const DataWithMenu = posts.map(Response => {
      const {ProductoId} = Response;
      console.log({ProductoId})
      return{...Response, DataWithMenu: <MenuPopupState FProductoId = {ProductoId} > </MenuPopupState>}
    })
    
    
    const dataMaterialTable =  DataWithMenu;
    console.log([dataMaterialTable])

    return(
        <div>

            <MaterialTable
                title={
                    <>Productos
                    <ButtonNew
                    UrlButton = {"/NuevoProducto"}
                    TittleButton = {"Agregar Producto"}
                    Mode = "INS"
                    />
                   </>
                }

                columns = {[
                    { title: 'Producto', field: 'ProductoCodigoBarra' },
                    { title: 'Código Alterno', field: 'ProductoCodigoProveedor' },
                    { title: 'Descripción', field: 'ProductoNombre' },
                    { title: 'Tipo', field: 'ProductoTipoDescripcion' },
                    { title: 'Grupo', field: 'GrupoNombre' },
                    { title: '', field: 'DataWithMenu' },
                    
                    
                    
                ]}

                data= {dataMaterialTable}//{posts}

                options={{
                      
                     headerStyle: {
                     backgroundColor: '#4FC3A1',
                     color: '#ffffff',
                     padding: 8,
                     position: 'sticky', 
                     top: 0
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

                localization={{
                    toolbar: {
                      searchPlaceholder: 'Buscar producto',
                      
                    },
            
                    pagination: {
                      labelDisplayedRows: '{from}-{to} de {count}',
                      labelRowsSelect: 'Productos por página',
                  },
                }}
            />
        </div>
    )

})

export default MaterialTableProducto