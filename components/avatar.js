// Packages
import React from 'react'
import PropTypes from 'prop-types'

const Avatar = (
  {
    title,
    size = 80,
    boxSize = null,
    teamId = null,
    username = null,
    uid,
    hash
  },
  { darkBg = false }
) => {
  let query
  const hasSHA = hash && /^[0-9a-f]{40}$/.test(hash)

  if (hasSHA) {
    query = hash
  } else {
    query =
      username != null
        ? `?u=${username}`
        : teamId != null ? `?teamId=${teamId}` : (uid ? uid : '') + '?'
  }

  const sizePrefix = hasSHA ? '?' : '&'
  const url = `https://zeit.co/api/www/avatar/${query + sizePrefix}s=${size *
    3}`

  return (
    <span
      className={darkBg ? 'dark' : ''}
      style={{ width: boxSize || size, height: boxSize || size }}
    >
      <img alt={title} title={title} src={url} />
      <style jsx>
        {`
          span {
            border-radius: 100%;
            display: inline-block;
            overflow: hidden;
            border: 1px solid #eee;
            line-height: 0;
            vertical-align: top;
          }

          img {
            width: 100%;
            height: 100%;
          }

          .dark {
            border: 1px solid #333;
          }
        `}
      </style>
    </span>
  )
}

Avatar.contextTypes = {
  darkBg: PropTypes.bool
}

export default Avatar
