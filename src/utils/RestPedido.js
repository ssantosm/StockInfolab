import axios from 'axios';
import ipInfoLab from './../containers/Functions/GetIpInfolab';




export function getPostsPedido(PedidoFilters) {

  const {PedidoId} = PedidoFilters;
  
  const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/CatalogoPedidos?&PedidoId=' + PedidoId;

  return axios.get(urlRest)
}