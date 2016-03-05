import React, { Component } from 'react'

export default class Loader extends Component
{
  static propTypes = {
    loaded   : React.PropTypes.bool,
    title    : React.PropTypes.string,
    children : React.PropTypes.element,
  }

  static defaultProps = {
    title  : 'loading',
    loaded : false,
  }

  render() {
    const loaded = this.props.loaded

    return (
      <div className={ !loaded ? 'loading' : 'loaded' }>
        {
          !this.props.loaded ?
          this.props.title.split('').map((char) => <span>{char.toUpperCase()}</span>) :
          this.props.children
        }
      </div>
    )
  }
}
