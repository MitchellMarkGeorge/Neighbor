import React, { Component } from 'react'


import { HomeFilled, UserOutlined, UploadOutlined, VideoCameraOutlined, ShoppingCartOutlined, MedicineBoxOutlined, ShoppingOutlined } from '@ant-design/icons'
import './Home.css';
import { Requests } from '../components/Requests'
import { Accepted } from '../components/Accepted';
import { auth, database } from '../services/firebase'
// console.log(auth.currentUser)
import { Layout, Avatar, Button, Menu, Modal, Form, Select, Input } from 'antd';


const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

export class Home extends Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);
        console.log(auth.currentUser);

        this.state = {
            collapsed: false,
            user: auth.currentUser,
            currentMenuKey: '1',
            // requests: undefined,
            showCreateModal: false,
            showInfoModal: false,
            creatButton: false
        }






    }

    componentDidMount() {

    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    onMenuClick = ({ item, key, keyPath, domEvent }) => {
        console.log(key);
        this.setState({ currentMenuKey: key })
    }

    logOut = async () => {
        await auth.signOut();
        // dont need to do this as the component will be unmounted
        // this.setState({user: null});
    }

    showModal = () => {

        // make sure info modal is closed
        this.setState({ showCreateModal: true })
    }

    showInfoModal = () => {
        // make sure create modal is closed
        this.setState({ showInfoModal: true })
    }

    addRequest = (requestObject) => {
        let request_ref = database.ref('requests')

        request_ref.push(requestObject)
    }

    handleChange = (event) => {

    }

    handleOk = async (e) => {
        console.log(e);
        this.setState({creatButton: true})
        try {
            // reconsider order
            let values =  await this.formRef.current.validateFields();
            this.formRef.current.resetFields();
            // chould just ask for it in Modal
            // can also incude timestap for ordering
            let request_object = {...values, requested_by: this.state.user.displayName}
            this.addRequest(request_object);
            console.log(request_object)
            this.setState({
                showCreateModal: false,
                creatButton: false
            });

        } catch (e) {
            this.setState({creatButton: false})
            console.log(e)
        }
        // let values =  await this.formRef.current.validateFields();
        // console.log(values);
        // this.setState({
        //     showCreateModal: false,
        // });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            showCreateModal: false,
        });
    };


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
                            label="Delivery Location"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the delivery location',
                                },
                            ]}
                        >
                            <Input placeholder="Where you want the delivery to be dropped off"/>
                        </Form.Item>

                        <Form.Item
                            name="contact_info"
                            label="Contact"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your prefered contact info',
                                },
                            ]}
                        >
                            <Input placeholder="Prefed contact"/>
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
                            <Input placeholder="e.g: Leave it on the porch"/>
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
                                <Option value="food" label="Food"><ShoppingCartOutlined/> Food</Option>
                                <Option value="medicine" label="Food"><MedicineBoxOutlined/> Medicine</Option>
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
                            <TextArea placeholder="Any extra details you want pople to know about your request"/>
                        </Form.Item>



                    </Form>
                </Modal>

                <Modal>
                            {/* might not even need another modal */}
                </Modal>
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
                            theme="light"
                            collapsible
                            // breakpoint="sm"
                            // collapsedWidth="0"
                            collapsed={this.state.collapsed}
                            onCollapse={this.onCollapse}>
                            {/* <div className="logo" /> */}
                            <div className="user-detials">
                                <Avatar icon={<UserOutlined />}></Avatar>
                                {!this.state.collapsed && <div style={{ margin: '0.5rem 0', fontSize: '1rem' }}>{this.state.user.displayName}</div>}
                            </div>
                            {/* Dark theme */}
                            <Menu theme="light" mode="inline" defaultSelectedKeys={[this.state.currentMenuKey]}
                                onClick={this.onMenuClick}>
                                {/* Think about icons */}
                                <Menu.Item key="1">
                                    <UserOutlined />
                                    <span className="nav-text">Requests</span>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <VideoCameraOutlined />
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
                        <Content className="main-content">
                            {/* <h1>Hello there friends</h1> */}

                            {this.state.currentMenuKey === '1' ? <Requests /> : <Accepted user={this.state.user} />}
                        </Content>
                    </Layout>
                    {/* <Footer>Footer</Footer> */}
                </Layout>
            </>
        )
    }
}
