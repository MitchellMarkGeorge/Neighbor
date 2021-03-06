import React from 'react'
import { useHistory } from "react-router-dom";
import './LangingPage.css';
import desktop_video from './videos/DesktopNeighborTutorial.mp4';
import mobile_video from './videos/MobileNeighborTutorial.mp4';
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


            <div>
                <video controls>
                    <Desktop><source src={desktop_video} type="video/mp4" /></Desktop>
                    <Mobile><source src={mobile_video} type="video/mp4"></source></Mobile>
                    {/* <source src={video} type="video/mp4"/> */}
                </video>
            </div>

            <div style={{ margin: "1rem 0" }}><Button type="primary" onClick={goToApp}>Go to App</Button></div>

            <h1>An Example of how Neighbor works</h1>
            <p className="story-text">Meet Jack and Jill
                <br />
                <br />

            Jill, who is 72 years old and lives alone, has a weak immune system, so when the COVID-19 pandemic broke out, she had to stay at home for her safety. Sadly, after three weeks at home, she ran out of some groceries she needs.

                <br></br>
                <br></br>

            Enter ‘Neighbor’ – your community connector.

                <br />
                <br />

            Jill creates a new request on the ‘Neighbor’ website with all her needs, detailed delivery instructions, location and contact information. Jack, who lives in Jill’s neighborhood, is also signed on to ‘Neighbor’ and plans to go out shopping in the morning. Before he steps out, he checks the website to see if there are any new requests he can help out with. Jack finds Jill’s request, accepts it and is prompted to contact Jill for any details that need clarification. Jill periodically checks the Neighbor app and in her “My Requests” page, Jill can see her request  has been accepted by Jack and his contact details. Jack can see all the details he needs about Jill’s request in his “Accepted Request” page.
                <br />
                <br />
Through this secure website, not only is Jill safe and her needs met, but it proves that even though there is physical distancing, we can be kind, caring and remain a strong community.</p>

            <h1>Contact</h1>

            <p>Please contact us or send feedback to admin@help-a-neighbor.ca</p>

        </div>
        // </div>

    )
}
