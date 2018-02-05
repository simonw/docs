// Packages
import { Component } from 'react'
import PropTypes from 'prop-types'

export default class ClickOutside extends Component {
  static propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func,
    render: PropTypes.func
  }

  static defaultProps = {
    active: true
  }

  constructor(props) {
    super(props)
    this.handleRef = this.handleRef.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    if (this.props.active) {
      document.addEventListener('click', this.handleClick)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.active && nextProps.active) {
      document.addEventListener('click', this.handleClick)
    }

    if (this.props.active && !nextProps.active) {
      document.removeEventListener('click', this.handleClick)
    }
  }

  componentWillUnmount() {
    if (this.props.active) {
      document.removeEventListener('click', this.handleClick)
    }
  }

  handleRef(element) {
    this.element = element
  }

  handleClick(event) {
    if (!this.element.contains(event.target)) {
      this.props.onClick(event)
    }
  }

  render() {
    return this.props.render({
      innerRef: this.handleRef
    })
  }
}
