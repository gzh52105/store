import React, { useState } from 'react'
import { Button, Table, Popconfirm, message, Row, Col, Modal, Form, Input, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, AudioOutlined } from '@ant-design/icons'
import request from '@/utils/request'
import moment from 'moment'
import Password from 'antd/lib/input/Password'


class List extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            datalist: [],
            total: 0,
            pageSize: 10,
            page: 1,
            selectedRowKeys: [],
            isModalVisible: false,
            row: '',
            initialValues: {
                username: '',
                password: '',
                remenber: true
            },
        }

    }
    getData = async () => {
        // const { page, pageSize } = this.state;
        const data = await request.get('/userlist')
        // const data1 = data.map(username)
        // console.log("data", data);
        let totalUsername = data.map(function (obj) {
            var rObj = obj.username;
            return rObj;
        })
        this.setState({
            datalist: totalUsername,
        })
    }
    addItem = () => {
        this.props.history.push('/class/add');
    }

    submit = async (values) => {
        //传入username、newuser、newpsw 参数名称必须与接口一致
        const { row } = this.state;
        const username = row
        const newuser = values.username;
        const newpsw = values.password;
        // console.log(row,newuser,newpsw);
        const data = await request.put('/userlist', { username, newuser, newpsw })
        console.log('data=',data); 
        this.setState({
            isModalVisible: false,
        
        })
        window.location.reload()
    }
    showModal = async (iddata) => {
        console.log("iddata=",iddata);
        this.setState({
            isModalVisible: true,
            row: iddata
        })
    };
    hideModal = () => {
        this.setState({
            isModalVisible: false
        })
    }
    handleOk = () => {
        this.setState({
            isModalVisible: false
        })
    };
    onSearch = value => {
        // console.log(value)
        const { datalist } = this.state
        const signelData = datalist.filter(item => item === value)
        // console.log('signelData=',signelData);
        this.setState({
            datalist: signelData
        })

    };
    deleteItem = async (id) => {
        const { datalist, total } = this.state;
        const data = await request.delete('/class/' + id)
        // console.log(data)
        if (data.code === 204) {
            message.success('删除成功')

            // 删除成功后操作
            // 1. 重新获取一次
            // 2. 删除本地数据
            this.setState({
                datalist: datalist.filter(item => item._id !== id),
                total: total - 1
            })
        } else {
            message.error('删除失败')
        }
    }
    deleteItems = async () => {
        const { datalist, total, selectedRowKeys } = this.state;
        if (selectedRowKeys.length === 0) {
            message.warning('请选择删除的班级')
            return;
        }
        const data = await request.delete('/class/', {}, {
            data: {
                ids: selectedRowKeys
            }
        })
        // console.log(data)
        if (data.code === 204) {
            message.success('删除成功')

            // 删除成功后操作
            // 1. 重新获取一次
            // 2. 删除本地数据
            this.setState({
                page: 1,
                pageSize: 10
            }, () => {
                this.getData()

            })
        } else {
            message.error('删除失败')
        }
    }
    componentDidMount() {
        this.getData();
    }

    render(row) {
        const { datalist, total, isModalVisible, initialValues } = this.state;
        const columns = [
            {
                title: '用户名',
                dataIndex: 'name',
                // 控制数据显示格式
                render: (text, datalist, index) => {
                    //   console.log('index',index)
                    return (
                        <div>{datalist}</div>
                    )
                },
            },
            {
                title: '添加时间',
                dataIndex: 'add_time',
                render(text) {
                    return moment(text).format('YYYY/MM/DD')
                }
            },
            {
                title: '操作',
                width: 100,
                render: (row) => {
                    return (
                        <>
                            <Button type="primary" size="small" ghost onClick={this.showModal.bind(this, row)}>编辑
                            </Button>
                            {/* this.editItem.bind(this, row._id) 获取要修改的id*/}

                            <Popconfirm
                                title="确认删除"
                                onConfirm={this.deleteItem.bind(this, row._id)}
                                okText="确认"
                                cancelText="取消"
                            >
                                <Button type="primary" size="small" ghost danger>删除</Button>
                            </Popconfirm>
                        </>
                    )
                }
            },
        ];
        const pagination = {
            size: 'small',
            total,
            pageSize: 10,
            showTotal(total) {
                return `共 ${total} 条记录`
            },
            onChange: (page, pageSize) => {
                console.log('page', page, pageSize)
                this.setState({
                    page,
                    pageSize
                }, () => {
                    this.getData();
                })
            }
        }
        const rowSelection = {
            type: 'checkbox',
            onChange: (selectedRowKeys) => {
                this.setState({
                    selectedRowKeys
                })
            }
        }
        const rules = {
            newuser: [
                { require: true, message: '请填写用户名' }
            ],
            newpsw: [
                { require: true, message: '请填写密码' }
            ]
        }
        const { Search } = Input
        return (
            <div>
                <Space direction="vertical">
                    <h3>请输入要搜索的ID</h3>
                    <Search size='middle' placeholder="请输入要搜索的内容" onSearch={this.onSearch} enterButton />
                </Space>
                <Table
                    style={{ marginTop: 20 }}
                    //rowKey 
                    rowKey={function (recode) {
                        return recode
                    }}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={datalist}
                    pagination={pagination}
                />
                <Modal title="编辑用户账号与密码" visible={isModalVisible} onOk={this.handleOk} onCancel={this.hideModal}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={initialValues}
                        onFinish={this.submit}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={rules.newuser}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={rules.newpsw}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={this.submit}>
                                确认修改
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default List;