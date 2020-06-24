import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch, BrowserRouter
} from 'react-router-dom';
import { getCurrentUser } from './components/APIUtils';
import Welcome from './components/welcome';
import Login from './components/login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import NavigatieBalk from './components/NavigatieBalk';
import NotFound from './components/NotFound';
import LoadingIndicator from './components/LoadingIndicator';
import { Layout, notification } from 'antd';
import AddProduct from "./components/AddProduct";
import ListProducts from "./components/ListProducts";
import ListUsers from './components/listUsers';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
        .then(response => {
          this.setState({
            currentUser: response,
            isAuthenticated: true,
            isLoading: false
          });
        }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.clear();
    window.location.href = "/login"

    notification[notificationType]({
      message: 'familie markt',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'familie markt',
      description: "You're successfully logged in.",
    });

    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container bg-dark text-white">
             <NavigatieBalk isAuthenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                     />
          <Content className="app-content">
            <div className="container">
              <BrowserRouter>
              <Switch>
                <Route exact path="/"
                       render={(props) => <Welcome isAuthenticated={this.state.isAuthenticated}
                                                    currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}/>
                <Route exact path="/login"
    render={(props) => <Login onLogin={this.handleLogin} {...props} />}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/users/:username"
                       render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                <Route exact path="/addpost" render={(props) => <AddProduct isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}{...props}/> }/>
                <Route exact path="/edit/:id" exact component={AddProduct}/> }/>
                <Route exact path="/listposts" render={(props) => <ListProducts isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}{...props}/> }/>
                <Route exact path="/users" render={(props) => <ListUsers isAuthenticated={this.state.isAuthenticated} {...props}/> }/>

                <Route component={NotFound}/>
              </Switch>
              </BrowserRouter>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);