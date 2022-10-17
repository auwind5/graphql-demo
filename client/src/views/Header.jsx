import React, { Component } from 'react'

export default class Header extends Component {
  state = {
    count: 0
  }
  componentDidMount() {
    console.log("componentDidMount")
  }
  render() {
    return (
      <div>
        <div>{this.state.count}</div>
        <button onClick={() => this.setState({count: this.state.count + 1})}></button>
      </div>
    )
  }
}
