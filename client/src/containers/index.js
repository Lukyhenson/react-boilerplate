import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div>
        {React.cloneElement(this.props.children,{ key: this.props.path })}
      </div>
    )
  }
}

export default App
