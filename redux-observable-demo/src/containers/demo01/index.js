
import React, { Component } from 'react';
import { Card, Button, Spin } from 'antd';
import { bindActionCreators } from 'redux';
import { connect, dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as demo01Redux from '../../redux/modules/demo/demo01';
import * as demo02Redux from '../../redux/modules/demo/demo02';
import * as demo03Redux from '../../redux/modules/demo/demo03';



class demo01 extends Component{
  render(){
    const { toPing, isPinging, login, fetchUserF, fetchUserA, fetchUserACancel, flogin, count, incrementIfOd, incrementOd, loginLoading, floginLoading } = this.props;
    return (
      <div>
        <h3 style={{color: 'red'}}>#demo01</h3>
        <h3>is pinging:{isPinging?'true':'false'}</h3>
        <Button type="primary" onClick={toPing}>+</Button>
        <h3 style={{color: 'red'}}>#demo02</h3>
        <Button type="primary" onClick={()=>fetchUserA('redux-observable')}>Fetch User Info(observable)</Button>
        <Button  type="danger" onClick={fetchUserACancel}>CANCEL</Button>
        <Spin spinning={loginLoading}>
          <Card>{JSON.stringify(login)}</Card>
        </Spin>
        <Button type="primary" onClick={()=>fetchUserF('redux-observable')}>Fetch User Info(thunk)</Button>
        <Spin spinning={floginLoading}>        
          <Card>{JSON.stringify(flogin)}</Card>
        </Spin>
        <h3 style={{color: 'red'}}>#demo03</h3>
        <h3>Current count  {count}</h3>
        <Button type="primary" onClick={incrementOd}>increment</Button>
        <Button type="primary" onClick={incrementIfOd}>increment if odd</Button>
      </div>
    )
  }
}

export default connect(
  state=>{
    console.log('state', state);
    return {
      isPinging: state.pingReducer.isPinging,
      login: state.fetchReducer.login,
      flogin: state.fetchReducer.flogin,
      loginLoading: state.fetchReducer.loginLoading,
      floginLoading: state.fetchReducer.floginLoading,
      count: state.incrementIfOddReducer.count,
    };
  },
  dispatch=>bindActionCreators({...demo01Redux,...demo02Redux, ...demo03Redux},dispatch)
)(demo01);
