import React, {useState, useEffect} from 'react'
import CRUDProducto from  './NewProducto2'
import { getPosts } from './../../utils/RestProducto';

const MasterNewProducto = (props) =>
{



//     const [DataProducto, setDataProducto] = useState([])

//     /*Parametros en url [INICIO] */
//   const params = new URLSearchParams(props.location.search);
//   const tokenMode = params.get('Mode')
//   const tokenProductoId = params.get('ProductoId')
//   /*Parametros en url [FIN] */

//   useEffect(() => {
//   if(tokenMode == 'upd')
//   {

//     const ProductoFilters = {
//       ProductoId : tokenProductoId,
//       ProductoNombre : ""
//     }
    
//     getPosts(ProductoFilters)
//     .then((res) => {
//         console.log('res en master')
       
//         const data = res.data
//         console.log(data)
//         setDataProducto([data])

//     });
//   }
// },[false])

//     return(
//         <div>
//             <CRUDProducto
//             DataProducto = {DataProducto}></CRUDProducto>
//         </div>
//     )

       
    
}

export default MasterNewProducto;