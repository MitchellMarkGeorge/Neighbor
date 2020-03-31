import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./authPages.css"
import { Link } from 'react-router-dom';
import { logIn } from '../services/auth';

import { message } from 'antd';
export class LogIn extends Component {
    state = {
        loading: false
    }

    onFinish = async (values) => {
        console.log(values);
        this.setState({loading: true})
        const {email, password} = values;
        try {
            let response = await logIn(email, password);
            console.log(response);
        } catch(e) {
            console.log(e);
            this.setState({loading: false})
            message.error(e.message)
        }
    }

    onFinishFailed = (err) => {
        console.log(err)
    }
    render() {
        return (
            <div className="auth-container">
                {/* <h1>Login</h1> */}

                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <h1 className="form-title">Login to <span className="neighbor-text">Neighbor</span></h1>
                    
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
            

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
                            Log in
        </Button>
       
                    </Form.Item>
                    <span style={{margin: '1rem'}}>Don't have an account? <Link to="/signup">sign up now!</Link></span> 
                </Form>
            </div>
        )
    }
}

