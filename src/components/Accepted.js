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
            
        }
    }

    componentDidMount() {
        // might make user prop variable
        // could also access from auth object
        const accepted_request_ref = database.ref(`accepted_requests/${this.props.user.uid}`);
        accepted_request_ref.on('value', (snapshot) => {
            let acceptedRequests = [];
            snapshot.forEach((item) => {
                acceptedRequests.push({ ...item.val(), key: item.key })
            });
            console.log(acceptedRequests);
            this.setState({ acceptedRequests, loading: false })
        })
    }

    componentWillUnmount() {
        // might just use auth.currentUser.uid
        database.ref(`accepted_requests/${this.props.user.uid}`).off();
    }
    render() {
        return (
            <div className="base-div">
                

                <h1 className="page-title">Accepted Requests</h1>

                <div className={this.state.loading ? 'spinning-loading': "list-body"}>

                        
                        <Spin spinning={this.state.loading} size="large">
                        {this.state.acceptedRequests?.length 
                        // || !this.state.loading 
                            ? <CardList list={this.state.acceptedRequests} page="accepted" />
                            : <div>{!this.state.loading? 'You have not accepted any requests yet.': ''}</div>}
                        
                        </Spin>
                    </div>

                
            </div>
        )
    }
}
