import React, { Component } from 'react';
import UnidadMedidaGrid from '../components/UnidadMedidaGrid';
import styled from 'styled-components';
import { getPosts } from '../utils/RestUnidadMedida';
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



class UnidadMedidaRegistros extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }


componentDidMount() {

  const UnidadMedidaFilters = {
    UnidadMedidaId : 0,
    UnidadMedidaNombre: ""
  }

    getPosts(UnidadMedidaFilters)

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
      const { UnidadMedidaNombre, UnidadMedidaId } = post;
      
      return (


        <UnidadMedidaGrid
          key={UnidadMedidaId}
          Id = {UnidadMedidaId}
          title={UnidadMedidaNombre}
        />
      );
    });


  }


  // renderFilters = () => {
  //   const classes = useStyles();
    
  
  // }

render() {
    const { loading } = this.state;

    const getUnidadMedidaValue = event => {
      const UnidadMedidaValue = event.target.value;
      
      const UnidadMedidaFilters = {
        UnidadMedidaId : 0,
        UnidadMedidaNombre: UnidadMedidaValue
      }
    
        
        getPosts(UnidadMedidaFilters)
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
          <TextField id="UnidadMedida" label="Unidad Medida" onChange={getUnidadMedidaValue}/>
          
        </div>

      </div>



        <div className = "jss1 jss5 jss2">

           <table class="jss519">
            
                <thead class="jss520">
                        <th className = "jss526 jss527 jss534"></th>
                        <th className = "jss526 jss527 jss534">Unidad Medida</th>
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

export default UnidadMedidaRegistros;