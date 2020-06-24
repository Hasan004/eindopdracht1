import React, {Component} from "react";
import {ButtonGroup, Card, Image, Table, Button} from "react-bootstrap";
import axios from 'axios';
import MyToast from "./MyToast";
import {Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import BuildIcon from '@material-ui/icons/Build';

class ListProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8080/api/posts/all")
            .then(response => response.data)
            .then((data) => {
               this.setState({products: data})
            });
    }

    deletePost = (productId) => {
        axios.delete("http://localhost:8080/api/posts/delete/" + productId)
        .then(response => {
            if (response.data != null) {
                this.setState({"show": true});
                setTimeout(() => this.setState({"show": false}), 3000);
            } else {
                this.setState({"show": false});
            }
            this.setState({
                products: this.state.products.filter(product => product.id !== productId)
            })
        })
    }

    render() {
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"Post deleted Succesfully"} type={"danger"} />
                </div>
                <div>
                    <h1 className="jumbotron bg-dark text-white text-center ">Here you can see all the products</h1>
                </div>
                <Card className={"border border-dark bg-dark text-white m-3"}>
                    <Card.Header> List the products </Card.Header>
                    <Card.Body>
                        <Table className="table table-striped table-dark" bordered hover>
                            <thead>
                            <tr>
                                <th scope="col">Photo</th>
                                <th scope="col">User ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Status</th>
                                <th scope="col">Prijs</th>
                                <th scope="col">Beschrijving</th>
                                <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.products.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">{this.state.products.length} Data Available</td>
                                </tr>
                                : this.state.products.map((product) => (
                                    <tr key={product.id}>
                                        <td><Image src={product.fotoUrl} width="120" height="80"/></td>
                                        <td>{product.createdBy}</td>
                                        <td>{product.title}</td>
                                        <td>{product.status}</td>
                                        <td>{product.prijs}</td>
                                        <td>{product.beschrijving}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"edit/"+product.id} className="btn btn-sm btn-outline-primary" ><BuildIcon/></Link>
                                                <Button size="sm" variant="outline-danger" onClick={this.deletePost.bind(this, product.id)}><DeleteIcon /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        )
    };
}

export default ListProducts;