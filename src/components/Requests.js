import React, { Component } from 'react';
import { database } from '../services/firebase';


export class Requests extends Component {
    // recive current user as prop?
    constructor(props) {
        super(props);

        this.state = {
            requests: undefined,
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
    render() {
        return (
            <div>
                Hello from Requests
            </div>
        )
    }
}
