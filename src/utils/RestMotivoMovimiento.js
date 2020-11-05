import axios from 'axios';
import ipInfoLab from './../containers/Functions/GetIpInfolab';

export function getPosts(MotivoMovimientoFilters) {

  const{MotivoMovimientoNombre, MotivoMovimientoId, MotivoMovimientoTipo} = MotivoMovimientoFilters
  
  const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/CatalogoMotivoMovimiento?MotivoMovimientoNombre=' + MotivoMovimientoNombre + '&MotivoMOvimientoId=' + MotivoMovimientoId + '&MotivoMovimientoTipo=' + MotivoMovimientoTipo

  return axios.get(urlRest)
}