// Packages
import { Component } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

const isClient = typeof window !== 'undefined'

class Portal extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    container: PropTypes.element
  }

  constructor(props) {
    super(props)

    if (isClient) {
      this.rootElement = document.createElement('div')
    }
  }

  componentWillMount() {
    if (isClient) {
      this.renderContainer(this.props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (isClient && this.props.className !== nextProps.className) {
      this.rootElement.className = this.props.className
    }

    if (isClient && this.props.container !== nextProps.container) {
      this.unrenderContainer(this.props)
      this.renderContainer(nextProps)
    }
  }

  componentWillUnmount() {
    if (isClient) {
      this.unrenderContainer(this.props)
    }
  }

  renderContainer(props) {
    getContainer(props.container).appendChild(this.rootElement)

    if (props.className) {
      this.rootElement.className = props.className
    }
  }

  unrenderContainer(props) {
    getContainer(props.container).removeChild(this.rootElement)
  }

  render() {
    if (!isClient) {
      return null
    }

    return createPortal(this.props.children, this.rootElement)
  }
}

function getContainer(container) {
  return container || document.body
}

export default Portal
