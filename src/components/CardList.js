import React, { Component } from 'react'
import { Card, Button, message, Descriptions } from 'antd'
import { auth, database } from '../services/firebase'
// remove icons that are not used
import { ShoppingCartOutlined, MedicineBoxOutlined, ShoppingOutlined } from '@ant-design/icons'

function CardExtra({ stateIndex, cardIndex, onItemMore, dismiss }) {
    return (
        <>
            {stateIndex !== cardIndex
                ? <div className="more-text" onClick={() => { onItemMore(cardIndex) }}>More</div>
                : <div className="more-text" onClick={dismiss}>Dismiss</div>}
        </>
    )
}



function CardBody({ item, stateIndex, cardIndex, page }) {

    const addToAccepted = async (item) => {
        let updatedObject = {
            ...item, accepted_user_info: {
                display_name: auth.currentUser.displayName,
                uid: auth.currentUser.uid
            }
        }
        // remove distance
        delete updatedObject["distance"];
        let newAcceptedRequestKey = database.ref(`accepted_requests/${auth.currentUser.uid}`).push().key;
        let updates = {};
        updates[`/requests/${item.key}`] = null;
        updates[`/accepted_requests/${auth.currentUser.uid}/${newAcceptedRequestKey}`] = updatedObject
        try {
            await database.ref().update(updates);
            message.success('Thak you for accepting a new request! Plase contact the user of the request for more details.', 7)
            // message.success('Thak you for accepting a new request! You can see it in the "Accepted Requests" tab. Plase contact the user of the request for more details.')
            // do i need to return it?
        } catch (e) {
            console.log(e);
            message.error('There was an error in accepting this request. Try again later.')
        }
    }

    const onConfirm = async (item) => {
        console.log(item.key)
        try {
            await database.ref(`/accepted_requests/${auth.currentUser.uid}/${item.key}`).remove();
            message.success('Thank you for helping out in your community! Stay safe!')
        } catch (e) {
            message.error('Unable to remove Accepted Request')
        }
    }

    const getElement = (item) => {
        let Element;
        if (page === 'request') {
            if (auth.currentUser.uid !== item.user_info.uid) {
                Element = <Button type="primary" onClick={() => { addToAccepted(item) }}>Accept Request</Button>
            } else { Element = <div>You can not accept your own request.</div> }
        } else {
            Element = (
                // <Popconfirm
                //     title="Are you sure delete this request?"
                //     onConfirm={() => { onConfirm(item) }}
                //     // onCancel={cancel}
                //     okText="Yes"
                //     cancelText="No">
                    <Button type="danger" onClick={() => { onConfirm(item) }}>Complete Request</Button>
                    
                // </Popconfirm>
            )

        }

        return Element;

    }

    const getIconList = (list) => {
        // should justv return it
        let iconList = list.map((item) => {
            let icon; // could just return it outright
            if (item === 'food') {
                icon = <ShoppingCartOutlined />
            } else if (item === "medicine") {
                icon = <MedicineBoxOutlined />
            } else if (item === "other") {
                icon = <ShoppingOutlined />
            }

            return icon;
        })
        console.log(iconList)
        return iconList;
    }
    return (
        <div>
            {stateIndex !== cardIndex

                ? <>
                    {/* might not use h3 */}
                    <h3>Requested By: {item.user_info.display_name}</h3>
                    <h3>Requested Items:{getIconList(item.requested_items).map((icon, index) => (<span key={index} style={{ marginLeft: '0.5rem', color: 'var(--primary-blue)' }}>{icon}</span>))}</h3>
                    {page === "request" && item.distance && <h3>Distance: {item.distance}m away from you</h3>}
                    {/* Should the distance be displyed in accepted */}
                    {/* {<h3>Distance: {item.distance}m away from you</h3>} */}
                </>
                : <>

                    <Descriptions
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                    >
                        {/* title="item_descriptions"> */}
                        <Descriptions.Item label="Requested By">{item.user_info.display_name}</Descriptions.Item>
                        {/* Link to google maps{item.delivery_location} */}
                        <Descriptions.Item label="Delivery Location"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.delivery_location)}`} target="_blank">{item.delivery_location}</a></Descriptions.Item>
                        <Descriptions.Item label="Contact Info">{item.contact_info}</Descriptions.Item>
                        <Descriptions.Item label="Delivery Instructions">{item.delivery_instructions}</Descriptions.Item>
                        <Descriptions.Item label="Requested Items"><p style={{ textTransform: 'capitalize', margin: 0 }}>{item.requested_items.join(', ')}</p></Descriptions.Item>
                        <Descriptions.Item label="Details">{item.details}</Descriptions.Item>
                    </Descriptions>
                    {getElement(item)}
                    {/* <h3>Requested By :</h3> <span>{item.user_info.display_name}</span>
                    
                    <h3>Delivery Location :</h3> <span>{item.delivery_location}</span>
                    <h3>Delivery Location :</h3> <span>{item.delivery_location}</span>
                    <h3>Contact Info :</h3> <span>{item.contact_info}</span>
                    <h3>Delivery Instructions :</h3> <span>{item.delivery_instructions}</span>
                    <h3>Requested Items :</h3> <span>{item.requested_items.join(', ')}</span>
                    <h3>Details :</h3> <span>{item.details}</span>
                    
                    {getElement(item)} */}

                </>}
        </div>
    )
}


export class CardList extends Component {

    state = {
        currentRequestIndex: null
    }

    onItemMore = (index) => {
        this.setState({ currentRequestIndex: index })
    }

    dismiss = () => {
        this.setState({ currentRequestIndex: null })
    }

    // addToAccepted = (item) => {
    //     let updatedObject = {
    //         ...item, accepted_user_info: {
    //             display_name: auth.currentUser.displayName,
    //             uid: auth.currentUseruser.uid
    //         }
    //     }
    //     let newAcceptedRequestKey = database.ref(`accepted_requests/${auth.currentUser.uid}`).push().key;
    //     let updates = {};
    //     updates[`/requests/${item.key}`] = null;
    //     updates[`/accepted_requests/${auth.currentUser.uid}/${newAcceptedRequestKey}`] = updatedObject
    //     return database.ref().update(updates);
    // }

    render() {
        return (
            // should i have a div here
            // style={{overflow: 'auto', height: '300px'}}
            <div style={{ minHeight: '100%' }}>
                {this.props.list.map((item, index) => (

                    <Card hoverable title={item.delivery_location} style={{ marginBottom: '1rem' }}
                        extra={<CardExtra stateIndex={this.state.currentRequestIndex} cardIndex={index} onItemMore={() => { this.onItemMore(index) }} dismiss={this.dismiss} />}
                        key={index}>
                        <CardBody item={item} cardIndex={index} stateIndex={this.state.currentRequestIndex} page={this.props.page} />
                        {/* <h3>Requested By: {item.user_info.display_name}</h3>
                        <h3>Requested Items: {item.requested_items.join(', ')}</h3>
                        {this.state.currentRequestIndex === index && <p>Hello {index}</p>} */}

                    </Card>

                ))}
            </div>

        )
    }
}
