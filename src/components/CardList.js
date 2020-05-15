import React, { Component, useState } from 'react'
import { Card, Button, Descriptions, Popconfirm, Popover, Input, Radio } from 'antd'
import { auth, database } from '../services/firebase'
// remove icons that are not used
import { ShoppingCartOutlined, MedicineBoxOutlined, ShoppingOutlined } from '@ant-design/icons'
import axios from 'axios';
import { showNotification } from '../services/auth';
import { pageConstants } from '../services/pageConstants'
function CardExtra({ stateIndex, cardIndex, onItemMore, dismiss }) {
    return (
        <>
            {stateIndex !== cardIndex
                ? <div className="more-text" onClick={() => { onItemMore(cardIndex) }}>More</div>
                : <div className="more-text" onClick={dismiss}>Dismiss</div>}
        </>
    )
}


// let _isMounted = false;
function CardBody({ item, stateIndex, cardIndex, page, dismiss }) {

    const [acceptChoice, setChoice] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    // let _isMounted = false;
    // sould use item argument in most functions
    const deleteRequest = async (item) => {
        dismiss(); // delete from user_requests
        // let itemRef = database.ref(`requests/${item.key}`);

        

        // try {
        //     await itemRef.remove();
        //     // message.success('Request deleted');
        //     showNotification('success', 'Request deleted', null);
        // } catch (e) {
        //     console.log(e);
        //     // message.error('There was an error in deleting this request')
        //     showNotification('error', 'There was an error in deleting this request', null)
        // }

        let updates = {};
        updates[`requests/${item.key}`] = null;
        updates[`/user_requests/${auth.currentUser.uid}/${item.key}`] = null;

        try {
            await database.ref().update(updates)
            showNotification('success', 'Request deleted', null);
        } catch (e) {
            console.log(e);
            showNotification('error', 'There was an error in deleting this request', null)
        }
        
    

    }
    const addToAccepted = async (item) => {
        // console.log()
        const accepted_user_info = {
            accepted_user_info: {
                display_name: auth.currentUser.displayName,
                uid: auth.currentUser.uid,
                email: auth.currentUser.email,
                // add contact info
                // contact_info: phoneNumber || auth.currentUser.email 
                contact_info: acceptChoice === 'phone' ? phoneNumber : auth.currentUser.email 
                // can also use tenerary operator
            }

        }
        let updatedObject = {
            ...item, ...accepted_user_info
        }
        // remove distance so it is not saved in database
        delete updatedObject["distance"];
        // might delete key property
        // delete updatedObject["key"]; // do i ne
        let newAcceptedRequestKey = database.ref(`accepted_requests/${auth.currentUser.uid}`).push().key;
        let updates = {};
        // this removes the item from request list and into the accepted request list
        updates[`/requests/${item.key}`] = null;

        // if (updatedObject.user_info.uid === auth.currentUser.uid) {
            // updates user request page
        updates[`/user_requests/${item.user_info.uid}/${item.key}`] = updatedObject; // should only create accepted_user_info key
        // }

        updates[`/accepted_requests/${auth.currentUser.uid}/${newAcceptedRequestKey}`] = updatedObject
        try {
            await database.ref().update(updates);
            dismiss();
            if (phoneNumber) {
                setPhoneNumber('');
            }
            // message.success('Thank you for accepting a new request! The user\'s contact information will be revealed to you and you can contact the creator of this request.', 7)
            showNotification('success', 'Thank you for accepting a new request!', "The user's contact information will be revealed to you and you can contact the creator of this request.", 5)
            // message.success('Thak you for accepting a new request! You can see it in the "Accepted Requests" tab. Plase contact the user of the request for more details.')

            // Should i actually call it after request hs been sent to server?

            //Email server - use localhost:5000 in development


            await axios.post('https://hidden-headland-25369.herokuapp.com/email', {
                updated_object: updatedObject,
                // accepting_user_email: auth.currentUser.email
            });
        } catch (e) {
            console.log(e);
            // message.error('An error occured in accpting this request.')
            showNotification('error', 'An error occured in accpting this request', null)
        }
    }

    const onConfirm = async (item) => {
        // console.log(item.key)
        try {
            await database.ref(`/accepted_requests/${auth.currentUser.uid}/${item.key}`).remove();
            // if there
            dismiss(); // should i call it earlier
            // message.success('Thank you for helping out in your community! Stay safe!');
            showNotification('success', 'Thank you for helping out in your community!', 'Stay safe!');
        } catch (e) {
            // message.error('Unable to remove Accepted Request')
            showNotification('error', 'Unable to remove accepted request', null)
        }
    }

    const radioChoiceChange = (e) => {
        setChoice(e.target.value);
    }

    const phoneInputChange = (e) => {
        setPhoneNumber( e.target.value.trim() );
    }

    const PopOverText = (item) => {

        // option must be accepted and if phone is accepted, there must be a value in the input
        const shouldBeDisabled = !acceptChoice || (acceptChoice === 'phone' && !phoneNumber);
        // console.log(shouldBeDisabled)
        return <div>
            <p>Do you want to use: </p>

            <Radio.Group onChange={radioChoiceChange} value={acceptChoice}> 
            {/* should email be default */}
                <Radio value='email'>Email</Radio>
                <Radio value='phone'>Phone Number</Radio>
            </Radio.Group>
            {acceptChoice === 'phone' && <div style={{margin: '1rem 0'}}>
                {/* should i only allow numbers???? */}
            <Input size="small" type="tel" allowClear placeholder="Input phone number" onChange={phoneInputChange}/>
            </div> }

            <Button type="primary" className="comfirm-button"  disabled={shouldBeDisabled} onClick={() => { addToAccepted(item) }}>Confirm</Button> 
            {/* add onClick */}

            

        </div>
    }

    const getElement = (item) => {
        let Element;
        if (page === pageConstants.REQUESTS_PAGE || page === pageConstants.MY_REQUESTS_PAGE) {
            // making sure where users cannot accept thier own request
            if (auth.currentUser.uid === item.user_info.uid) {

                Element = (
                    <Popconfirm
                        
                        placement="bottom"
                        title="Are you sure you want to delete this request?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteRequest(item)}

                    >
                        <Button type="danger">Delete Request</Button>
                    </Popconfirm>
                )

                // } else { Element = <div>You can not accept your own request.</div>  } // might have a Retract Request button
            } else {

                Element = 
                <Popover title="Contact Info" content={PopOverText(item)} trigger="click" placement="bottom">
                    <Button type="primary" className="accept-button" 
                    // onClick={() => { addToAccepted(item) }}
                    >Accept Request</Button>
                </Popover>
                

            } // might have a Retract Request button
        } else if (page === pageConstants.ACCEPTED_REQUESTS_PAGE) {
            // Accepted or user
            Element = (<Button type="danger" onClick={() => { onConfirm(item) }}>Complete Request</Button>)

        } 

        return Element;

    }

    const getName = (user_display_name, user_uid) => { // name nd uid parameters
        // This method helps user distingush which requests are their own using their uid

        return user_uid === auth.currentUser.uid ? user_display_name + ' (You)' : user_display_name;

    }

    const getIconList = (list) => {
        // should justv return it
        let iconList = list.map((item) => {
            let icon; // could just return it outright
            if (item === 'groceries') {
                icon = <ShoppingCartOutlined />
            } else if (item === "medicine") {
                icon = <MedicineBoxOutlined />
            } else if (item === "other") {
                icon = <ShoppingOutlined />
            }

            return icon;
        })
        // console.log(iconList)
        return iconList;
    }
    // only if item exists

    const requested_by_name = getName(item?.user_info?.display_name, item?.user_info?.uid);

    return ( // protect user info

        <div>
            {stateIndex !== cardIndex

                ? <>
                    {/* might not use h3 */}
                    {/* <h3>Requested By: {getName(item.user_info.uid)}</h3> */}
                    <h3>Requested By: {requested_by_name}</h3>
                    <h3>Requested Items:{getIconList(item.requested_items).map((icon, index) => (<span key={index} style={{ marginLeft: '0.5rem', color: 'var(--primary-blue)' }}>{icon}</span>))}</h3>
                    {page === pageConstants.REQUESTS_PAGE && item.distance && <h3>Distance: {Number(item.distance / 1000).toFixed(1)}km away from you</h3>}
            {page === pageConstants.MY_REQUESTS_PAGE && item.accepted_user_info && <h3>Accepted By: {item.accepted_user_info.display_name}</h3>}
                    {/* Should the distance be displyed in accepted */}
                    {/* {<h3>Distance: {item.distance}m away from you</h3>} */}
                </>
                : <>

                    <Descriptions
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                    >
                        {/* Privacy for users */}
                        {/* title="item_descriptions"> */}
                        {/* <Descriptions.Item label="Requested By">{getName(item.user_info.uid)}</Descriptions.Item> */}
                        {/* Should this still be shown on My Request Page? */}
                        <Descriptions.Item label="Requested By">{requested_by_name}</Descriptions.Item>
                        {/* Link to google maps{item.delivery_location} */}
                        {/* {<Descriptions.Item label="Delivery Location"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.delivery_location)}`} target="_blank" rel="noopener noreferrer">{item.delivery_location}</a></Descriptions.Item>} */}
                        {/* {(page === pageConstants.ACCEPTED_REQUESTS_PAGE || page === pageConstants.MY_REQUESTS_PAGE) && <Descriptions.Item label="Contact Info">{item.contact_info}</Descriptions.Item>}
                        {(page === pageConstants.ACCEPTED_REQUESTS_PAGE || page === pageConstants.MY_REQUESTS_PAGE) && <Descriptions.Item label="Delivery Instructions">{item.delivery_instructions}</Descriptions.Item>} */}

                        {(page === pageConstants.ACCEPTED_REQUESTS_PAGE || page === pageConstants.MY_REQUESTS_PAGE) && <>
                            <Descriptions.Item label="Delivery Location"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.delivery_location)}`} target="_blank" rel="noopener noreferrer">{item.delivery_location}</a></Descriptions.Item>
                            <Descriptions.Item label="Contact Info">{item.contact_info}</Descriptions.Item>
                            

                         </>}

                         <Descriptions.Item label="Delivery Instructions">{item.delivery_instructions}</Descriptions.Item>

                        <Descriptions.Item label="Requested Items"><p style={{ textTransform: 'capitalize', margin: 0 }}>{item.requested_items.join(', ')}</p></Descriptions.Item>
                        <Descriptions.Item label="Details">{item.details}</Descriptions.Item>
                        {(page === pageConstants.MY_REQUESTS_PAGE && item.accepted_user_info) && <>
                        <Descriptions.Item label="Accepted By">{item.accepted_user_info.display_name}</Descriptions.Item>
                        <Descriptions.Item label="Accepting User Contact">{item.accepted_user_info.contact_info}</Descriptions.Item>
                        </>}
                        {/* {page === 'request' && <div>For the sake of privacy, the user's contact information will not be shown.</div>} */}
                    </Descriptions>
                    {getElement(item)}


                </>}
        </div>
    )
}


export class CardList extends Component {
    _isMounted = false
    state = {
        currentRequestIndex: null
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    onItemMore = (index) => {
        this.setState({ currentRequestIndex: index })
    }

    dismiss = () => {
        // prevents setting state if compoent isnt there anymore

        // test by removing last request in array
        //TESTED: WORKS!
        if (this._isMounted) {
            this.setState({ currentRequestIndex: null })
        }
    }

    onClick = (index) => {
        // if open, dismiss
        // if clased, open

        if (index === this.state.currentRequestIndex) {
            this.dismiss();
        } else {
            this.onItemMore(index);
        }
    }


    render() {
        return (
            // should i have a div here
            // style={{overflow: 'auto', height: '300px'}}
            // used minHeight
            <div style={{ height: '100%' }}>
                {this.props.list.map((item, index) => (

                    <Card title={item.neighborhood} style={{ marginBottom: '1rem' }}
                        headStyle={{ color: 'var(--primary-blue)' }} // bold Title
                        extra={<CardExtra stateIndex={this.state.currentRequestIndex} cardIndex={index} onItemMore={() => { this.onItemMore(index) }} dismiss={this.dismiss} />}
                        key={index}
                        // onClick={() => { this.onClick(index)}}
                        >
                        <CardBody item={item} cardIndex={index} stateIndex={this.state.currentRequestIndex} page={this.props.page} dismiss={this.dismiss} />


                    </Card>

                ))}
            </div>

        )
    }
}
