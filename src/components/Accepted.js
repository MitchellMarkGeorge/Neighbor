import React, { Component } from 'react'
import { database } from '../services/firebase'

export class Accepted extends Component {

    constructor(props) {
        super(props);
        this.state = {
            acceptedRequests: undefined,
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
    render() {
        return (
            <div>
                Hello {this.props.user.displayName}
            </div>
        )
    }
}
