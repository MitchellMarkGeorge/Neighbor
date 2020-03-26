import React, { Component } from 'react'


// const { Header, Sider, Content } = Layout;
import './Home.css';
import { auth } from '../services/firebase'
// console.log(auth.currentUser)

export class Home extends Component {

    constructor(props) {
        super(props);
        console.log(auth.currentUser);

        

        
    }


    render() {
        
        return (
           <div> Home </div>
        )
    }
}
