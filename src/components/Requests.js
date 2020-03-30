import React, { Component } from 'react';
import { database } from '../services/firebase';


import './list.css'
import { CardList } from './CardList';
import { message } from 'antd';
import LatLon from 'geodesy/latlon-ellipsoidal-vincenty.js';
// import { distance } from '../services/distance';

export class Requests extends Component {
    // recive current user as prop?
    userLocation
    constructor(props) {
        super(props);

        this.state = {
            requests: [],
            currentRequest: undefined
        }
    }

    success = (position) => {
        const { latitude, longitude } = position.coords;
        this.userLocation = new LatLon(latitude, longitude)
        // this.lat = latitude;
        // this.long = longitude;
        this.loadRequests();
    }

    error = (e) => {
        console.log(e);
        message.error('Unable to get location. Loading requsts normally')

        this.loadRequests();

    }

    

    componentDidMount() { // will this be called everytime the meny switches
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.success, this.error);
        } else {
            this.loadRequests();

        }
        // console.log('Request component mounting...')
        // const request_ref = database.ref('requests');
        // request_ref.on('value', (snapshot) => {
        //     let requests = []
            
        //     snapshot.forEach((item) => {
        //         requests.push({...item.val(), key: item.key})
        //     });
        //     console.log(requests);
        //     this.setState({ requests })
        // })
    }

    sortItems = (array) => {
        let sorted_array = array.sort((a, b) => a.distance - b.distance);
        console.log(sorted_array)
        this.setState({requests: sorted_array})
    }

    loadRequests = () => {
        const request_ref = database.ref('requests');
        request_ref.on('value', (snapshot) => {
            let requests = []
            // if (this.lat && this,)
            snapshot.forEach((item) => {
                let newItem = {...item.val(), key: item.key}
                if (this.userLocation) {
                    // should i just use the newItem
                    let itemLocation = new LatLon(item.val().lat, item.val().long)
                    // itemLocation.distanceTo
                    newItem['distance'] = this.userLocation.distanceTo(itemLocation);
                    requests.push(newItem)
                } else {
                    requests.push({...item.val(), key: item.key})
                }
                // requests.push({...item.val(), key: item.key})
            });
            console.log(requests);
            if (this.userLocation) {
                this.sortItems(requests);
            } else {
                this.setState({ requests })
            }
            // this.setState({ requests })
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
