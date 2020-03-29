import React, { Component } from 'react'
import { database } from '../services/firebase'

import './list.css'
import { Card } from 'antd';
import { CardList } from './CardList';

export class Accepted extends Component {

    constructor(props) {
        super(props);
        this.state = {
            acceptedRequests: [],
            currentRequest: undefined
        }
    }

    componentDidMount() {
        // might make user prop variable
        // could also access from auth object
        const accepted_request_ref = database.ref(`accepted_requests/${this.props.user.uid}`);
        accepted_request_ref.on('value', (snapshot) => {
            let acceptedRequests = []
            snapshot.forEach((item) => {
                acceptedRequests.push(item.val())
            });
            console.log(acceptedRequests);
            this.setState({ acceptedRequests })
        })
    }

    componentWillUnmount() {
        database.ref(`accepted_requests/${this.props.user.uid}`).off();
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

                <Card title="Accepted Requests" bordered={false} headStyle={{fontSize: '1.5rem', color: 'var(--primary-blue)'}}>
                    {/* {this.state.acceptedRequests.map((item, index) => (
                        <Card key={index}>{item.contact_info}</Card>
                    ))} */}

                    {this.state.acceptedRequests?.length > 0
                        ? <CardList list={this.state.acceptedRequests} />
                        : <div>No Accepted Requests to display.</div>}
                </Card>
            </div>
        )
    }
}
