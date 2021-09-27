import React from 'react'
import request from '@/utils/request';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    message,
} from 'antd';

class Add extends React.Component{
    state = {
        initialValues:{
            username:'',
            password:''
        }
    }

    submit = async(values)=>{
        // console.log('values',values);
        const username = values.name
        const password = values.password
        const regUsername = async(username,password)=>{
            const regUsername = await request.post('/superuserreg',{username,password})
            console.log(regUsername);
        }
        const checkUsername = await request.get('/superusercheck',{username})
        // console.log(checkUsername);
        if(checkUsername==="可以注册"){
            regUsername(username,password)
        }else{
            console.log("创建失败");
        }

    }

    componentDidMount(){

    }
    render () {
        const {initialValues} = this.state;
        return (
            <div>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    layout="horizontal"
                    initialValues={initialValues}
                    onFinish={this.submit}
                >
                    
                    <Form.Item label="管理员名称" name="name" rules={[
                        {
                            required: true,
                            message: '请填写管理员名称',
                        },
                    ]} hasFeedback>
                        <Input />
                    </Form.Item>
                    <Form.Item label="设置密码" name="password" rules={[
                        {
                            required: true,
                            message: '请填写密码',
                        },
                    ]} hasFeedback>
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{
                        offset:4
                    }}>
                        <Button type="primary" htmlType="submit">添加</Button>
                    </Form.Item>
                </Form>
    
            </div>
        )
    }
}

export default Add;