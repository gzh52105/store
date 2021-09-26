import React from 'react'
import { Table } from 'antd';
import request from '../../utils/request';

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedRowKeys: [],
            data: [],
        };
    }
    getData = async () => {
        const { data } = this.state
        const ajaxData = await request.get('/goodslist')
        // console.log("ajaxData=", ajaxData);
        let totalUsername = ajaxData.map(function (obj) {
            var rObj={}
            var key = obj.id;
            var title = obj.title;
            var category = obj.category;
            var price = `${obj.real_wap_price}元`;
            rObj = {key,title,category,price}
            return rObj;
        })
        // console.log("rObj=",totalUsername );
        this.setState({
            data : totalUsername
        })
    }
    componentDidMount() {
        this.getData();
    }
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        const { selectedRowKeys,data } = this.state;
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
                render:()=>{
                    return (
                        <>
                        <button></button>
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
        return <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
    }
}


export default List;