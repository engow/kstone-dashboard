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

import {
  ConfigProvider,
  Dropdown,
  Layout as AntdLayout,
  Menu,
  Button,
} from 'antd';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { LockOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import Banner from './banner';
import './Login.css';
import http from 'src/utils/http';
import cookies from 'src/utils/cookies';
import logo from '../../../src/logo.png';
import { useTranslation } from 'react-i18next';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

const { Header, Content, Sider } = AntdLayout;
const { SubMenu } = Menu;

const formLayout = {
  labelCol: { span: 6 },
};

export function Login(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { i18n } = useTranslation();
  const lang = localStorage.getItem('locale');

  const handleSubmit = async (values: any) => {
    const res = await http.post('/apis/login', values);
    console.log(res);
    // TODO：登陆成功后往cookie里写token
    cookies.set('token', '');
  };
  const handleMenuClick = (e: any) => {
    if (e.key === '1') {
      i18n.changeLanguage('zh-CN');
      localStorage.setItem('locale', 'zh-CN');
    }
    if (e.key === '2') {
      i18n.changeLanguage('en-US');
      localStorage.setItem('locale', 'en-US');
    }
    window.location.reload();
  };
  const menus = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">中文</Menu.Item>
      <Menu.Item key="2">English</Menu.Item>
    </Menu>
  );

  useEffect(() => {}, []);

  return (
    <AntdLayout style={{ height: '100%' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: 0 }}>
        <div className="logo">
          <img src={logo} alt="logo" width="120px" />
          {/* <div
            className="exit"
            onClick={() => {
              handleLogOut();
            }}
          >
            退出
          </div> */}
          <Dropdown overlay={menus} trigger={['click', 'hover']}>
            <Button type="link" className="ant-dropdown-link" onClick={(e: any) => e.preventDefault()}>
              {lang === 'zh-CN' ? '中文' : 'English'} <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content style={{ marginTop: '50px', height: '100%' }}>
      </Content>
    </AntdLayout>
  );
}