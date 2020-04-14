import React from 'react'
import { useHistory } from "react-router-dom";
import './LangingPage.css';

import { Button } from 'antd';
// import { Mobile, Desktop } from '../components/Responsive';
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



            <h1>An Example of how Neighbor works</h1>
            <p className="story-text">Meet Jack and Jill. <br/><br/>
            
            Jill, who is 72 years old and lives alone, has a weak immune system, so when the COVID-19 pandemic broke out, she had to stay at home for her safety. Sadly, after three weeks at home, she ran out of some groceries she needs.

            <br></br>
            <br></br>
            
            Enter ‘Neighbor’ – your community connector.

            <br/>
            <br/>
            
            Jill creates a new request on the ‘Neighbor’ website with all her needs, detailed delivery instructions, location and contact information. Jack, who lives in Jill’s neighborhood, is also signed on to ‘Neighbor’ and plans to go out shopping in the morning. Before he steps out, he checks the website to see if there are any new requests he can help out with. Jack finds Jill’s request, accepts it and is prompted to contact Jill for any details that need clarification. Both Jill and Jack get email notifications: Jill’s informs her that her request has been accepted by Jack and her information shared, so she can contact him if necessary, whilst Jack’s email gives him details of Jill’s request and contact details.
<br/>
<br/>
Through this secure website not only is Jill safe and her needs met, but it proves that even though there is physical distancing, we can be kind, caring and remain a strong community.</p>
            <div><Button type="primary" onClick={goToApp}>Go to App</Button></div>
        </div>
        // </div>

    )
}
