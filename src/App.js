import React from 'react';

// Components import
import Header from "./components/app_components/Header";
import Footer from "./components/app_components/Footer";

// Page imports
import Eng from "./page/Eng";
import Est from "./page/Est";
import Home from "./page/Home";

// Bootstrap import
import 'bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.scss';

class App extends React.Component{
    render() {
        return (
            <Router>
                <Header className={'mb-md-5'}/>
                <br/>
                <br/>
                <br/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/eng' component={Eng}/>
                    <Route exact path='/est' component={Est}/>
                </Switch>
                <Footer/>
            </Router>
        )
    }
}

export default App;
