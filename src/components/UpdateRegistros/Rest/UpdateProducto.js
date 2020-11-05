import axios from 'axios';
import ipInfoLab from './../../../containers/Functions/GetIpInfolab';

const SaveProducto = ({DataProducto}) =>

{
    console.log({DataProducto})
      const GuardarProducto = new Promise((resolve, reject) => {

        const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/ActualizarProducto'
        

        axios.post(urlRest, DataProducto).then(response => {
            
        }).catch(reason => {
            console.log("la razon de error: " + reason);
        })
    });
}

export default SaveProducto;