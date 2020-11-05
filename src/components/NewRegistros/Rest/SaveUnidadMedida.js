import axios from 'axios';
import ipInfoLab from '../../../containers/Functions/GetIpInfolab';

const SaveUnidadMedida = ({DataUnidadMedida}) =>

{

      const GuardarUnidadMedida = new Promise((resolve, reject) => {

        const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/GuardarUnidadMedida'

        axios.post(urlRest, DataUnidadMedida).then(response => {
           
            
        }).catch(reason => {
            console.log("la razon de error: " + reason);
        })
    });
}

export default SaveUnidadMedida;