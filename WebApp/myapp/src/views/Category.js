
import React from 'react';
import axios from 'axios';
import {  Card,  SearchBar } from 'antd-mobile';

class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            datalist: [],
            value: '零食'
        };
    }
    goodsdata = () => {
        axios.get('http://120.78.176.155:7777/goods?category=' + this.state.value).then(data => {
            this.setState({
                datalist: data.data,
            });
            console.log(data)
        })

    }

    onChange = (value) => {
        this.setState({ value },()=>{this.goodsdata()})
    }
    componentDidMount() {

        this.goodsdata()
    }

    render() {
        return (
            <div>

                <SearchBar
                    value={this.state.value}
                    placeholder="请输入你需要的商品"

                    showCancelButton
                    onChange={this.onChange}
                />

                {this.state.datalist.map(item => <Card key={item.id}>
                    <Card.Header

                        extra={<span>{item.category}</span>}
                    />
                    <Card.Body >
                        <img style={{ height: '100px', marginRight: '15px' }} src={'http://120.78.176.155:7777' + item.pict_url} alt="" />
                        <span>{item.title}</span>
                    </Card.Body>
                    <Card.Footer content={'￥' + item.real_wap_price} extra={<div>{item.month_sale}</div>} />
                </Card>)}

            </div>
        )
    }
}
export default Category