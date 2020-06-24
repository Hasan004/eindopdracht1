import './stylesheet.css';
import React, { Component } from 'react';
import {
    withRouter
} from 'react-router-dom';
import {notification} from "antd";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

class NavigatieBalk extends Component{

    handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
        localStorage.clear();

        window.location.href = "/login";

        notification[notificationType]({
            message: 'Familie Markt',
            description: description,
        });
    }

    render(){
        let Navbar;
        if(this.props.currentUser != null){
            Navbar = [
                <div className="collapse navbar-collapse" id="navbarNav" >
                    <ul className="navbar-nav mt-3">
                        <li className="nav-item active ">
                            <a className="nav-link text-white " href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/addpost">Add Post</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/listposts">List Posts</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white"  href="/users">Search Users</a>
                        </li>
                        <li id="profile" className="nav-item">
                            <a className="nav-link text-white" href={`/users/${this.props.currentUser.username}`} ><AssignmentIndIcon fontSize="large"/></a>
                        </li>
                        <li id="logout" className="nav-item ">
                            <a
                                className="nav-link text-white"
                                href="javascript:void(0);"
                                onClick={this.handleLogout}> <ExitToAppIcon fontSize="large"/>
                            </a>
                        </li>
                    </ul>
                </div>
            ];
        }else{
            Navbar = [
                <div className="collapse navbar-collapse mt-3" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link text-white" href="/login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/signup">Register</a>
                        </li>
                    </ul>
                </div>
            ]
        }
        return(
            <div >
            <nav id="navbar" className="navbar navbar-expand-lg">
                <a id="logo" className="navbar-brand text-white mt-2" href="/">PeopleGram</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div selectedKeys={[this.props.location.pathname]}>
                    {Navbar }
                </div>
            </nav>
            </div>
        )
    }
}

export default withRouter(NavigatieBalk);
