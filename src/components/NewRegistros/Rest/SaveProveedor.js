import axios from 'axios';
import ipInfoLab from '../../../containers/Functions/GetIpInfolab';

const SaveProveedor = ({DataProveedor}) =>

{

      const GuardarProveedor = new Promise((resolve, reject) => {

        const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/GuardarProveedor'

        axios.post(urlRest, DataProveedor).then(response => {
            //console.log({response})
            //return response
            
        }).catch(reason => {
            console.log("la razon de error: " + reason);
        })
    });

    
}

export default SaveProveedor;