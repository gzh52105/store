import React from 'react';
import { Button, WhiteSpace, WingBlank,Modal,Toast,NoticeBar} from 'antd-mobile';
import {HashRouter as Router} from 'react-router-dom'
import axios from 'axios'

let ButtonExample;
let username=localStorage.getItem('username')
const prompt = Modal.prompt;
async function toreg(login,password){
    const data =await axios.post("http://120.78.176.155:7777/reg",
    {
        username:login,
        password:password
    }
    )
        if(data.data==='注册成功'){
         Toast.success('注册成功 !', 1);
         localStorage.setItem('username',login)
         window.location.reload()
        }else{
         Toast.fail('用户名已经被注册 !', 1);
        }
 };
async function tologin(login,password){
   const data =await axios.post("http://120.78.176.155:7777/login",
   {
       username:login,
       password:password
   }
   )
       if(data.data==='登陆成功'){
        Toast.success('登陆成功 !', 1);
        localStorage.setItem('username',login)
        window.location.reload()
       }else{
        Toast.fail('用户或者密码错误 !', 1);
       }
};
function outlogin(){
    localStorage.removeItem('username')
    window.location.reload()
};
if(username){
    ButtonExample = () => (
        <WingBlank >
          <br/>
          <WhiteSpace size="lg" />
    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
    欢迎您回来,{username}&nbsp;&nbsp;;&nbsp;欢迎您回来,{username};&nbsp;&nbsp;&nbsp;欢迎您回来,{username};&nbsp;&nbsp;&nbsp;欢迎您回来,{username};&nbsp;&nbsp;&nbsp;
    </NoticeBar>
    <WhiteSpace size="lg" />
          <Button type="primary" style={{zIndex:200}} onClick={outlogin}>退出登陆</Button><WhiteSpace />
        </WingBlank>
      );
}else{
    ButtonExample = () => (
        <WingBlank >
          <br/>
        <Button type="primary"  style={{zIndex:200}}onClick={() => prompt(
      '登陆',
      '请输入用户信息',
      (login, password) => {tologin(login,password)},
      'login-password',
      null,
      ['Please input name', 'Please input password'],
    )}
    >登陆</Button><WhiteSpace />
        <Button type="primary" style={{zIndex:200}} onClick={() => prompt(
      '注册',
      '请输入用户信息',
      (login, password) => {toreg(login,password)},
      'login-password',
      null,
      ['Please input name', 'Please input password'],
    )}
    >注册</Button><WhiteSpace />
        </WingBlank>
      );
}

function Mine(){
    return (
        <Router>
        {/* <Route path="/Login" component={Login}/> */}
        <ButtonExample/>
        </Router>
    )
}
export default Mine