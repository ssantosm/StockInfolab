import axios from 'axios';
import ipInfoLab from './../containers/Functions/GetIpInfolab';

export function getPosts(ClasificacionFilters) {

  const{ClasificacionNombre, ClasificacionId, ClasificacionOrden} = ClasificacionFilters
  
  const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/CatalogoClasificacion?ClasificacionNombre=' + ClasificacionNombre + '&ClasificacionId=' + ClasificacionId + '&ClasificacionOrden=' + ClasificacionOrden

  return axios.get(urlRest)
}