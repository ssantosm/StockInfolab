// import axios from 'axios'; 
// import React,{Component} from 'react'; 
// import styled from 'styled-components';
// import * as XLSX from 'xlsx'


// const Container = styled.div`
//   max-width: 980px;
//   margin: 0 auto;
// `;

  
// class ReadExcel extends Component { 
   
//     state = { 
  
//       // Initially, no file is selected 
//       selectedFile: null
//     }; 
     
//     // On file select (from the pop up) 
//     onFileChange = event => { 
     
//     const target = event.target
//     const value = target.type === 'checkbox' ? target.checked : target.value
//     const name = target.name
//     const this2 = this
//     this.setState({
//         [name]: value
//     })

//     let hojas = []

//     if(name === 'file')
//     {
//         let reader = new FileReader()
//         reader.readAsArrayBuffer(target.files[0])
//         reader.onloadend = (e) => {
//             var data = new Uint8Array(e.target.result);
//             var workBook = XLSX.read(data, {type : 'array'});

//             workBook.SheetNames.forEach(function(SheetName){

//                 var XL_row_object = XLSX.utils.sheet_to_row_object_array(workBook.Sheets[SheetName]);

//                 hojas.push({
//                     data : XL_row_object,
//                     SheetName
//                 })
//             })
//             console.log(hojas)
//             this2.setState({
//                 selectedFileDocument : target.files[0],
//                 hojas
//             })
//         }
//     }
//       // Update the state 
//       this.setState({ selectedFile: event.target.files[0] }); 
     
//     }; 
     
//     // On file upload (click the upload button) 
//     onFileUpload = () => { 
     
//       // Create an object of formData 
//       const formData = new FormData(); 
     
//       // Update the formData object 
//       formData.append( 
//         "myFile", 
//         this.state.selectedFile, 
//         this.state.selectedFile.name 
//       ); 
     
//       // Details of the uploaded file 
//       console.log(this.state.selectedFile); 
     
//       // Request made to the backend api 
//       // Send formData object 
//       console.log({formData})
//       axios.post("api/uploadfile", formData); 
//     }; 
     
//     // File content to be displayed after 
//     // file upload is complete 
//     fileData = () => { 
     
//       if (this.state.selectedFile) { 
          
//         return ( 
//             <Container>


           
//           <div> 
//             <h2>File Details:</h2> 
//             <p>File Name: {this.state.selectedFile.name}</p> 
//             <p>File Type: {this.state.selectedFile.type}</p> 
//             <p> 
//               Last Modified:{" "} 
//               {this.state.selectedFile.lastModifiedDate.toDateString()} 
//             </p> 
//           </div> 
//           </Container>
//         ); 
//       } else { 
//         return ( 
//           <div> 
//             <br /> 
//             <h4>Choose before Pressing the Upload button</h4> 
//           </div> 
//         ); 
//       } 
//     }; 
     
//     render() { 
     
//       return ( 
//         <Container>
//             <div> 
//                 <input 
//                     type="file" 
//                     name = "file"
//                     id = "file"
//                     onChange={this.onFileChange}
//                     placeholder = "seleccionar excel"
//                      /> 
//                 <button onClick={this.onFileUpload}> 
//                   Upload! 
//                 </button> 
//             </div> 
//           {this.fileData()} 
//         </Container>
//       ); 
//     } 
//   } 
  
//   export default ReadExcel; 