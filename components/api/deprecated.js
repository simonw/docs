import React from 'react'

export default class Deprecated extends React.PureComponent {
  render() {
    const { hash, children } = this.props
    const link = `/api${hash}`

    return (
      <div className="container">
        <a href={link}>{children}</a>

        <style jsx>{`
          a {
            color: #000;
            text-decoration: none;
            font-weight: 700;
            margin-right: 10px;
          }

          .container {
            align-items: center;
            display: flex;
            flex-wrap: wrap;
          }
        `}</style>
      </div>
    )
  }
}
