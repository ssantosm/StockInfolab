import React, { Component } from 'react';
import Menu from './containers/Menu';

//Catalogos
import CatalogoAlmacenes from './components/CatalogoAlmacenes'
import CatalogoPedidos from './components/CatalogoPedidos'
import CatalogoProveedores from './components/CatalogoProveedores'
import CatalogoUnidadMedida from './components/CatalogoUnidadMedida'
import CatalogoMotivoMovimiento from './components/CatalogoMotivoMovimiento'
import CatalogoClasificacion from './components/CatalogoClasificacion'
import CatalogoProducto from './components/CatalogoProducto'
import Kardex from './components/Kardex'

//Inserts
import NuevoProveedor from './components/NewRegistros/NewProveedor'
import NuevoAlmacen from './components/NewRegistros/NewAlmacen'
import NuevoUnidadMedida from './components/NewRegistros/NewUnidadMedida'
import NuevoMotivoMovimiento from './components/NewRegistros/NewMotivoMovimiento'
import NuevaClasificacion from './components/NewRegistros/NewClasificacion'
//import NuevoProducto from './components/NewRegistros/NewProducto'
//import NuevoProducto2 from './components/NewRegistros/NewProducto2'
import MasterNewProducto from './components/NewRegistros/NewProducto2'
import NuevoPedido from './components/NewRegistros/NewPedido'

//Views
import ViewAlmacen from './components/ViewRegistros/ViewAlmacen';
import ViewProveedor from './components/ViewRegistros/ViewProveedor';
import ViewUnidadMedida from './components/ViewRegistros/ViewUnidadMedida';
import ViewMotivoMovimiento from './components/ViewRegistros/ViewMotivoMovimiento';

//Updates
import UpdateProveedor from './components/UpdateRegistros/UpdateProveedor';
import UpdateAlmacen from './components/UpdateRegistros/UpdateAlmacen';
import UpdateUnidadMedida from './components/UpdateRegistros/UpdateUnidadMedida';
import UpdateMotivoMovimiento from './components/UpdateRegistros/UpdateMotivoMovimiento';
import UpdateProducto from './components/UpdateRegistros/UpdateProducto';

import {Link} from 'react-router-dom';
import NotFound from './components/NotFound';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// import ReadExcel from './containers/Functions/ReadExcel';
import PostList from './CallBackExample/PostDetail'
import Parent from './CallBackExample/Parent';
import ParentExecuteFunctionChildren from './CallBackExample/ParentExecuteFunctionChildren';

import MaterialTableKardex from './components/ViewRegistros/MaterialTableKardex';
import ParentTables from './components/Tables/ParentTables'
import CustomMaterialTable from './components/Tables/CustomMaterialTable'
import TreeTable from './components/Tables/Tree-Table'
import PopUp from './components/Examples/PopUp'



function App(){
  return(
      <BrowserRouter>
       <Menu/>
          <Switch>

              <Route exact path = "/CatalogoAlmacenes" component = {CatalogoAlmacenes}/>
              <Route exact path = "/CatalogoProveedores" component = {CatalogoProveedores}/>
              <Route exact path = "/CatalogoUnidadMedida" component = {CatalogoUnidadMedida}/>
              <Route exact path = "/CatalogoMotivoMovimiento" component = {CatalogoMotivoMovimiento}/>
              <Route exact path = "/CatalogoClasificacion" component = {CatalogoClasificacion}/>
              <Route exact path = "/CatalogoProducto" component = {CatalogoProducto}/>
              <Route exact path = "/Kardex" component = {Kardex}/>
              <Route exact path = "/CatalogoPedidos" component = {CatalogoPedidos}/>

              <Route exact path = "/NuevoProveedor" component = {NuevoProveedor}/>
              <Route exact path = "/NuevoAlmacen" component = {NuevoAlmacen}/>
              <Route exact path = "/NuevoUnidadMedida" component = {NuevoUnidadMedida}/>
              <Route exact path = "/NuevoMotivoMovimiento" component = {NuevoMotivoMovimiento}/>
              <Route exact path = "/NuevoClasificacion" component = {NuevaClasificacion}/>
              <Route exact path = "/NuevoProducto" component = {MasterNewProducto}/>
              <Route exact path = "/NuevoPedido" component = {NuevoPedido}/>
            
              <Route exact path = "/ViewAlmacen" component = {ViewAlmacen}/>
              <Route exact path = "/ViewProveedor" component = {ViewProveedor}/>
              <Route exact path = "/ViewUnidadMedida" component = {ViewUnidadMedida}/>
              <Route exact path = "/ViewMotivoMovimiento" component = {ViewMotivoMovimiento}/>

              <Route exact path = "/UpdateProveedor" component = {UpdateProveedor}/>
              <Route exact path = "/UpdateAlmacen" component = {UpdateAlmacen}/>
              <Route exact path = "/UpdateUnidadMedida" component = {UpdateUnidadMedida}/>
              <Route exact path = "/UpdateMotivoMovimiento" component = {UpdateMotivoMovimiento}/>
              <Route exact path = "/UpdateProducto" component = {MasterNewProducto}/>
              
              {/* <Route exact path = "/ReadExcel" component = {ReadExcel}/> */}
              <Route exact path = "/PostList" component = {PostList}/>
              <Route exact path = "/MaterialTableKardex" component = {MaterialTableKardex}/>
              <Route exact path = "/ParentTables" component = {ParentTables}/>
              <Route exact path = "/CustomMaterialTable" component = {CustomMaterialTable}/>
              <Route exact path = "/TreeTable" component = {TreeTable}/>
              <Route exact path = "/PopUp" component = {PopUp}/>
              <Route exact path = "/ParentExecuteFunctionChildren" component = {ParentExecuteFunctionChildren}/>
              
              

 
              <Route component = {NotFound}></Route>
          </Switch>

      </BrowserRouter>
  )
}

//De a partir de aqui es funcional
/*const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;


class App extends Component {
  render() {
    return (
      <div>
      <Menu/>
      <ScreenAlmacenes></ScreenAlmacenes>
      </div>
    );
  }
}
*/
export default App;