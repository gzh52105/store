import React from 'react'
import { Table, Drawer, Form, Button, Col, Row, Input, Select, Space } from 'antd';
import { EditOutlined, LineHeightOutlined } from '@ant-design/icons';
import request from '../../utils/request';

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedRowKeys: [],
            data: [],
            visible: false,
            optionData: [],
        };
    }
    getData = async () => {
        const { data } = this.state
        const ajaxData = await request.get('/goodslist')
        // console.log("ajaxData=", ajaxData);
        let totalUsername = ajaxData.map(function (obj) {
            var rObj = {}
            var key = obj.id;
            var title = obj.title;
            var category = obj.category;
            var price = `${obj.real_wap_price}元`;
            var sellerId = obj.sellerId
            var categoryvalue = obj.categoryvalue
            rObj = { key, title, category, price, sellerId, categoryvalue }
            return rObj;
        })
        // console.log("rObj=",totalUsername );
        this.setState({
            data: totalUsername
        })
    }
    getCategory = () => {
        const { data, optionData } = this.state
        // console.log(data);
        let category = data.map(function (obj) {
            var category = obj.category;
            var categoryvalue = obj.categoryvalue;
            return { category, categoryvalue };
        })
        let singleData = () => {
            let map = new Map();
            for (let item of category) {
                if (!map.has(item.category)) {
                    map.set(item.category, item)
                }
            }
            return [...map.values()]
        }
        let newSingleData = singleData()
        console.log(newSingleData);
        this.setState({
            optionData: newSingleData
        })
    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    showDrawer = async (id) => {
        console.log("id=", id);
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    componentDidMount() {
        this.getData();
    }
    render(row) {
        const { selectedRowKeys, data, optionData } = this.state;
        const { Option } = Select;
        //定义表头标题
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'title',
            },
            {
                title: '商品类别',
                dataIndex: 'category',
            },
            {
                title: '商品价格',
                dataIndex: 'price',
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (row) => {
                    return (
                        <>
                            <Button type="primary" onClick={this.showDrawer.bind(this, row)} icon={<EditOutlined />}>
                                商品信息修改
                            </Button>
                        </>
                    )
                }
            },
        ];
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                Table.SELECTION_NONE,
                {
                    key: 'odd',
                    text: 'Select Odd Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return false;
                            }
                            return true;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
                {
                    key: 'even',
                    text: 'Select Even Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return true;
                            }
                            return false;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
            ],
        };
        return (
            <>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                />
                <Drawer
                    title="修改商品"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="sellerId"
                                    label="商品ID"
                                >
                                    <Input placeholder={data.sellerId} disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="title"
                                    label="原商品名称"
                                >
                                    <Input placeholder={data.title} disabled />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="newtitle"
                                    label="商品名称"
                                    rules={[{ required: true, message: '请输入商品名称' }]}
                                >
                                    <Input placeholder="请输入商品名称" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="owner"
                                    label="商品类型"
                                    rules={[{ required: true, message: '请选择相应的商品类型' }]}
                                >
                                    <Select placeholder="请选择相应的商品类型">
                                        {
                                            optionData.map(item => {
                                                return <Option key={item.categoryvalue} value={item.categoryvalue}>{item.category}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="price"
                                    label="商品价格"
                                    rules={[{ required: true, message: '请输入商品价格' }]}
                                >
                                    <Input placeholder="请输入商品价格" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Button onClick={this.getCategory} type="primary">
                                    提交新商品
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>

            </>
        );
    }
}


export default List;