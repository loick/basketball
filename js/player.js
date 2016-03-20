import React, { Component } from 'react'
import classNames from 'classnames'

import Img from './img'

export default class Player extends Component
{
  static propTypes = {
    name: React.PropTypes.string,
    asset: React.PropTypes.string,
    height: React.PropTypes.string,
    origin: React.PropTypes.string,
    age: React.PropTypes.number,
    lnb: React.PropTypes.number,
    pos: React.PropTypes.number,
    id: React.PropTypes.number,
    nbPlayers: React.PropTypes.number,
    current: React.PropTypes.bool,
    dropped: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onPlayerHidden: React.PropTypes.func,
  }

  static defaultProps = {
    onClick: () => {},
    onPlayerHidden: () => {},
  }

  state = {
    initialized: false,
    dropped: false,
  }

  componentDidMount() {
    document.addEventListener('click', ::this.handleDocumentClick)

    this.dropPlayer(true, 1000).then(() => this.setState({ initialized: true }))
  }

  componentWillReceiveProps(props) {
    if (props.drop !== this.state.dropped && this.state.initialized) {
      this.dropPlayer(props.drop).then(() => {
        if (!props.drop && this.props.id === this.props.nbPlayers - 1) {
          this.props.onPlayerHidden()
        }
      })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  onClick() {
    const { x, z } = this.position()
    this.props.onClick(this.props.id, - x - 10, - z)
  }

  dropPlayer(dropped, extraDelay = 0) {
    return new Promise((resolve) => {
      const delayBase = 50 + extraDelay
      const delayInc = 70
      const delay = delayBase + this.props.id * delayInc

      this.timeout = setTimeout(() => {
        this.setState({ dropped })
        resolve()
      }, delay)
    })
  }

  handleDocumentClick(event) {
    if (this.props.current && !this.refs.player.contains(event.target)) {
      this.onClick()
    }
  }

  position() {
    const coords = {}
    switch (this.props.pos) {
      case 1 :
        coords.x = 100
        coords.z = 170
        break
      case 2 :
        coords.x = 180
        coords.z = 365
        break
      case 3 :
        coords.x = -150
        coords.z = 200
        break
      case 4 :
        coords.x = -115
        coords.z = 370
        break
      case 5 :
        coords.x = 10
        coords.z = 340
        break
      default :
        coords.x = 0
        coords.z = 0
    }

    if (this.state.dropped) {
      coords.z += 40
    }

    return coords
  }

  renderCard() {
    return (
      <div className="player__card">
        <h3>{ this.props.name }</h3>
        <ul className="player__card__list">
          <li>
            <span>Age</span>
            <br />{ this.props.age }
          </li>
          <li>
            <span>Taille</span>
            <br />{ this.props.height }
          </li>
          <li>
            <span>Origin</span>
            <br />{ this.props.origin }
          </li>
        </ul>
        <ul className="player__card__list">
          <li>
            <span>Matchs LNB</span>
            <br />{ this.props.lnb }
          </li>
          <li>
            <span>Europe games</span>
            <br />21
          </li>
        </ul>
      </div>
    )
  }

  render() {
    const style = {}
    const { x, z } = this.position()

    style.transform = `translateX(${x}px) translateY(0px) translateZ(${z}px)`
    style.opacity = this.state.dropped ? 1 : 0

    return (
      <div
        ref="player"
        className={ classNames('player', { active: this.props.current }) }
        style={style}
        onClick={!this.props.current && ::this.onClick}
      >
        { this.props.current && this.renderCard() }
        <div className="player__img">
          <Img title={this.props.name} src={this.props.asset} />
        </div>
        <div className="player__label">
          <span>{ this.props.name }</span>
        </div>
      </div>
    )
  }
}
