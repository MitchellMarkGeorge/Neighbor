import React, { Component } from 'react';
import { database } from '../services/firebase';
import { Card } from 'antd';

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
                requests.push(item.val())
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
            <div style={{ padding: '1rem', height: '100%' }} >
                {/* Hello from Requests

                <ul>
                    {this.state.requests.map((item, index) => (
                        <li key={index}>{item.contact_info}</li>
                    ))}
                </ul> */}

                <Card title="Requests" headStyle={{fontSize: '1.5rem', color: 'var(--primary-blue)'}} bordered={false}> 
                {/* Avalible Requests */}
                    {/* {this.state.requests.map((item, index) => (
                        <Card key={index}>{item.contact_info}</Card>
                    ))} */}

                    {this.state.requests.length > 0 
                    ? <CardList list={this.state.requests} /> 
                    : <div>No Requests to display</div>} 
                    {/* could use empty component */}
                </Card>
            </div>
        )
    }
}
