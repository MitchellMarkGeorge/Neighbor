import React, { Component } from 'react';
import { database } from '../services/firebase';
import './list.css'
import { CardList } from './CardList';
import { Spin } from 'antd';
import LatLon from 'geodesy/latlon-ellipsoidal-vincenty.js';
import { showNotification } from '../services/auth';

import { Select } from 'antd';

const { Option } = Select;

// import { pageConstants } from '../services/pageConstants'
export class Requests extends Component {
    // recive current user as prop?
    userLocation;
    constructor(props) {
        super(props);

        this.state = {
            requests: [],
            loading: true,
            filterChoice: 'all'

        }
    }

    success = (position) => {
        // console.log('here 2')
        const { latitude, longitude } = position.coords;
        this.userLocation = new LatLon(latitude, longitude);
        // this.lat = latitude;
        // this.long = longitude;
        this.loadRequests();
    }

    error = (e) => {
        console.log(e);
        // message.error('Unable to get location. Loading requests normally')
        showNotification('error', 'Unable to get location', 'Loading requests normally.')
        this.loadRequests();

    }



    componentDidMount() { // will this be called everytime the meny switches
        if (navigator.geolocation) {
            // if the user has geolocation capabilities in their browser
            // if (!this.userLocation)

            // should i save it in the Home component
            // console.log('here')
            // setTimeout for no result
            navigator.geolocation.getCurrentPosition(this.success, this.error);

            // use a setTimeout
        } else {
            // show messgae for no geolocation
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
        // console.log(sorted_array);
        this.setState({ requests: sorted_array, loading: false })
    }

    loadRequests = () => {
        const request_ref = database.ref('requests');
        request_ref.on('value', (snapshot) => {
            let requests = [];
            // if (this.lat && this,)
            snapshot.forEach((item) => {
                let newItem = { ...item.val(), key: item.key }
                if (this.userLocation) {
                    // should i just use the newItem
                    let itemLocation = new LatLon(item.val().lat, item.val().long)
                    // itemLocation.distanceTo
                    newItem['distance'] = this.userLocation.distanceTo(itemLocation);
                    // requests.push(newItem)
                }
                requests.push(newItem)

                // requests.push({...item.val(), key: item.key})
            });
            // console.log(requests);
            if (this.userLocation) {
                this.sortItems(requests);
            } else {
                this.setState({ requests, loading: false })
            }
            // this.setState({ requests })
        })
    }

    componentWillUnmount() {
        // removes all callbacks
        database.ref('requests').off();
    }

    onChange = (filterChoice) => {
        this.setState({ filterChoice })
        // console.log(filterChoice);
    }
    render() {

        let request_array = this.state.filterChoice === 'all'? this.state.requests : this.state.requests.filter(item => item.requested_items.includes(this.state.filterChoice))
        return (
            <div className="base-div" >
                {/* Hello from Requests

                <ul>
                    {this.state.requests.map((item, index) => (
                        <li key={index}>{item.contact_info}</li>
                    ))}
                </ul> */}

                <h1 className="page-title">Requests <Select defaultValue={this.state.filterChoice}
                //  style={{float: 'right', width: '15%'}}  
                className="select-filter"
                 onChange={this.onChange}>
                    <Option value="all">All</Option>
                    <Option value="groceries">Groceries</Option>
                    <Option value="medicine">Medicine</Option>
                    <Option value="other">Other</Option>
                </Select></h1>

                {/* <Spin spinning={this.state.loading}> */}
                {/* // tip="Loading requests..."> */}
                <div className={this.state.loading ? 'spinning-loading' : "list-body"}>


                    <Spin spinning={this.state.loading} size="large">
                        {request_array?.length
                            // || !this.state.loading 
                            // ? <CardList list={this.state.requests} page={this.props.page} />
                            ? <CardList list={request_array} page={this.props.page} />
                            : <div>{!this.state.loading ? 'Nothing to see here!' : ''}</div>}
                        {/* Use Empty component */}
                    </Spin>
                </div>
                {/* </Spin> */}


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
