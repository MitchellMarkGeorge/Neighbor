import React from 'react'
import { useHistory } from "react-router-dom";
import './LangingPage.css';

import { Button } from 'antd';
import { Mobile, Desktop } from '../components/Responsive';
export function Tutorial() {

    const history = useHistory();

    const goToApp = () => {
        history.push('/home');
    }
    return (
        // <div className="landing-container">
            <div className="tutorial-container">
                <h1>Tutorial</h1>

        
                <div><video controls></video></div>

                

                <h1>A Story</h1>
                <p className="story-text">Hithere friends jsdjsadkldaksdjsaljdkajsdljkiw reijrwjqljwekqwjeqw</p>
                <div><Button type="primary" onClick={goToApp}>Go to App</Button></div>
            </div>
        // </div>
                
    )
}
