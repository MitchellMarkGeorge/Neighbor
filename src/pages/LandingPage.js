import React, { Component } from 'react'
// import { useHistory } from 'react-router-dom';
// Button
import { HomeFilled } from '@ant-design/icons'
import './LangingPage.css';
import { Button, Layout } from 'antd';

export class Landing extends Component {



    goToLogin = () => {
        this.props.history.push('/login');
    }

    goToSignUp = () => {
        this.props.history.push('/signup');
    }
    render() {
        return (
             
            <div className="landing-container">
                <div className="inner-container">
                    <h1>Welcome to Neighbor! <span><HomeFilled /> </span></h1>
                   
                    <p>Created by Mitchell Mark-George</p>

                    <p>Request help from people in your community in getting things from the outside world during this pandemic period.</p>

                    {/* <div>Created by Mitchell Mark-George</div> */}
                    <div>
                        <Button type="primary" onClick={this.goToLogin}>Login</Button> <Button type="primary" onClick={this.goToSignUp}>Sign Up</Button>
                    </div>

                    {/* <div className="bottom-text">Created by Mitchell Mark-George</div> */}

                </div>

                
            </div>

            
            
        )
    }
}
