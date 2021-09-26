import React from 'react';
import { List, Checkbox, Flex,Button,Stepper } from 'antd-mobile';
import axios from 'axios';

const CheckboxItem = Checkbox.CheckboxItem;

class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        datalist: [],
        val:1,
        deletelist:[],
        ifdelete:false
    };
}
  onChange1 = (i) => {
    if(this.state.ifdelete===false){
      this.setState({
        datalist:this.state.datalist.filter(it=>it!==i),
        ifdelete:true
      })
      console.log("asdasd",this.state.deletelist);
      const username=localStorage.getItem('username')
      axios.post('http://120.78.176.155:7777/cart/',{
        username,
        goodslist:this.state.datalist
      })
    }
    if(this.state.ifdelete===true){
      this.setState({
        ifdelete:false,
      })
      console.log("adsdasd");
      const username=localStorage.getItem('username')
      axios.post('http://120.78.176.155:7777/cart/',{
        username,
        goodslist:this.state.datalist
      })
    }
  }
  onChange = (val) => {
    
    this.state.datalist.forEach(item=>{
      item.qty=val
    })
    this.setState({ val });
    const username=localStorage.getItem('username')
    axios.post('http://120.78.176.155:7777/cart/',{
      username,
      goodslist:this.state.datalist
    })
  }
  getdata = () => {
    const username=localStorage.getItem('username')
    axios.get('http://120.78.176.155:7777/cart/?username=' + username).then(data => {
        this.setState({
            datalist: data.data.goodslist
        });
        data.data.goodslist.forEach(item=>{
          this.setState({
            val: item.qty
        });
        })
    })
}
// delete=()=>{
//   console.log(this.state.deletelist);
//   if(this.state.deletelist.length>1 ||this.state.deletelist===true){
//     const username=localStorage.getItem('username')
//     axios.post('http://120.78.176.155:7777/cart/',{
//       username,
//       goodslist:this.state.deletelist
//     })
//     this.setState({
//       datalist:this.state.deletelist
//     })
//   }
//   if(this.state.datalist.length===1 ||this.state.deletelist===true){
//     const username=localStorage.getItem('username')
//     axios.post('http://120.78.176.155:7777/cart/',{
//       username,
//       goodslist:[]
//     })
//     this.setState({
//       datalist:[]
//     })
//   }
// }

finish=()=>{
  console.log(this.state.datalist,this.state.ifdelete,this.state.deletelist);
}
componentDidMount() {
    this.getdata()
}
  render() {
    const data =this.state.datalist;
    return (<div >
      <List renderHeader={() => '我的购物车'}>
      {<Button type="primary" size="small" inline style={{marginLeft:130,marginTop:10,zIndex:101}} onClick={this.finish}>结算</Button>}
        {data.map(i => (
          <CheckboxItem key={i.id} onChange={() => this.onChange1(i)} style={{display:'flex'} }>
            <img src={'http://120.78.176.155:7777'+i.pict_url} style={{height:'60px',width:'60px'}} alt=""></img>
            <div>
            {i.title}<br/>
            {i.real_wap_price}
            </div>
          <List>
        <List.Item
          extra={
            <Stepper
              style={{ width: '100%', minWidth: '100px',zIndex:100,marginLeft:-12}}
              showNumber
              max={10}
              min={1}
              value={this.state.val}
              onChange={this.onChange}
            />}
        >
        </List.Item>
      </List>
          </CheckboxItem>
        ))}
      </List>
      <Flex>
      </Flex>
    </div>);
  }
}



function Cart(){
    return (
        <div style={{paddingBottom:50}}>
        <Test />
        </div>
    )
}
export default Cart