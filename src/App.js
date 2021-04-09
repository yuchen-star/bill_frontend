import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from './components/registerForm';
import NavBar from "./components/navbar";
import auth from "./services/authService";
import Users from "./components/users";
import Logout from "./components/common/logout";
import Bills from "./components/bills";
import BillForm from "./components/billForm";
import ProtectedRoute from './components/common/protectedRoute';
import Error from "./components/error";
import Home from "./components/home";

class App extends Component {
    state = {};

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({ user });
    }

    render() {
        const { user } = this.state;

        return (
            <React.Fragment>
                <NavBar user={user} />
                <main className="container">
                    <Switch>
                        <Route path="/login" component={LoginForm} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/register" component={RegisterForm} />
                        <ProtectedRoute path="/bills/:id" component={BillForm} />
                        <ProtectedRoute path="/bills" render={props => <Bills {...props} user={this.state.user} />} />
                        <ProtectedRoute path="/users" render={props => <Users {...props} user={this.state.user} />} />
                        <Route path="/home" component={Home} />
                        <Route path="/error" component={Error} />
                        <Redirect from='/' exact to='/home' />
                        <Redirect to="/error" />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
