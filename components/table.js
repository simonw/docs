import PropTypes from 'prop-types'
// Packages
import React from 'react'

const Table = ({ children }) => (
  <table cellSpacing="0" cellPadding="5">
    <tbody>
      {children}

      <style jsx>
        {`
          table {
            width: 100%;
            margin: 30px 0;
            border: none;
          }
        `}
      </style>
    </tbody>
  </table>
)

class Row extends React.Component {
  getChildContext() {
    return {
      header: this.props.header || false
    }
  }

  render() {
    return (
      <tr>
        {this.props.children}

        <style jsx>
          {`
            tr {
              text-align: left;
              font-weight: 400;
              font-size: 14px;
              line-height: 24px;
            }
          `}
        </style>
      </tr>
    )
  }
}

Row.childContextTypes = {
  header: PropTypes.bool
}

const Column = ({ children, right, left }, context) => {
  const style = {
    verticalAlign: 'top',
    paddingTop: '15px',
    paddingBottom: '15px',
    paddingRight: '10px',
    paddingLeft: '10px'
  }

  if (left) {
    style.paddingLeft = '0px'
  }

  if (right) {
    style.paddingRight = '0px'
  }

  return React.createElement(context.header ? 'th' : 'td', { style }, children)
}

Column.contextTypes = {
  header: PropTypes.bool
}

export { Table, Row, Column }
