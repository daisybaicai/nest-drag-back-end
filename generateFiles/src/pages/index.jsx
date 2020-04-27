
    import React, { Component } from 'react';
    import { NavBar, InputItem, Button } from 'antd-mobile';
  
    class Index extends Component {
      constructor () {
        super();
      }
      render(){
        return (
          <>
              
          <div style={{ height: '300px' }}>
              <NavBar mode="dark" >表单</NavBar>
              <InputItem placeholder="输入银行卡号" type="bankCard" >银行卡</InputItem>
              <InputItem type="bankCard" placeholder="输入姓名" >姓名</InputItem>
              <InputItem placeholder="输入电话" type="phone" disabled="false" clear="false" >电话</InputItem>
              <Button type="primary" icon="check-circle" >提交</Button>
          </div>
          
          </>
        )
      }
    }
    export default Index;
    