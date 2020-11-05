import axios from 'axios';
import ipInfoLab from '../../../containers/Functions/GetIpInfolab';

const SaveClasificacion = ({DataClasificacion}) =>

{

      const GuardarClasificacion = new Promise((resolve, reject) => {

        const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/GuardarClasificacion'

        axios.post(urlRest, DataClasificacion).then(response => {
           
            
        }).catch(reason => {
            console.log("la razon de error: " + reason);
        })
    });
}

export default SaveClasificacion;