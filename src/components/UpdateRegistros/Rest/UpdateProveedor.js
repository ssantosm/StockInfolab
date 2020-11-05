import axios from 'axios';
import ipInfoLab from './../../../containers/Functions/GetIpInfolab';

const SaveProveedor = ({DataProveedor}) =>

{
    console.log({DataProveedor})
      const GuardarProveedor = new Promise((resolve, reject) => {

        const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/ActualizarProveedor'
        

        axios.post(urlRest, DataProveedor).then(response => {
            
        }).catch(reason => {
            console.log("la razon de error: " + reason);
        })
    });
}

export default SaveProveedor;