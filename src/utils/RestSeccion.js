import axios from 'axios';
import ipInfoLab from './../containers/Functions/GetIpInfolab';


export function getPosts(SeccionFilters) {

  const {SeccionNombre, SeccionId} = SeccionFilters;

  const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/CatalogoSeccion?SeccionNombre=' + SeccionNombre + '&SeccionId=' + SeccionId;

  return axios.get(urlRest)
}