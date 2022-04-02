import React from "react";
import { Switch, Route } from 'react-router-dom';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import 'antd/dist/antd.css';

function App() {
  return (
    <>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/Login" component={Login}></Route>
        <Route exact path="/Register" component={Register}></Route>
      </Switch>
    </>
  );
}

export default App;
