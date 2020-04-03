import React, { Component } from 'react'
import { Form, Input, Button, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./authPages.css"
import { Link } from 'react-router-dom';
import { logIn, sendPasswordReset } from '../services/auth';

import { message } from 'antd';
// import { auth } from 'firebase';
export class LogIn extends Component {
    state = {
        loading: false,
        forgotPassword: false
    }

    onFinish = async (values) => {
        console.log(values);
        this.setState({ loading: true })
        const { email, password } = values;
        try {
            let response = await logIn(email, password);
            console.log(response);
        } catch (e) {
            console.log(e);
            this.setState({ loading: false })
            message.error(e.message)
        }
    }

    setForgotPassword = () => {
        this.setState({ forgotPassword: true })
    }

    removeModal = () => {
        this.setState({ forgotPassword: false })
    }

    onFinishFailed = (err) => {
        console.log(err)
    }

    onForgotFinish = async (values) => {
        this.removeModal();
        const { email } = values;
        try {
            await sendPasswordReset(email);
            message.success(`Password reset email sent to ${email}`)
        } catch (e) {
            console.log(e); // use e.message?
            message.error('There was an error in sending the password reset email email')
        }

    }
    render() {
        return (
            <>

                <Modal visible={this.state.forgotPassword} footer={null} onCancel={this.removeModal}>
                    <Form
                        name="forgot_password"
                        layout="vertical"
                        onFinish={this.onForgotFinish}
                        onFinishFailed={this.onFinishFailed}>
                            <h1 className="modal-title">Password Reset</h1>
                        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input placeholder="Email you want the reset email to be sent to"/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Send Email
                             </Button>

                        </Form.Item>
                    </Form>
                </Modal>
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
                        <div style={{ margin: '1rem', textAlign: 'center' }}>Don't have an account? <Link to="/signup">Sign up now!</Link></div>
                        <div style={{ margin: '1rem', color: 'var(--primary-blue)', textAlign: 'center' }} onClick={this.setForgotPassword}>Forgot Password?</div>
                    </Form>
                </div>
            </>
        )
    }
}

