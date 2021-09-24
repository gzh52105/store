import React from 'react';
import axios from 'axios';
import { Card, Pagination, SearchBar } from 'antd-mobile';





class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            datalist: [],
            pagenum: 6,
            total: 92
        };
    }
    getdata = () => {
        axios.get('http://120.78.176.155:7777/lists?pagenum=' + this.state.pagenum).then(data => {
            this.setState({
                datalist: data.data,
            });
            console.log(data)
        })

    }

    onChange = (value) => {
        this.setState({ value }, () => { this.getdata() })
    }
    componentDidMount() {

        this.getdata()
    }


    render() {
        const locale = {
            prevText: 'Prev',
            nextText: 'Next',
        };
        return (
            <div>

                <div className="pagination-container" >
                    <Pagination total={5} current={1} locale={locale} />
                </div>

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
                        <img style={{ height: '65px', marginRight: '15px' }} src={'http://120.78.176.155:7777' + item.pict_url} alt="" />
                        <span>{item.title}</span>
                    </Card.Body>
                    <Card.Footer content={'￥' + item.real_wap_price} extra={<div>{item.month_sale}</div>} />
                </Card>)}


            </div>
        )
    }



}


export default Home