import './polyfill';
import React from 'react'
import { render } from 'react-dom'
import Math from '../contanier/Math'
import ProxyL from '../contanier/proxyL.js'
import Generator from '../contanier/generator.js'
import Rxjs from '../contanier/rxjs.js'
class App extends React.Component {
    render() {
       return (
          <div>
            {/* <Math />
            <ProxyL/>
            <Generator /> */}
            <Rxjs/>
          </div>
        )
    }
}
render(
    <App/>,
    document.getElementById('root')
)   
