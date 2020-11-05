import axios from 'axios';
import ipInfoLab from './../containers/Functions/GetIpInfolab';




export function getPostsProductoMovimientos(ProductoMovimientosFilters) {

  const {ProductoId} = ProductoMovimientosFilters;
  const {AlmacenId} = ProductoMovimientosFilters;
  const {FechaDesde} = ProductoMovimientosFilters;
  const {FechaHasta} = ProductoMovimientosFilters;
  

  const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/ConsultaProductoMovimientos?AlmacenId=' + AlmacenId + '&ProductoId=' + ProductoId + '&FechaDesde=' + FechaDesde + '&FechaHasta=' + FechaHasta


  axios.delete(urlRest)
  return axios.get(urlRest)
}