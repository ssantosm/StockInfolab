import axios from 'axios';
import ipInfoLab from './../containers/Functions/GetIpInfolab';


export function getPostsAlmacen(AlmacenFilters) {

 const {AlmacenNombre, AlmacenId, MostrarDefault} = AlmacenFilters;

 /* const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/CatalogoAlmacen?AlmacenNombre=' + AlmacenNombre + '&AlmacenId=' + AlmacenId + '&MostrarDefault=' + MostrarDefault;

  return axios.get(urlRest)*/


  const urlRest =   'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/catalogoAlmacen?AlmacenId=' + AlmacenId +'&AlmacenNombre=' + AlmacenNombre + '&MostrarDefault=' + MostrarDefault //'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/CatalogoAlmacen?AlmacenNombre=' + AlmacenNombre + '&AlmacenId=' + AlmacenId + '&MostrarDefault=' + MostrarDefault
  axios.delete(urlRest)
  return axios.get(urlRest);
}