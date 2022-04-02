import React, { useState } from "react";
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined,UserOutlined,UserAddOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
const { SubMenu,Item } = Menu;
//import 'antd/dist/antd.css';

const Header = () => {
    const [current, setCurrent] = useState('home');
    const handleClick = (e) => {
        setCurrent(e.key);
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>
            <SubMenu icon={<SettingOutlined />} title="UserName" >
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
            </SubMenu>
            <Item key="register" icon={<UserAddOutlined />} style={{ position:'absolute',right:80 }}>
            <Link to="/register">Register</Link>
            </Item>
            <Item key="login" icon={<UserOutlined />} style={{ marginLeft: 'auto' }}>
            <Link to="/login">Login</Link>
            </Item>
        </Menu>
    );
}
export default Header;