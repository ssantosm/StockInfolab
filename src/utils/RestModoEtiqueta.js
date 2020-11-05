import axios from 'axios';
import ipInfoLab from './../containers/Functions/GetIpInfolab';


export function getPosts(ModoEtiquetaFilters) {

  const {ModoEtiquetaNombre, ModoEtiquetaId} = ModoEtiquetaFilters;

  const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/CatalogoModoEtiqueta?ModoEtiquetaNombre=' + ModoEtiquetaNombre + '&ModoEtiquetaId=' + ModoEtiquetaId;

  return axios.get(urlRest)
}