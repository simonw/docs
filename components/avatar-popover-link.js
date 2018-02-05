import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Badge from './badge'
import Avatar from './avatar'
import * as PopOver from './popover'
import PopOverLink from './popover-link'
import PlusIcon from './icons/plus'

export default class AvatarPopOverLink extends React.Component {
  constructor(props) {
    super(props)
    this.onPopOverOpen = this.onPopOverOpen.bind(this)
  }

  onPopOverOpen() {
    Router.prefetch('/account/identity')
    Router.prefetch('/dashboard')
    Router.prefetch('/teams/settings/url')

    // in case user logs out, we prefetch
    // the page they get redirected to
    Router.prefetch('/login')
  }

  getAccountBadgeCount() {
    const { user } = this.props
    if (!user) return

    let count = 0
    if (!user.username) count++
    // if (!user.billingChecked) count++;

    return count
  }

  render() {
    const section = this.props.pathname
      .split('/')
      .slice(0, 2)
      .join('/')
    const count = this.getAccountBadgeCount()

    return (
      <span className="avatar">
        <PopOverLink
          hideOnClick
          offsetTop={17}
          offsetLeft={-167}
          onOpen={this.onPopOverOpen}
          to={
            <span className="avatar-menu">
              <PopOver.Menu tipOffset={170}>
                <PopOver.Item active={section === '/dashboard'}>
                  <Link href="/dashboard">
                    <a>Dashboard</a>
                  </Link>
                </PopOver.Item>
                <PopOver.Item
                  key="0"
                  active={this.props.pathname === '/teams/settings/url'}
                  icon={<PlusIcon />}
                >
                  <Link
                    href="/teams/settings/url?isCreating=1"
                    as="/teams/create"
                  >
                    <a>Create a Team</a>
                  </Link>
                </PopOver.Item>
                <PopOver.Divider key="1" />
                <PopOver.Item
                  active={section === '/account'}
                  icon={count ? <Badge number={count} /> : null}
                >
                  <Link href="/account/identity" as="/account">
                    <a>Account Settings</a>
                  </Link>
                </PopOver.Item>
                <PopOver.Divider />
                <PopOver.Item>
                  <a className="logout" onClick={this.props.onLogout}>
                    Logout
                  </a>
                </PopOver.Item>
              </PopOver.Menu>
            </span>
          }
        >
          <a
            href="/account"
            onClick={e => {
              if (!e.metaKey) e.preventDefault()
            }}
            className={
              'avatar-link ' + ('/account' === section ? 'active' : '')
            }
          >
            {count ? (
              <span className="badge">
                <Badge number={count} />
              </span>
            ) : null}
            <Avatar
              uid={this.props.user.uid}
              title={this.props.user.username || this.props.user.email}
              size={30}
              hash={this.props.user.avatar}
            />
          </a>
        </PopOverLink>
        <style jsx>
          {`
            .avatar {
              display: inline-block;
              height: 30px;
              vertical-align: middle;
              position: relative;
            }
            .avatar .badge {
              position: absolute;
              top: -2px;
              right: -3px;
            }
            .logout {
              cursor: pointer;
            }
          `}
        </style>
      </span>
    )
  }
}
