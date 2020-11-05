import axios from 'axios';
import ipInfoLab from '../../../containers/Functions/GetIpInfolab';

const SaveMotivoMovimiento = ({DataMotivoMovimiento}) =>
{
    
    console.log({DataMotivoMovimiento})
      const GuardarMotivoMovimiento = new Promise((resolve, reject) => {

        const urlRest = 'http://' + ipInfoLab + '/StockInfolab_Web.NetEnvironment/rest/GuardarMotivoMovimiento'

        axios.post(urlRest, DataMotivoMovimiento).then(response => {
           
            
        }).catch(reason => {
            console.log("la razon de error: " + reason);
        })
    });
}

export default SaveMotivoMovimiento;