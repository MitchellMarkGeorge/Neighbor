import React, { Component } from 'react'


import { HomeFilled, UserOutlined, UploadOutlined, VideoCameraOutlined } from '@ant-design/icons'
import './Home.css';
import { auth } from '../services/firebase'
// console.log(auth.currentUser)
import { Layout, Avatar, Button, Menu } from 'antd';

const { Header, Sider, Content } = Layout;

export class Home extends Component {

    constructor(props) {
        super(props);
        console.log(auth.currentUser);

        this.state = {
            user: auth.currentUser
        }




    }

    logOut = async () => {
        await auth.signOut();
        // dont need to do this as the component will be unmounted
        // this.setState({user: null});
    }


    render() {

        return (
            <Layout className="layout">
                <Header>
                    <div className="header-container">
                        <h1>Neighbor <HomeFilled /> </h1>
                        <ul className="header-items">
                            <li ><Button type="primary" danger onClick={this.logOut}>Log Out</Button></li>
                            {/* <li><Avatar icon={<UserOutlined/>}></Avatar></li> */}

                            {/* {this.state.user.displayName && <Avatar icon={UserOutlined}></Avatar>} */}

                        </ul>
                    </div>
                </Header>
                <Layout>
                    <Sider className="sider"
                    theme="light">
                        <div className="logo" />
                        <div className="user-detials">
                            <Avatar icon={<UserOutlined />}></Avatar>
                            <div style={{margin: '0.5rem 0'}}>{this.state.user.displayName}</div>
                        </div>
                        {/* Dark theme */}
                        <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
                            <Menu.Item key="1">
                                <UserOutlined />
                                <span className="nav-text">nav 1</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <VideoCameraOutlined />
                                <span className="nav-text">nav 2</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <UploadOutlined />
                                <span className="nav-text">nav 3</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <UserOutlined />
                                <span className="nav-text">nav 4</span>
                            </Menu.Item>
                        </Menu>
                        <div style={{textAlign: 'center'}}>
                        <Button type="primary">Create new Request</Button>
                        </div>
                        
                    </Sider>
                    <Content className="main-content">loremdnjdnfdfjnjfjnejnejfnjnefjf  ...
          <br />
          Really
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          long
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          content</Content>
                </Layout>
                {/* <Footer>Footer</Footer> */}
            </Layout>
        )
    }
}
