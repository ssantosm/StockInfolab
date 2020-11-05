import axios from 'axios';
import ipInfoLab from './../../../containers/Functions/GetIpInfolab';

const SaveAlmacen = ({DataAlmacen}) =>

{
      const GuardarAlmacen = new Promise((resolve, reject) => {

        const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/ActualizarAlmacen'
        

        axios.post(urlRest, DataAlmacen).then(response => {
           console.log("se ejecuto el guardado: " + response)
            
        }).catch(reason => {
            console.log("la razon de error: " + reason);
        })
    });
}

export default SaveAlmacen;