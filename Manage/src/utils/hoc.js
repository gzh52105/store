import React from 'react'
import { Redirect } from 'react-router-dom';

export function withUser(InputComponent) {
    //接收组件InputComponent作为参数返回一个新的组件OutputComponent
    return function OutputComponent(props) {
        // console.log('OutputComponent',props);
        let userInfo = localStorage.getItem('userInfo');
        try {
            userInfo = JSON.parse(userInfo) || {}
        } catch (err) {
            userInfo = {}
        }
        return (
            <InputComponent {...props} user={userInfo}>
                {props.children}
            </InputComponent>
        )
    }
}

export function withStorage(key){
    return function (InputComponent){
        let value = localStorage.getItem(key);
        try {
            value = JSON.parse(value)
        } catch (err) {
            value = value
        }
        const values = {
            [key]:value
        }
        return class OutputComponent extends React.Component{
            render(){
                return (
                <InputComponent {...this.props} {...values}>
                    {this.props.children}
                </InputComponent>
                )
            }
        }
    }
}

// 定义高阶组件方式二：反向继承
// 利用反向继承实现用户访问权限控制
export function withAuth(InputComponent){
    class OutputComponent extends InputComponent{
        render(){
            return (
                this.props.user._id ?
                super.render()
                :
                <Redirect to="/login" />
            )
        }
    }
    OutputComponent = withUser(OutputComponent);
    return OutputComponent
}

// 利用高阶组件实现页面访问权限控制
// 用户登录后才能访问页面
export function withLogin(InputComponent){
    @withUser
    class OutputComponent extends React.Component{
        render (){
            return  this.props.user.username ?
            <InputComponent {...this.props}>{this.props.children}</InputComponent>
            :
            <Redirect to="/login" />
        }
    }
    return OutputComponent
}