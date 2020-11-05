import React, { Component } from 'react';
import MotivoMovimientoGrid from '../components/MotivoMovimientoGrid';
import styled from 'styled-components';
import { getPosts } from '../utils/RestMotivoMovimiento';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


        
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
}));



class MotivoMovimientoRegistros extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }


componentDidMount() {

  const MotivoMovimientoFilters = {
    MotivoMovimientoId : 0,
    MotivoMovimientoNombre: "",
    MotivoMovimientoTipo : "",
  }

    getPosts(MotivoMovimientoFilters)

      .then((res) => {
        this.setState({
          posts: res.data,
          loading: false,
        });
      })
      .catch((err) => console.log(err));

     
  }

renderPosts = () => {
    const { posts } = this.state;
    
    return posts.map(post => {
      const { MotivoMovimientoNombre, MotivoMovimientoTipo, MotivoMovimientoId } = post;
      
      return (
       
          
        <MotivoMovimientoGrid
          key={MotivoMovimientoId}
          Id = {MotivoMovimientoId}
          title={MotivoMovimientoNombre}
          body={MotivoMovimientoTipo}
        />
      );
    });

    
  }

// renderFilters = () => {
//   const classes = useStyles();
  

// }

render() {
    const { loading } = this.state;

    const getMotivoMovimientoValue = event => {
      const MotivoMovimientoValue = event.target.value;
      
      const MotivoMovimientoFilters = {
        MotivoMovimientoId : 0,
        MotivoMovimientoNombre: MotivoMovimientoValue,
        MotivoMovimientoTipo : "",
      }
    
        
        getPosts(MotivoMovimientoFilters)
        .then((res) => {

          this.setState({
            posts: res.data,
            loading: false,
          });
        })
        .catch((err) => console.log("Error: " + err));

    }


    
    return (
      <div className = "ContentCatalogo"> {this.renderFilters}

        <div className = "jss1 jss5 jss2">
          <div>
            <TextField id="MotivoMovimiento" label="Motivo Movimiento" onChange={getMotivoMovimientoValue}/>
            
          </div>

        </div>

     
        
        <div className = "jss1 jss5 jss2">
             
           <table class="jss519">
            
                <thead class="jss520">
                        <th className = "jss526 jss527 jss534"></th>
                        <th className = "jss526 jss527 jss534">Motivo Movimiento</th>
                        <th className = "jss526 jss527 jss534">Tipo</th>
                 </thead>



                 <tbody class="jss539">
                      {loading ? 'buscando...' : this.renderPosts()}
                 </tbody>
                  
               
                     
       
               
            </table>
          </div>
        </div>
      
    );
  }
}

export default MotivoMovimientoRegistros;