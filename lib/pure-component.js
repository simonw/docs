import React from 'react'

const pureComponent = c =>
  class PureComponent extends React.PureComponent {
    render() {
      return c(this.props)
    }
  }

export default pureComponent
