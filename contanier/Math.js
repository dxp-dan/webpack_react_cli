import React from 'react'
import { render } from 'react-dom'

class Math extends React.Component {
  componentDidMount(){
    console.log('this.input1', this.input1);
  }
  MathTrunc = (args) => {
    console.log('arg', args);
  }
  render() {
    return (
      <div>
          <p>Math</p>
          <span>Math.trunc</span><input onChange={e=>{console.log('e',e.target.value)}} ref={init=>this.input1=init} /><span>{this.input1}</span> 
      </div>
    )
  }
}

export default Math;