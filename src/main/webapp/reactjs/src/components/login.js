import React, { Component } from 'react';
import { login } from './APIUtils';
import { ACCESS_TOKEN } from './constants';
import {Input, Button, notification} from 'antd'
import { Form } from '@ant-design/compatible';
import './stylesheet.css';
const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <h1 id="form" className="jumbotron bg-dark mt-3 text-center text-white">Login Page</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                    .then(response => {
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        this.props.onLogin();
                    }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: 'familie markt',
                            description: 'Your Username or Password is incorrect. Please try again!'
                        });
                    } else {
                        notification.error({
                            message: 'familie markt',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="form">
            <Form onSubmit={this.handleSubmit} className="container login-form ml-5">
                <FormItem className="m-3 "> <label> Username or Email </label>
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: 'Please input your username or email!' }],
                    })(
                        <Input
                            size="large"
                            name="usernameOrEmail"
                            placeholder="Username or Email" />
                    )}
                </FormItem>
                <FormItem className="m-3 "> <label> Password </label>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                         <Input
                            size="large"
                            name="password"
                            type="password"
                            placeholder="Password"  />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button m-3">Login</Button>
                    Or <a href="/signup">register now!</a>
                </FormItem>
            </Form>
            </div>
        );
    }
}


export default Login;