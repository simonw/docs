import { FONT_FAMILY_SANS } from './css-config'
import PropTypes from 'prop-types'
import React from 'react'

export const Menu = (
  {
    children,
    width = null,
    minWidth = null,
    tipOffset = null,
    tip = true,
    scrollable
  },
  { darkBg = false }
) => {
  const classes = ['popover']

  if (darkBg) {
    classes.push('dark')
  }

  if (scrollable) {
    classes.push('scrollable')
  }

  return (
    <div className={classes.join(' ')}>
      {tip && (
        <div
          className="triangle"
          style={
            tipOffset !== null
              ? { left: `${tipOffset}px`, textAlign: 'left' }
              : null
          }
        >
          <Triangle />
        </div>
      )}
      <div style={{ width, minWidth }} className="menu">
        {children}
      </div>
      <style jsx>
        {`
          .popover {
            display: inline-block;
            position: relative;
          }

          .triangle {
            display: block;
            line-height: 11px; /* height of triangle (minus 1 :S) */
            z-index: 1;
            text-align: center;
            position: absolute;
          }

          .menu {
            margin-top: 11px;
            color: #000;
            display: inline-block;
            width: 200px;
            text-align: left;
            background: #fff;
            box-shadow: 0 18px 30px 0 rgba(0, 0, 0, 0.12);
            border: 1px solid #eee;
            border-radius: 3px;
            padding: 8px 0;
          }

          .dark .menu {
            border-color: #333333;
            box-shadow: none;
            background: #000;
          }

          .scrollable .menu {
            overflow-y: auto;
            max-height: calc(100vh - 140px);
          }
        `}
      </style>
    </div>
  )
}

Menu.contextTypes = {
  darkBg: PropTypes.bool
}

export const Item = (
  { icon, active = false, children },
  { darkBg = false }
) => (
  <div
    className={`
    item
    ${darkBg ? 'dark' : ''}
    ${active ? 'active' : ''}
  `}
  >
    {children}
    {icon ? <div className="icon">{icon}</div> : null}
    <style jsx>
      {`
        .icon {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 20px;
          pointer-events: none;
          display: flex;
          align-items: center;
        }

        .item {
          position: relative;
          font-size: 14px;
          color: #999;
          font-family: ${FONT_FAMILY_SANS};
          line-height: 17px;
          padding: 8px 20px;
        }

        .item :global(g) {
          transition: all 0.2s ease;
          stroke: #999;
          opacity: 1;
        }

        .item:hover :global(g) {
          stroke: #000;
        }

        /* change color on svg icons */
        .dark.item:hover :global(g) {
          stroke: #fff;
        }

        .item > :global(a) {
          color: #999;
          text-decoration: none;
          display: block;
          transition: all 0.2s ease;
          margin: -8px -20px;
          padding: 8px 20px;
        }

        .item.active {
          color: #000;
        }

        .dark.item.active {
          color: #fff;
        }

        .item > :global(a:hover),
        .item.active > :global(a) {
          color: #000;
        }
        .item > :global(.icon + a:hover),
        .item.active > :global(.icon + a) {
          color: #000;
        }
        .dark.item > :global(a:hover),
        .dark.item.active > :global(a) {
          color: #fff;
        }
        .dark.item > :global(.icon + a:hover),
        .dark.item.active > :global(.icon + a) {
          color: #fff;
        }
      `}
    </style>
  </div>
)

Item.contextTypes = {
  darkBg: PropTypes.bool
}

export const Divider = (props, { darkBg = false }) => (
  <div className={`line ${darkBg ? 'dark' : ''}`}>
    <style jsx>
      {`
        .line {
          border-top: 1px solid #eaeaea;
          margin: 8px 0;
        }

        .dark.line {
          border-top-color: #333;
        }
      `}
    </style>
  </div>
)

Divider.contextTypes = {
  darkBg: PropTypes.bool
}

const Triangle = (props, { darkBg = false }) => (
  <svg
    width="24"
    height="12"
    viewBox="191 84 24 12"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={darkBg ? '#000' : '#fff'}
      strokeWidth="1px"
      stroke={darkBg ? '#333' : '#eee'}
      fillRule="evenodd"
      d="M215 96l-12-12-12 12"
    />
  </svg>
)

Triangle.contextTypes = {
  darkBg: PropTypes.bool
}

export default Menu
