/*
 * Tencent is pleased to support the open source community by making TKEStack
 * available.
 *
 * Copyright (C) 2012-2023 Tencent. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 * this file except in compliance with the License. You may obtain a copy of the
 * License at
 *
 * https://opensource.org/licenses/Apache-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OF ANY KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations under the License.
 */

import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Banner from './banner';
import './Login.css';
import http from 'src/utils/http';
import cookies from 'src/utils/cookies';

const formLayout = {
  labelCol: { span: 6 },
};

export function Login(): JSX.Element {
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, []);
  const handleSubmit = async (values: any) => {
    const res = await http.post('/apis/login', values);
    console.log(res);
    // TODO：登陆成功后往cookie里写token
    cookies.set('token', '');
  };
  return (
    <div className='root'>
      <Helmet title='欢迎登陆' />
      <div className='banner'>
        <Banner />
      </div>
      <div className='box'>
        <div className='login-form'>
          <div className='form-item'>
            <div className='header'>欢迎登录</div>
          </div>
          <Form name='login' className='inputLine' {...formLayout} onFinish={handleSubmit}>
            <div className='form-item'>
              <Form.Item
                name='username'
                rules={[
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ]}
              >
                <Input allowClear autoFocus prefix={<UserOutlined className='site-form-item-icon' />} placeholder='用户名' />
              </Form.Item>
            </div>
            <div className='form-item'>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}
              >
                <Input.Password autoComplete='off' prefix={<LockOutlined className='site-form-item-icon' />} placeholder='密码' />
              </Form.Item>
            </div>

            <div className='form-item'>
              <Form.Item shouldUpdate={true} style={{ marginBottom: 0 }}>
                {() => (
                  <Button className='submit-btn' loading={loading} htmlType='submit'>
                    登录
                  </Button>
                )}
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}