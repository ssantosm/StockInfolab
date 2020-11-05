import axios from 'axios';
import ipInfoLab from './../containers/Functions/GetIpInfolab';


export function getPosts(UnidadMedidaFilter) {

  const {UnidadMedidaId, UnidadMedidaNombre} = UnidadMedidaFilter;
  
  const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/CatalogoUnidadMedida?UnidadMedidaNombre=' + UnidadMedidaNombre + '&UnidadMedidaId=' + UnidadMedidaId;
  console.log('urlRest: ' + urlRest)
  return axios.get(urlRest);
}