import React, { Component } from 'react'
import { database } from '../services/firebase'

import './list.css'
import { CardList } from './CardList';
import { Spin } from 'antd';

export class Accepted extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
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
                acceptedRequests.push({ ...item.val(), key: item.key })
            });
            console.log(acceptedRequests);
            this.setState({ acceptedRequests, loading: false })
        })
    }

    componentWillUnmount() {
        database.ref(`accepted_requests/${this.props.user.uid}`).off();
    }
    render() {
        return (
            <div className="base-div">
                {/* Hello from Requests

                <ul>
                    {this.state.requests.map((item, index) => (
                        <li key={index}>{item.contact_info}</li>
                    ))}
                </ul> */}

                <h1 className="page-title">Accepted Requests</h1>

                <div className={this.state.loading ? 'spinning-loading': "list-body"}>

                        
                        <Spin spinning={this.state.loading} size="large">
                        {this.state.acceptedRequests?.length 
                        // || !this.state.loading 
                            ? <CardList list={this.state.acceptedRequests} page="accepted" />
                            : <div>{!this.state.loading? 'You have not accepted any requests yet.': ''}</div>}
                        {/* Use Empty component */}
                        </Spin>
                    </div>

                {/* <Card title="Accepted Requests" bordered={false} headStyle={{fontSize: '1.5rem', color: 'var(--primary-blue)'}}
                bodyStyle={{ overflow: 'auto', height: '100%'}}>
                    

                    {this.state.acceptedRequests?.length > 0
                        ? <CardList list={this.state.acceptedRequests} />
                        : <div>No Accepted Requests to display.</div>}
                </Card> */}
            </div>
        )
    }
}
