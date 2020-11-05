import axios from 'axios';
import ipInfoLab from './../containers/Functions/GetIpInfolab';




export function getPosts(KardexFilters) {

  const {AlmacenId, valueFiltroExistencias, valueFiltroCaducidad, valueDiasCaduca, valueFiltroReactivo, valueFiltroConsumible} = KardexFilters;

  
  const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/ConsultaKardex?&AlmacenId=' + AlmacenId + '&valueFiltroExistencias=' + valueFiltroExistencias + '&valueFiltroCaducidad=' + valueFiltroCaducidad + '&valueDiasCaduca='+valueDiasCaduca +
  '&valueFiltroReactivo=' + valueFiltroReactivo + '&valueFiltroConsumible='+valueFiltroConsumible;

  console.log('urlRest: ' + urlRest)

  axios.delete(urlRest)
  return axios.get(urlRest)
}