import axios from 'axios';
import ipInfoLab from './../containers/Functions/GetIpInfolab';


export function getPosts(GrupoFilters) {

  const {GrupoNombre, GrupoId} = GrupoFilters;

  const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/CatalogoGrupo?GrupoNombre=' + GrupoNombre + '&GrupoId=' + GrupoId;

  return axios.get(urlRest)
}