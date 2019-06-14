import React from 'react'
import { render } from 'react-dom'
import { Input, Tooltip, Icon  } from 'antd';
import './style/math.less'
class Math_API extends React.Component {
  constructor(){
    super();
    // this.MathTrunc = this.MathTrunc.bind(this);
    this.state={
      math_api: [
        {
          name: 'Math.trunc',
          fn: Math.trunc,
          title: '除去小数部分返回整数部分',
          value: null,
        },
        {
          name: 'Math.sign',
          fn: Math.sign,
          title: '判断是正数、负数、还是零，对于非数值转换为数值',
          value: null,
        },
        {
          name: 'Math.cbrt',
          fn: Math.cbrt,
          title: '计算一个数的立方根',
          value: null,
        },
        {
          name: 'Math.clz32',
          fn: Math.clz32,
          title: '返回一个数的32位无位服号整数形式有多少个前导0',
          value: null,
        },
        // {
        //   name: 'Math.imul',
        //   fn: Math.imul,
        //   title: '返回两个数以32位带符号整数相乘的结果，返回的也是一个32位整数',
        //   value: null,
        // },
        {
          name: 'Math.fround',
          fn: Math.fround,
          title: '返回一个数的单精度浮点数形式',
          value: null,
        },
        {
          name: 'Math.hypot',
          fn: Math.hypot,
          title: '返回所有参数平方和的平方根',
          value: null,
        },
        {
          name: 'Math.hypot',
          fn: Math.hypot,
          title: '返回所有参数平方和的平方根',
          value: null,
        },
        {
          name: 'Math.expm1',
          fn: Math.expm1,
          title: 'Math.expm1(-1)返回ex-1',
          value: null,
        },
      ]
    }
  }
  componentDidMount(){
  }
  changeApiValue = (value, i) => {
    const { math_api } = this.state;
    math_api[i].value = math_api[i].fn(value);
    this.setState({ math_api });
  }
  render() {
    const { math_api } = this.state;
    return (
      <div>
          <p>ES6 Math_API</p>
          {
            math_api.map((item, i)=>{
              return (
                <div className="mathApi">
                  <span>{item.name}</span>
                  <Tooltip title={item.title}>
                    <Icon type="question-circle" />
                  </Tooltip>            
                  <Input onChange={e=>this.changeApiValue(e.target.value, i)}/>
                  <span>{item.value}</span> 
                </div> 
              )
            })
          }
      </div>
    )
  }
}

export default Math_API;