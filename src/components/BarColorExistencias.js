import React from 'react'

const BarColorExistencias = (props) =>{
   // console.log({props})
    const {ProductoColorExistencia} = props;
    const {CantidadExistente} = props;
    const {ProductoStockMaximo} = props;



    switch(ProductoColorExistencia)
    {
        case "R":

            var porcentaje= (CantidadExistente / ProductoStockMaximo)*100;
            porcentaje = Math.round( porcentaje )

            
            if(porcentaje <= 100)
            {
                const mystyleGreen = {
                    color: "white",
                    backgroundColor: "red",
                    padding: "10px",
                    fontFamily: "Arial",
                    width: 15,
                    transition: "width 2s",
                  };
    
                  return(<div>
                    <p style={mystyleGreen}>{porcentaje}%</p>
                    
                    </div>)

            }
            else
            {
                const mystyleRed = {
                    color: "white",
                    backgroundColor: "red",
                    padding: "10px",
                    fontFamily: "Arial",
                    width: "100px",
                    transition: "width 2s",
                  };
    
                  return(<div>
                    <p style={mystyleRed}>{porcentaje}%</p>
                    
                    </div>)
            }

            

           
            break;
        
        case "V":

            var porcentaje= (CantidadExistente / ProductoStockMaximo)*100;
            porcentaje = Math.round( porcentaje )

            
            if(porcentaje <= 100)
            {
                const mystyleGreen = {
                    width : 0,
                    color: "white",
                    backgroundColor: "green",
                    padding: "10px",
                    fontFamily: "Arial",
                    width: porcentaje,
                    transition: "width 2s",
                  };
    
                  return(<div>
                    <p style={mystyleGreen}>{porcentaje}%</p>
                    
                    </div>)

            }
            else
            {
                const mystyleGreen = {
                    width : 0,
                    color: "white",
                    backgroundColor: "green",
                    padding: "10px",
                    fontFamily: "Arial",
                    width: "100px",
                    transition: "width 2s",
                  };
    
                  return(<div>
                    <p style={mystyleGreen}>{porcentaje}%</p>
                    
                    </div>)
            }

            
            break;

        case "A":

        
            var porcentaje= (CantidadExistente / ProductoStockMaximo)*100;
            porcentaje = Math.round( porcentaje )

            
            if(porcentaje <= 100)
            {
                const mystyleYellow = {
                    width : 0,
                    color: "white",
                    backgroundColor: "#FFD700",
                    padding: "10px",
                    fontFamily: "Arial",
                    width: porcentaje,
                    transition: "width 2s",
                  };
    
                  return(<div>
                    <p style={mystyleYellow}>{porcentaje}%</p>
                    
                    </div>)

            }
            else
            {
                const mystyleYellow = {
                    width : 0,
                    color: "white",
                    backgroundColor: "#FFD700",
                    padding: "10px",
                    fontFamily: "Arial",
                    width: "100px",
                    transition: "width 2s",
                  };
    
                  return(<div>
                    <p style={mystyleYellow}>{porcentaje}%</p>
                    
                    </div>)
            }
            break;

        default:
            return (<div></div>);
            break;
    
    }
}
    

export default BarColorExistencias;