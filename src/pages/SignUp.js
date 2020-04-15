import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./authPages.css"
import { Link } from 'react-router-dom';
// import { message } from 'antd';
import { signUp, showNotification } from '../services/auth';

export class SignUp extends Component {
    state = {
        loading: false
    }

    onFinish = async (values) => {
        this.setState({ loading: true })
        // console.log(values);

        const { email, password } = values;
        try {
            await signUp(email, password);
            // const response = await signUp(email, password);
            // console.log(response);
            // const { user } = response;
            // if (user) {
            //     await user.updateProfile({
            //         displayName: name
            //         // IF BY THE TIME THE HOME ROUTE IS
            //         // LOADED AND DISPLAYNAME ID NULL,
            //         // I MIGHT GET NEW USERS TO ENTER IT THERE
            //     })
            //     console.log('created username')
            // }
        } catch (e) {
            console.log(e);
            this.setState({ loading: false })
            // message.error(e.message)
            showNotification('error', e.message, null)
        }
    }

    onFinishFailed = (err) => {
        console.log(err)
    }

    // componentWillUnmount() {
    //     console.log('unmounting...')
    // }

    render() {
        return (
            <div className="auth-container">
                {/* <h1>Login</h1> */}

                <Form
                    name="normal_signup"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    
                >
                    <h1 className="form-title">Sign Up to <span className="neighbor-text" onClick={() => {this.props.history.push('/')}}>Neighbor</span></h1>

                    {/* Aggreement */}


                    {/* <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                    </Form.Item> */}

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

                    {/* <Form.Item
                        name="checkbox"
                        rules={[{ required: true, message: 'Please agree to our terms and conditions' }]}
                        valuePropName="checked">
                        <Checkbox>I agree to the <a href="https://www.termsandconditionsgenerator.com/live.php?token=dxFG66QMP2z6ZchkLpCZSlUMu8OUirJa" target="_blank" rel="noopener noreferrer">Terms and Conditions</a> and <a href="https://www.privacypolicygenerator.info/live.php?token=UgIi8S0PpGKK1cGFLpVBffrJR7N9hMEW" target="_blank" rel="noopener noreferrer">Privacy Policy</a></Checkbox>
                    </Form.Item> */}


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
                            Sign Up
                        </Button>

                    </Form.Item>
                    <div style={{ margin: '1rem', textAlign: 'center',  }}>By signing up, you agree to our <br/> <a href="https://www.termsandconditionsgenerator.com/live.php?token=dxFG66QMP2z6ZchkLpCZSlUMu8OUirJa" target="_blank" rel="noopener noreferrer">Terms and Conditions</a> and <a href="https://www.privacypolicygenerator.info/live.php?token=UgIi8S0PpGKK1cGFLpVBffrJR7N9hMEW" target="_blank" rel="noopener noreferrer">Privacy Policy</a></div>
                    <div style={{ margin: '1rem', textAlign: 'center' }}>Already have an account? <Link to="/login">Login now!</Link></div>
                    <div style={{ margin: '1rem', textAlign: 'center', fontStyle: "italic" }}>Created by Mitchell Mark-George</div>
                    
                    
                </Form>
            </div>
        );
    }
}