import React, {Component} from "react";
import {Card} from "react-bootstrap";
import axios from 'axios';
import MyToast from "./MyToast";
import './stylesheet.css'

class AddProduct extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            status: '',
            prijs: '',
            fotoUrl: '',
            beschrijving: '',
            currentUser: {
                id: null,
            },
            isLoading: false,
            isAuthenticated: false
        };
        this.state.show = false;
        this.productChange = this.productChange.bind(this);
        this.submitProduct = this.submitProduct.bind(this);
    }

    initialState = {
         id: '', title: '', status: '', prijs: '', fotoUrl: '', beschrijving: ''
     };

    componentDidMount() {
        this.setState({currentUser: this.props.currentUser})
        const productId = +this.props.match.params.id;
        if(productId){
            this.findProductById(productId);
        }
    }

    submitProduct = event => {
        event.preventDefault();
        console.log(this.state.currentUser.id);

        const product = {
            title: this.state.title,
            status: this.state.status,
            prijs: this.state.prijs,
            fotoUrl: this.state.fotoUrl,
            beschrijving: this.state.beschrijving,
            createdBy: this.state.currentUser.id,
        };

        console.log(product.createdBy)

        axios.post("http://localhost:8080/api/posts/add", product)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true});
                    setTimeout(()=> this.setState({"show": false}), 3000 );
                }else {
                    this.setState({"show":false });
                }
            });
    };


    productChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    resetBook = () => {
        this.setState(() => this.initialState);
    };

    productList = () => {
        return this.props.history.push("/listposts");
    };

    findProductById = (productId) => {
        axios.get("http://localhost:8080/api/posts/update/"+ productId)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        id: response.data.id,
                        title: response.data.title,
                        status: response.data.status,
                        prijs: response.data.prijs,
                        fotoUrl: response.data.fotoUrl,
                        beschrijving: response.data.beschrijving,
                    })
                }
            }).catch((error) => {
            console.error("error - "+ error);
        })
    };


    render() {
        const {title, status, prijs, fotoUrl, beschrijving} = this.state;
        return(
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {"Book Saved Succesfully"} type={"success"} />
                </div>
                <div className="mt-1 text-center">
                    <h1 className="jumbotron bg-dark text-white ">Here you can add a new product</h1>
                </div>
                <div>
                    <Card id="card" className={"border border-dark text-white m-5"}>
                        <Card.Header> Add a new product </Card.Header>
                        <form onReset={this.resetBook} onSubmit={this.submitProduct} id="productFormId">
                        <Card.Body>
                            <div className="form-row m-2">
                                <div className="form-group col">
                                    <label>Title</label>
                                    <input required type="text" className="form-control bg-dark text-white"
                                           value={title} onChange={this.productChange} autoComplete="off"
                                           placeholder="Title" name="title"/>
                                </div>
                                <div className="form-group col" >
                                    <label>Status</label>
                                    <input required type="text" className="form-control bg-dark text-white" autoComplete="off" value={status} onChange={this.productChange} placeholder="Status" name="status"/>
                                </div>
                            </div>
                            <div className="form-row m-2">
                                <div className="form-group col">
                                    <label>Prijs</label>
                                    <input required type="text" className="form-control bg-dark text-white" autoComplete="off" value={prijs} onChange={this.productChange} placeholder="Prijs" name="prijs"/>
                                </div>
                                <div className="form-group col" >
                                    <label>Cover Photo Url <small>(kopieeër via het internet de adres van de afbeelding)</small></label>
                                    <input required type="text" className="form-control bg-dark text-white" autoComplete="off" value={fotoUrl} onChange={this.productChange} placeholder="Photo Url" name="fotoUrl"/>
                                </div>
                            </div>
                                <div className="form-row m-2">
                                    <div className="form-group col">
                                        <label>Beschrijving</label>
                                        <textarea required rows="3" className="form-control bg-dark text-white" autoComplete="off" value={beschrijving} onChange={this.productChange} placeholder="Beschrijving" name="beschrijving"/>
                                    </div>
                            </div>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="reset" className="btn btn-warning ml-2">Reset</button>
                            <button type="button" className="btn btn-info ml-2" onClick={this.productList.bind()}>Book List</button>
                        </Card.Footer>
                           </form>
                    </Card>

                </div>
            </div>
        )
    }
}

export default AddProduct;