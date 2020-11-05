import React from  'react'

class Child extends React.Component {
    constructor(props) {
        super(props);
      }
 
    showAlert = () => {
        alert('Hello World!!!!!!!!!!!!!!!!!!!!');
    }
 
    render() {
        return (
            <h1>Hello child Component</h1>
        );
    }
}

export default Child