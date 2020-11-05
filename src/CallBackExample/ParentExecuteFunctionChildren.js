import React, {Component, useRef} from 'react';
import Child from './FunctionChildren'

const ParentExecuteFunctionChildren = () =>
{
    const Class2 = React.memo(class Parent extends Component {

        constructor(props){
            super(props)
        }
        triggerChildAlert = () => {
        this.child.showAlert();
        }
        render() {
        return (
        <div>
        <Child ref={element => {this.child = element}} />
        <button onClick={this.triggerChildAlert}>Click</button>
        </div>
        );
    }

    })

    const componentRerenderedTimes = useRef(0);
    componentRerenderedTimes.current++;
  
    return (
      <div>
          <p1>Este es el padre</p1>
          <Class2></Class2>
      </div>
    );
}
 
// class ParentExecuteFunctionChildren extends Component {
 
//     constructor(props){
//         super(props)
//     }
 
//     triggerChildAlert = () => {
//         this.child.showAlert();
//     }
 
//     render() {
//         return (
//             <div>
//                 <Child ref={element => {this.child = element}} />
//                 <button onClick={this.triggerChildAlert}>Click</button>
//             </div>
//         );
//     }
// }

export default ParentExecuteFunctionChildren