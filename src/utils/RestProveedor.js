import axios from 'axios';
import ipInfoLab from './../containers/Functions/GetIpInfolab';

export function getPosts(ProveedorFilters) {

  const {ProveedorId, ProveedorNombre, ProductoCodigoBarra} = ProveedorFilters
  

  const urlRest =   'http://' + ipInfoLab + '//StockInfolab_Web.NetEnvironment/rest/CatalogoProveedor?ProveedorId=' + ProveedorId + '&ProveedorNombre=' + ProveedorNombre + '&ProductoCodigoBarra=' + ProductoCodigoBarra

  return axios.get(urlRest);

}