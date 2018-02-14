import React from 'react'

export default class Deprecated extends React.PureComponent {
  render() {
    const { hash, children } = this.props
    const link = `/api${hash}`

    return (
      <div className="container">
        <a href={link}>{children}</a>
        <div className="deprecated">DEPRECATED</div>

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

          .deprecated {
            background: #000;
            border-radius: 5px;
            color: #fff;
            font-size: 12px;
            font-weight: 500;
            height: 25px;
            line-height: 25px;
            margin-left: 5px;
            width: 100px;
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}
