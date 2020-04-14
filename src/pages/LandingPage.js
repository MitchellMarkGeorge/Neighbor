import React, { Component } from 'react'
// import { useHistory } from 'react-router-dom';
// Button
import { HomeFilled } from '@ant-design/icons'
import './LangingPage.css';
import { Button } from 'antd';

export class Landing extends Component {



    goToLogin = () => {
        this.props.history.push('/login');
    }

    goToSignUp = () => {
        this.props.history.push('/signup');
    }

    goToTutorial = () => {
        this.props.history.push('/tutorial')
    }
    render() {
        return (

            <div className="landing-container">
                <div className="inner-container">
                    <h1 style={{margin: '1rem'}}>Welcome to Neighbor! <span><HomeFilled /> </span></h1>
                    {/* confirm font size */}
                    {/* Reconsider spacing */}
                    <p style={{ margin: '1rem 2.5rem', fontSize: '1rem', fontStyle: "italic" }}>Created by <br /> Mitchell Mark-George</p>
                    {/* style={{fontSize: '1.2rem'}} */}
                    {/* <p>Request help from people in your community in getting things from the outside world during this pandemic period.</p> */}
                    <p>During this COVID-19 pandemic period... <br />Do you need help? <br /> Can you help? <br /> Get connected with Neighbor.</p>
                    {/* <div>Created by Mitchell Mark-George</div> */}
                    <div>
                        <Button type="primary" onClick={this.goToLogin}>Login</Button> <Button type="primary" onClick={this.goToSignUp}>Sign Up</Button> <Button type="primary" onClick={this.goToTutorial}>Tutorial</Button>
                    </div>

                    <div style={{ fontStyle: "italic", fontSize: "1rem", margin: '1rem' }}>"...Love your neighbor as yourself" <br /> Mark 12:31</div>

                    {/* <div className="bottom-text">Created by Mitchell Mark-George</div> */}

                </div>


            </div>



        )
    }
}
