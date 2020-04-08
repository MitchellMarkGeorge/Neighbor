import React, { Component } from 'react'
import { useMediaQuery } from 'react-responsive'


import { HomeFilled, UserOutlined, ShoppingCartOutlined, MedicineBoxOutlined, ShoppingOutlined, InboxOutlined, SolutionOutlined, PlusCircleOutlined } from '@ant-design/icons'
import './Home.css';
import { Requests } from '../components/Requests'
import { Accepted } from '../components/Accepted';
import { auth, database } from '../services/firebase'
import axios from 'axios';

// console.log(auth.currentUser)
import { Layout, Avatar, Button, Menu, Modal, Form, Select, Input, message } from 'antd';


const { Header, Sider, Content, Footer } = Layout;
const { Option } = Select;
const { TextArea } = Input;
const LOCATION_IQ_TOKEN = '2046bb1db5b31b'

const Desktop = ({ children }) => { // reconsider this
    const isDesktop = useMediaQuery({ minWidth: 701 })
    return isDesktop ? children : null
  }
  
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 700 })
    return isMobile ? children : null
  }
  
export class Home extends Component {

    formRef = React.createRef();
    usernameRef = React.createRef();
    constructor(props) {
        super(props);
        // console.log(auth.currentUser);

        this.state = {
            collapsed: false,
            user: auth.currentUser,
            currentMenuKey: '1',
            userName: auth.currentUser.displayName,
            
            showCreateModal: false,
            // used if the user already has a username
            // if they dont, a modal will show

            // could also ust this.state.userName
            hasUsername: !!auth.currentUser.displayName,
            creatButton: false
        }






    }


    // locationSuccess = (position) => {
    //     const { latitude, longitude } = position.coords;
    //     this.setState({ latitude, longitude });
    // }

    onCollapse = (collapsed) => {
        // console.log(collapsed);
        this.setState({ collapsed });
    };

    onMenuClick = ({ item, key, keyPath, domEvent }) => {
        // console.log(key);
        this.setState({ currentMenuKey: key })
    }

    logOut = async () => {
        try {
            await auth.signOut();
        } catch (e) {
            console.log(e);
            message.error('Unable to log out')
        }
        
        // dont need to do this as the component will be unmounted
        // this.setState({user: null});
    }

    showModal = () => {

        // make sure info modal is closed
        this.setState({ showCreateModal: true })
    }

    showUsernameModal = () => {
        // make sure create modal is closed
        this.setState({ hasUsername: true })
    }

    addRequest = (requestObject) => {
        let request_ref = database.ref('requests');

        request_ref.push(requestObject)
    }

    
    handleOk = async (e) => {
        // console.log(e);
        this.setState({ creatButton: true })
        try {
            // reconsider order
            let values = await this.formRef.current.validateFields();
            
            // chould just ask for it in Modal
            // can also incude timestap for ordering
            // let request_object = {...values, requested_by: this.state.user.displayName}
            // let resonse  = axios.get(`https://us1.locationiq.com/v1/search.php?key=${LOCATION_IQ_TOKEN}&q=SEARCH_STRING&format=json`)
            // currently restricted to canada
            // move to seperate function
            let response  = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${LOCATION_IQ_TOKEN}&q=${values.delivery_location}&format=json&countrycodes=ca`);
            // WILL FAIL IF LOCATION ISNT GOOD
            let geoData = await response.data;
            //Best result - bind to ottawa
            const [ first ] = geoData;
            let request_object = {
                ...values,
                lat: first.lat,
                long: first.lon,
                user_info: {
                    display_name: this.state.user.displayName,
                    uid: this.state.user.uid
                }
            }
            

            this.addRequest(request_object);
            // console.log(request_object)
            this.formRef.current.resetFields();
            this.setState({
                showCreateModal: false,
                creatButton: false
            });
            message.success('Your reqest has been added to the list!')
        } catch (e) {
            this.setState({ creatButton: false })
            console.log(e)
            // use e.message
            message.error('Unable to create new Request. Please confirm that all of your fields are valid. ')
        }
        // let values =  await this.formRef.current.validateFields();
        // console.log(values);
        // this.setState({
        //     showCreateModal: false,
        // });
    };

    handleCancel = () => {
        
        this.setState({
            showCreateModal: false,
        });
    };

    // setUsername = (event) => {
    //     this.setState({ userName: event.target.value });
    // }

    usernameOk = async () => {
        try {
            // reconsider order
            let values = await this.usernameRef.current.validateFields();
            console.log(values);
            // might be a bit early
            // this.usernameRef.current.resetFields();
            const { user_name } = values;
            await this.state.user.updateProfile({
                displayName: user_name

            })
            this.usernameRef.current.resetFields();
            this.setState({ hasUsername: true, userName: user_name })
        } catch (e) {
            console.log(e);
            message.error(e.message)
        }
    }




    render() {

        return (
            <>
                <Modal
                    visible={this.state.showCreateModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={this.state.creatButton}
                >




                    <Form
                        ref={this.formRef}
                        name="create_form"
                        size="small"
                        layout="vertical"
                        initialValues={{
                            importance: 1,
                            contact_info: this.state.user.email,
                            requested_by: this.state.user.displayName
                        }}
                    >
                        <h1 className="modal-title">Creat a new Request</h1>
                        

                        {/* <Form.Item
                            name="requested_by"
                            label="Requested By"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the name you want to be recognized by',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item> */}
                        {/* Look into good placeholders */}

                        <Form.Item
                            name="delivery_location"
                            label="Delivery Address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the delivery location',
                                },
                            ]}
                        >
                            <Input placeholder="Where you want the delivery to be dropped off" />
                        </Form.Item>

                        <Form.Item
                            name="contact_info"
                            label="Contact info (email or phone number)"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your prefered contact information',
                                },
                            ]}
                        >
                            <Input placeholder="Prefered contact" />
                        </Form.Item>

                        <Form.Item
                            name="delivery_instructions"
                            label="Delivery Instructions"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input delivery instructions',
                                },
                            ]}
                        >
                            <Input placeholder="e.g: Leave it on the porch" />
                        </Form.Item>

                        <Form.Item
                            name="requested_items"
                            label="Requested Items"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your requested items',
                                },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Essential items you need"
                            >
                                {/* Think about icons */}
                                {/* Should i make the value uppercase */}
                                <Option value="food" label="Food"><ShoppingCartOutlined /> Food</Option>
                                <Option value="medicine" label="Food"><MedicineBoxOutlined /> Medicine</Option>
                                <Option value="other" label="Other"><ShoppingOutlined /> Other</Option>

                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="details"
                            label="Details"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input any details about your request"

                                },
                            ]}
                        >
                            <TextArea placeholder="Any details you want people to know about your request" />
                            {/* <p>* Note: You cannot edit Requests after they are created</p> */}
                        </Form.Item>


                        
                    </Form>
                </Modal>
                <Modal
                    visible={!this.state.hasUsername}
                    onOk={this.usernameOk}>

                    <Form
                        ref={this.usernameRef}
                        name="create_form"
                        size="small"
                        layout="vertical">
                        <h1 className="modal-title">Set a username</h1>
                        <Form.Item
                            name="user_name"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your usrname',
                                },
                            ]}
                        >
                            <Input placeholder="Prefered username" />
                        </Form.Item>
                    </Form>


                </Modal>
                <Layout className="layout">
                    <Header>
                        <div className="header-container">
                            <h1>Neighbor <HomeFilled /> </h1>
                            <ul className="header-items">
                                <li ><Button type="danger" onClick={this.logOut}>Log Out</Button></li>
                                {/* <li><Avatar icon={<UserOutlined/>}></Avatar></li> */}

                                {/* {this.state.user.displayName && <Avatar icon={UserOutlined}></Avatar>} */}

                            </ul>
                        </div>
                    </Header>
                    
                    <Layout>
                        <Desktop>
                        <Sider className="sider"
                            theme="light"
                            collapsible
                            // breakpoint="sm"
                            // collapsedWidth="0"
                            collapsed={this.state.collapsed}
                            onCollapse={this.onCollapse}>
                            {/* <div className="logo" /> */}
                            <div className="user-detials">
                                <Avatar icon={<UserOutlined />}></Avatar>
                                {!this.state.collapsed && <div style={{ margin: '0.5rem 0', fontSize: '1rem' }}>{this.state.userName}</div>}
                            </div>
                            {/* Dark theme */}
                            <Menu theme="light" mode="inline" defaultSelectedKeys={[this.state.currentMenuKey]}
                                onClick={this.onMenuClick}>
                                {/* Think about icons */}
                                <Menu.Item key="1">
                                    <SolutionOutlined />
                                    <span className="nav-text">Requests</span>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <InboxOutlined />
                                    <span className="nav-text">Accepted Request</span>
                                </Menu.Item>
                                {/* <Menu.Item key="3">
                                    <UploadOutlined />
                                    <span className="nav-text">COVID 19 Info</span>
                                </Menu.Item> */}
                                {/* <Menu.Item key="4">
                                <UserOutlined />
                                <span className="nav-text">nav 4</span>
                            </Menu.Item> */}
                            </Menu>
                            <div style={{ textAlign: 'center' }}>
                                <Button type="primary" onClick={this.showModal}>{this.state.collapsed ? '+' : 'Create New Request'}</Button>
                            </div>

                        </Sider>
                        </Desktop>
                        <Content className="main-content">
                            {/* <h1>Hello there friends</h1> */}

                            {this.state.currentMenuKey === '1' ? <Requests /> : <Accepted user={this.state.user} />}
                            {/* Should i pass the props */}
                        </Content>
                    </Layout>
                    <Mobile>
                        <Footer className="tab-bar">
                            
                            <div onClick={() => {this.setState({currentMenuKey: '1'})}}>
                                <SolutionOutlined/> 
                                {/* <p>Requests</p> */}
                            </div>

                            <div onClick={() => {this.setState({showCreateModal: true})}}>
                                <PlusCircleOutlined/>
                                {/* <p>Creat New Request</p> */}
                            </div>

                            <div onClick={() => {this.setState({currentMenuKey: '2'})}}>
                                <InboxOutlined/>
                                {/* <p>Accepted Requests</p> */}
                            </div>
                        </Footer>
                    </Mobile>
                </Layout>
            </>
        )
    }
}
