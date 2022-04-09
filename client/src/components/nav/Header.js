import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
const { SubMenu, Item } = Menu;



const Header = () => {
    const [current, setCurrent] = useState('home');
    let dispatch = useDispatch();
    let { user } = useSelector((state) => ({ ...state }));


    let history = useHistory();

    const handleClick = (e) => {
        setCurrent(e.key);
    }

    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            dispatch({
                type: 'LOGOUT',
                payload: null,
            })
            history.push('/login');
        }).catch((error) => {
            // An error happened.
        });
    }



    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>

            {!user && (
                <Item key="register" icon={<UserAddOutlined />} className="float-right">
                    <Link to="/register">Register</Link>
                </Item>
            )}

            {!user && (
                <Item key="login" icon={< UserOutlined />} className="float-right">
                    <Link to="/login">Login</Link>
                </Item>
            )}

            {user && (
                <SubMenu SubMenu
                    icon={<SettingOutlined />}
                    title={user.email && user.email.split('@')[0]}
                >
                    <Item key="setting:1">Option 1</Item>
                    <Item key="setting:2">Option 2</Item>
                    <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
                </SubMenu>
            )}



        </Menu >
    );
}
export default Header;