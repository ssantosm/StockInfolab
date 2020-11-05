import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './Home';
import About from './About';
import NotFound from './../components/NotFound';

function App(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path = "/Home" component = {Home}/>
                <Route exact path = "/About" component = {About}/>
                <Route component = {NotFound}></Route>
            </Switch>

        </BrowserRouter>
    )
}

export default App;