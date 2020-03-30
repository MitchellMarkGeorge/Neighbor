import React, { Component } from 'react';
import { database } from '../services/firebase';

import './list.css'
import { CardList } from './CardList';

export class Requests extends Component {
    // recive current user as prop?
    constructor(props) {
        super(props);

        this.state = {
            requests: [],
            currentRequest: undefined
        }
    }

    componentDidMount() { // will this be called everytime the meny switches
        console.log('Request component mounting...')
        const request_ref = database.ref('requests');
        request_ref.on('value', (snapshot) => {
            let requests = []
            
            snapshot.forEach((item) => {
                requests.push({...item.val(), key: item.key})
            });
            console.log(requests);
            this.setState({ requests })
        })
    }

    componentWillUnmount() {
        // removes all callbacks
        database.ref('requests').off()
    }
    render() {
        return (
            <div className="base-div" >
                {/* Hello from Requests

                <ul>
                    {this.state.requests.map((item, index) => (
                        <li key={index}>{item.contact_info}</li>
                    ))}
                </ul> */}
             
                <h1 className="page-title">Requests</h1>
                
                <div className="list-body">
                {this.state.requests?.length > 0 
                    ? <CardList list={this.state.requests} page="request"/> 
                    : <div>No Requests to display</div>}
                    {/* Use Empty component */}
                </div>
                

                {/* <Card title="Requests" headStyle={{fontSize: '1.5rem', color: 'var(--primary-blue)', position: 'sticky', zIndex: 2}} 
                bordered={false} bodyStyle={{ overflow: 'auto', height: '100%'}}>
                  
                

                    {this.state.requests.length > 0 
                    ? <CardList list={this.state.requests} /> 
                    : <div>No Requests to display</div>} 
                
                </Card> */}
            </div>
        )
    }
}
