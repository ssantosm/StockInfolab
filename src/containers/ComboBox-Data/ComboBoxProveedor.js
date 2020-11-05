import React, { Component } from 'react';
import styled from 'styled-components';
import { getPosts } from './../../utils/RestProveedor';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


        
/*const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  background-color: transparent;
  
`;*/

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },

  combo: {

  },
}));



const ComboBoxProveedor = React.memo(class ComboBoxProveedor extends Component {


  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }


// componentDidMount() {

//   const ProveedorFilters = {
//     ProveedorId : 0,
//     ProveedorNombre: "",
//     ProductoCodigoBarra: this.props.ProductoCodigoBarra
//   }

//   console.log('ProveedorFilters')

//   console.log(ProveedorFilters)

//     getPosts(ProveedorFilters)

//       .then((res) => {
//         this.setState({
//           posts: res.data,
//           loading: false,
//         });
//       })
//       .catch((err) => console.log(err));

     
//   }

async componentDidUpdate(previousProps, previousState)
{
  // console.log('componentDidUpdate-------------')
  // console.log(previousProps)

  if(previousProps.ProductoCodigoBarra !== this.props.ProductoCodigoBarra)
  {
    const ProveedorFilters = {
         ProveedorId : 0,
         ProveedorNombre: "",
         ProductoCodigoBarra: this.props.ProductoCodigoBarra
       }
    
      // console.log('ProveedorFilters')
    
      //  console.log(ProveedorFilters)
    
         await getPosts(ProveedorFilters)
    
           .then((res) => {
              this.setState({
                posts: res.data,
               //  loading: false,
              });
           })
           .catch((err) => console.log(err));

          const { posts } = this.state;

          var num = 0;//se seteará el primer valor encontrado
          posts.map(post => {
            const {ProveedorId } = post;
       
            num++;
            if(num == 1)
            {
              this.props.parentCallback(ProveedorId)
            }
            
          });

          
    
  }
}


renderPosts = (previousProps) => {
  
    const { posts } = this.state;
    
    var num = 0;
    return posts.map(post => {
      
      const { ProveedorNombre, ProveedorDireccion, ProveedorId } = post;
      num++;

      if(num == 1)
      {
        return (
          <option selected value={ProveedorId}>{ProveedorNombre}{num}</option>
        );
      }
      else
      {
        return (
          <option value={ProveedorId}>{ProveedorNombre}{num}</option>
        );
      }


      
    });

   
  }

// renderFilters = () => {
//   const classes = useStyles();
  

// }

render() {
    const { loading } = this.state;
    
    const getProveedorValue = event => {
      const ProveedorValue = event.target.value;
      this.props.parentCallback(ProveedorValue)


    }

    return (
        <FormControl variant="outlined" className="">
             <InputLabel htmlFor="outlined-age-native-simple">Proveedor</InputLabel>
                        <Select
                        native
                        fullWidth={false}
                        defaultValue = {0}
                       // value={state.Tipo}
                        onChange={getProveedorValue}
                        label="Proveedor"
                        inputProps={{
                        name: 'Proveedor',
                        id: 'outlined-age-native-simple',
                        }}
                        >
                     
                     <option aria-label="None" value={0} />
                     {this.renderPosts()}
                      </Select>
                      
             </FormControl>
    );
  }
}
)

export default ComboBoxProveedor;