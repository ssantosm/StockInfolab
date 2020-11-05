import axios from 'axios';
import ipInfoLab from './../containers/Functions/GetIpInfolab';

export function getPosts(ProductoFilters) {

  const{ProductoNombre, ProductoId} = ProductoFilters
  
  const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/Catalogoproducto?ProductoNombre=' + ProductoNombre + '&ProductoId=' + ProductoId
  axios.delete(urlRest)
  return axios.get(urlRest)
}