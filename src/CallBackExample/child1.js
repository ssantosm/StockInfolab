import React from 'react';

class Child1 extends React.Component{
    sendData = () => {
        this.props.parentCallback("Hey Popsie, How’s it going?");
   }
render() { 
    return(
        <h1 onClick = {this.sendData}>---------------------------------------------</h1>
    )
  
   }

}
export default Child1