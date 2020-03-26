import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./authPages.css"
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { signUp } from '../services/auth';

export class SignUp extends Component {

    onFinish = async (values) => {
        console.log(values);
        const { email, password, name } = values;
        try {
            const response = await signUp(email, password);
            console.log(response);
            const { user } = response;
            if (user) {
                await user.updateProfile({
                    displayName: name
                    // IF BY THE TIME THE HOME ROUTE IS
                    // LOADED AND DISPLAYNAME ID NULL,
                    // I MIGHT GET NEW USERS TO ENTER IT THERE
                })
            }
        } catch (e) {
            console.log(e);
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
                    name="normal_signup"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <h1 className="form-title">Sign Up to <span className="neighbor-text">Neighbour</span></h1>



                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                    </Form.Item>

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
                    {/* <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
    </a>
                </Form.Item> */}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Sign Up
                        </Button>

                    </Form.Item>
                    <span style={{ margin: '1rem' }}>Already have an account? <Link to="/login">Login now!</Link></span>
                </Form>
            </div>
        );
    }
}