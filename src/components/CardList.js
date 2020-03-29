import React, { Component } from 'react'
import { Card } from 'antd'


export class CardList extends Component {

    state = {
        currentRequestIndex: null
    }

    onItemMore = (index) => {
        this.setState({ currentRequestIndex: index})
    }

    render() {
        return (
            <>
                {this.props.list.map((item, index) => (
                    <Card hoverable title={item.delivery_location} style={{ marginBottom: '1rem' }} extra={<div className="more-text" onClick={() => {this.onItemMore(index)}}>More</div>} key={index}>
                        {/* Conditionally show more info if state index maches item index */}
                        <p>Requested By: {item.requested_by}</p>
                        <p>Requested Items: {item.requested_items.join(', ')}</p> 
                        {/* Use text or icons */}
                        </Card>
                ))}
            </>

        )
    }
}
