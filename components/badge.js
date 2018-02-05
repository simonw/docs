const Badge = ({ number = 0, backgroundColor }) => (
  <span className="badge" style={{ backgroundColor }}>
    {number}
    <style jsx>
      {`
        .badge {
          background: red;
          border-radius: 7px;
          color: #fff;
          display: inline-block;
          font-size: 10px;
          font-weight: bold;
          line-height: 15px;
          padding: 0 4px 0 4px;
          height: 15px;
          min-width: 16px;
          text-align: center;
        }
      `}
    </style>
  </span>
)

export default Badge
