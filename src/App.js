import React, { Component} from 'react';
import './styles/main.scss'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home"
import Long_data_view from "./pages/long_data_view";
import Navigation from "./components/Navigation";
import Short_data_view from "./pages/short_data_view"
import about from "./pages/About" 
class App extends Component {
    render() {


        return (


            <BrowserRouter>
                <div> 
                    <Navigation/>
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/home" component={Home} exact/>
                        <Route path="/long_data_view" component={Long_data_view} exact/>
                        <Route path="/short_data_view" component={Short_data_view} exact/>
                        <Route path="/about_project" component={about} exact/>
                        <Route component={Error}/>
                    </Switch>
                </div>
            </BrowserRouter>



        );
    }
}
export default App;
