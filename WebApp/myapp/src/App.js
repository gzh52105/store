// import logo from './logo.svg';
// import './App.css';
import { TabBar } from 'antd-mobile';
import React from 'react'
import { HashRouter, BrowserRouter, Route, Redirect, Switch, Link, NavLink,withRouter } from 'react-router-dom'

class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: !false,
      menu:[
        {
          text:"首页",
          icon:"url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg)",
          selectedIcon:"url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg)",
          selected:"blueTab",
          path:'/home'
        },
        {
          text:"分类",
          icon:"url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg)",
          selectedIcon:"url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg)",
          selected:"redTab",
          path:'/category'
        },
        {
          text:"购物车",
          icon:"url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg)",
          selectedIcon:"url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg)",
          selected:"greenTab",
          path:'/cart'
        },
        {
          text:"我的",
          icon:"url(https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg)",
          selectedIcon:"url(https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg)",
          selected:"yellowTab",
          path:'/my'
        }
      ]
    };
  }

  renderContent(pageText) {
      return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
      </div>
    );
  }

  render() {
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          {this.state.menu.map(item=>{
            return <TabBar.Item
            title={item.text}
            key={item.text}
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: item.icon+'center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: item.selectedIcon+' center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === item.selected}
            // badge={1}
            onPress={() => {
              this.setState({
                selectedTab: item.selected,
              });
            }}
            data-seed="logId"
          >
            {this.renderContent(item.text)}
          </TabBar.Item>
          })}
        </TabBar>
      </div>
    );
  }
}
function App() {
  return (
    <div>
    <TabBarExample />
    </div>
  );
}

export default App;
