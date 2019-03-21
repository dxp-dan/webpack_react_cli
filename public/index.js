import React from 'react'
import { render } from 'react-dom'
import Math from '../contanier/Math'

class Hello extends React.Component {
    render() {
       return (
           <Math />
        )
    }
}
render(
    <Hello/>,
    document.getElementById('root')
)   
