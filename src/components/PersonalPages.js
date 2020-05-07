import React, { Component } from 'react'

import { database, auth } from '../services/firebase'

import './list.css'
import { CardList } from './CardList';
import { Spin } from 'antd';

// import { pageConstants } from '../services/pageConstants'

export class PersonalPages extends Component {
    userID;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            list: []

        }
        
        const { listPath } = this.props;
        this.userID = auth.currentUser.uid;
        this.list_path = `${listPath}/${this.userID}`;
        // console.log(this.list_path)
        // this
    }

    componentDidMount() {

        // const { list_path } = this.props;
        // might make user prop variable
        // could also access from auth object
        // used to use prop but was inconsistent
        const list_ref = database.ref(this.list_path);
        list_ref.on('value', (snapshot) => {
            let list = [];
            snapshot.forEach((item) => {
                list.push({ ...item.val(), key: item.key })
            });
            // console.log(list)
            // console.log(acceptedRequests);
            this.setState({ list, loading: false })
        })
    }

    componentWillUnmount() {
        // const { list_path } = this.props;
        // might just use auth.currentUser.uid
        database.ref(this.list_path).off();
    }

    render() {
        const { title, page } = this.props;
        return (
            <div className="base-div">


                <h1 className="page-title">{title}</h1>

                <div className={this.state.loading ? 'spinning-loading' : "list-body"}>


                    <Spin spinning={this.state.loading} size="large">
                        {this.state.list?.length
                            // || !this.state.loading 
                            ? <CardList list={this.state.list} 
                            // page={pageConstants.ACCEPTED_REQUESTS_PAGE}
                            page={page} 
                            />
                            : <div>{!this.state.loading ? 'Nothing to be seen here!' : ''}</div>} 
                            {/* use the empty component */}

                    </Spin>
                </div>


            </div>
        )
    }
}
