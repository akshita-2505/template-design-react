import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import AdminLayout from "layouts/Admin.jsx";
import Home from "./components/home/Home";
import Signup from "./components/signup/Signup";
import Profile from "./components/profile/Profile";
import Login from "./components/Login";
import { Provider } from 'react-redux'
import store from "./store";
import * as serviceWorker from './serviceWorker';

const PrivateRoute = ({component: Component, ...props}) => (
    <Route
        {...props}
        render={innerProps =>
            localStorage.getItem('isAuth') ?
                <Component {...innerProps} />
                :
                <Redirect from='/' to="home"/>
        }
    />
);

function App() {
    /*useEffect(() => {
        //Work with https
        serviceWorker.register();
    }, []);*/
    return (
        <Router>
            <Switch>
                <Route exact path='/home' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/signup' component={Signup}/>
                <PrivateRoute exact path='/profile' component={Profile}/>
                <PrivateRoute path="/admin" component={AdminLayout} />} />
                <PrivateRoute path="/dashboard" component={AdminLayout} />
                <Redirect from='/' to="/home"/>
            </Switch>
        </Router>
    );
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
