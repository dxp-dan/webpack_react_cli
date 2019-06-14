import React from 'react'
import { render } from 'react-dom'
import { Input, Icon  } from 'antd';

class proxy_L extends React.Component{
  target = {
    name: 'tony',
    age: 18,
  };
  handler = {
    get: function(target, propKey, receiver){ //拦截对象属性的读取
      console.log('target', target, 'propKey', propKey, 'receiver', receiver);
      return propKey in target ? target[propKey] : 37;
    },
    set: function(target, propKey, value, receiver){ //拦截对象属性的设置
      if(propKey === 'age'){
        if(!Number.isInteger(value)){
          console.log('该数字不是个整数');
        }
        if(value > 20){
          console.log('该数字大于20');
        }
      }
      target[propKey] = value;
      return true;
    },
    has: function(target, propKey){ //拦截propKey in proxy的操作，返回一个boolean值
      if(propKey === 'czy'){
        return true;
      }else{
        return propKey in target;
      }
    },
    deleteProperty: function(target, propKey){ //拦截 delete proxy[propKey]的操作返回一个boolean值
      if(propKey === 'name'){
        delete target[propKey];
        return true;
      }else{
        return false;
      }
    },
  }
  student = new Proxy(this.target, this.handler);
  handleChange = value =>{
    this.student.age = parseInt(value.target.value);
    console.log('has', 'czy' in this.student, 'name' in this.student, 'height' in this.student, Reflect.has(this.student, 'czy'));
    const isSuccess = delete this.student.name;
    console.log('isSuccess', isSuccess);
  }
  render(){
    console.log(this.student.name, this.student.age);
    return (
      <div>
        <h3>proxy</h3>
        <Input onChange={this.handleChange} />
      </div>
    )
  }
}

export default proxy_L;