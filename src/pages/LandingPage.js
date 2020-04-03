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
        return ( // MIGHT JUST HAVE A GO TO HOME BUTTON IF USER IS ALREADY AUTHENTICATED
            <div className="landing-container">
                <div className="inner-container">
                    <h1>Welcome to Neighbor! <span><HomeFilled /> </span></h1>

                    <p>Request help from people in your community in getting things from the outside world during this pandemic period.</p>
                    <div>
                        <Button type="primary" onClick={this.goToLogin}>Login</Button> <Button type="primary" onClick={this.goToSignUp}>Sign Up</Button>
                    </div>

                </div>

                
            </div>
        )
    }
}
