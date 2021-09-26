import React from "react";
import axios from "axios";
import { Card, Button } from "antd-mobile";
class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }

    }

    componentDidMount() {
        console.log(this.props.location.pathname);
        const res = this.props.location.pathname.split('=')
        axios.get('http://120.78.176.155:7777/good?sellerId=' + res[1]).then(data => {
            this.setState({
                data: data.data[0]
            })
        })
    }
    render() {
        console.log(this.state.data);
        return (
            <Card >
                <Card.Header
                    extra={<span>{this.state.data.category}</span>}
                />
                <Card.Body >
                    <img style={{ height: '100px', marginRight: '15px' }} src={'http://120.78.176.155:7777' + this.state.data.pict_url} alt="" />
                    <span>{this.state.data.title}</span>
                </Card.Body>
                <Card.Footer content={'￥' + this.state.data.real_wap_price} extra={<div>{this.state.data.month_sale}</div>} />
                <Button>加入购物车</Button>
            </Card>

        )
    }
}
export default Detail