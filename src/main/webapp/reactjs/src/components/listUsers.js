import React, {Component} from "react";
import {Table} from "react-bootstrap";
import axios from 'axios';

class listUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            users: [],
            isLoading: false
        };
        this.updateSearch = this.updateSearch.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/posts/users')
            .then(response => response.data)
            .then((data) => {
                this.setState({users: data})
            })
    }

    updateSearch(event){
        this.setState({
            search: event.target.value.substr(0, 20)
        });
    }



    render() {
        let filteredUsers = this.state.users.filter((user) => {
            return user.username.indexOf(this.state.search.toLowerCase()) !== -1;
        });

        return (
            <div>
                <div>
                    <h1 className="jumbotron bg-dark text-white text-center">Here you can search for a user</h1>
                </div>
                <div className="form-group-col">
                    <form className="mt-3 mb-3">
                        Search for a users username! <input placeholder="Username..." type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} className="mb-2 mt-2 form-control bg-dark text-white"/>
                    </form>
                </div>
                <Table className="table table-striped table-dark" bordered hover>
                    <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Name</th>
                        <th scope="col">User ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.length === 0 ?
                        <tr align="center">
                            <td colSpan="6">0 Data Available</td>
                        </tr>
                        : filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.id}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        )
    };
}

export default listUsers;