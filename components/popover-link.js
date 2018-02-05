// Packages
import React from 'react'

// Components
import Portal from './portal'
import ClickOutside from './click-outside'

export default class PopOverLink extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onResize = this.onResize.bind(this)
    this.renderPortal = this.renderPortal.bind(this)
    this.state = {
      isOpen: false,
      top: null,
      left: null,
      width: null
    }
    this.resizeRaf = null
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.setOpen()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      this.setOpen()
    }
  }

  setOpen() {
    const bodyRect = document.body.getBoundingClientRect()
    const targetRect = this.refs.link.getBoundingClientRect()
    this.setState({
      isOpen: true,
      top: targetRect.top - bodyRect.top,
      left: targetRect.left - bodyRect.left
    })
    this.props.onOpen && this.props.onOpen()
  }

  onClick(e) {
    this.setOpen()
    e.preventDefault()
    e.stopPropagation()
    window.addEventListener('resize', this.onResize)
  }

  onClose() {
    this.setState({ isOpen: false })
    window.removeEventListener('resize', this.onResize)
  }

  onResize() {
    if (this.resizeRaf) return
    this.resizeRaf = requestAnimationFrame(() => {
      const bodyRect = document.body.getBoundingClientRect()
      const targetRect = this.refs.link.getBoundingClientRect()

      if (!targetRect.width && !targetRect.height) {
        // we special case the scenario where a media query
        // for example hides the target
        this.onClose()
        return
      }

      this.setState({
        top: targetRect.top - bodyRect.top,
        left: targetRect.left - bodyRect.left
      })
      this.resizeRaf = null
    })
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.resizeRaf)
    this.resizeRaf = null
    window.removeEventListener('resize', this.onResize)
  }

  renderPortal({ innerRef }) {
    const { to, offsetLeft = 0, offsetTop = 0, fixed, left, top } = this.props
    return (
      <Portal>
        <span
          ref={innerRef}
          className="portal"
          style={{
            position: fixed ? 'fixed' : 'absolute',
            left: left != null ? left : this.state.left + offsetLeft,
            top: top != null ? top : this.state.top + offsetTop
          }}
        >
          {to}
        </span>
        <style jsx>
          {`
            .portal {
              animation: 100ms ease-out show;
              animation-iteration-count: 1;
              animation-fill-mode: forwards;
              z-index: 9999;
            }
            @keyframes show {
              from {
                opacity: 0;
                transform: translateY(0);
              }
              to {
                opacity: 1;
                transform: translateY(15px);
              }
            }
          `}
        </style>
      </Portal>
    )
  }

  render() {
    return (
      <span className="wrap">
        <span className="link" ref="link" onClick={this.onClick}>
          {this.props.children}
        </span>
        {this.state.isOpen && (
          <ClickOutside onClick={this.onClose} render={this.renderPortal} />
        )}
        <style jsx>
          {`
            .link {
              cursor: pointer;
              display: inline-block;
            }
            .link:hover :global(g) {
              stroke: #000;
            }
          `}
        </style>
      </span>
    )
  }
}
